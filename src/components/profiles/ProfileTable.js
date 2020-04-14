import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import fuzzysort from "fuzzysort";

import Table from "react-bootstrap/Table";

class ProfileTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_row: "",
        };
        this.generateTableData = this.generateTableData.bind(this);
        this.generateTableHeaders = this.generateTableHeaders.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        //Highlight the row
        this.setState({selected_row: event.target.id});

        //Update the active_profile
        //First convert id into index
        let index = 0;
        for (let u in this.props.users) {
            if (this.props.users[u].id === event.target.id) index = u;
        }
        this.props.setActiveUser(this.props.users[index]);

        //Handle this being selected
        //In the case of "all" we want to open the profile
        //In the case of "rider" or "driver" we want to add them to the active_ride

        if (this.props.mode === "all") {
            this.props.history.push('/Profiles/User/'+event.target.id);
        } else {
            if (this.props.mode === "rider") {
                this.props.setRideParticipant("rider", this.props.users[index]);
            } else if (this.props.mode === "driver") {
                this.props.setRideParticipant("driver", this.props.users[index])
            }
        }
    }

    generateTableHeaders() {
        let headers;
        switch (this.props.mode) {
            case "driver":
                headers = ["Picture", "First Name", "Last Name", "Village", "Database ID"];
                break;
            case "rider":
                headers = ["Picture", "First Name", "Last Name", "Village", "Database ID"];
                break;
            case "all":
                headers = ["User Type", "Last Name", "First Name", "Village", "Status", "Database ID"];
                break;
            default:
                headers = ["User Type", "First Name", "Last Name", "Village", "Database ID"];
                break;
        }
        return headers.map((h) => {
            return <th key={h}>{h}</th>
        })
    }

    generateTableData(){
        let profile_table=[];

        //FIRST STEP.  Filter the users.
        //Users are filtered by type and then by search term
        let filtered_users;
        if (this.props.search_term) {
            let index = -1;
            filtered_users = fuzzysort.go(this.props.search_term, this.props.users.map((p) => {
                index++;
                return p.personal_info.first_name + p.personal_info.last_name + "|" + index;
            })).filter((p) => {
                // This was choosed arbitrarily... It is the match criteria index,
                // More negative means a worse match
                return p.score > -2000;
            }).map((p) => {
                //Convert back to the user objects
                return this.props.users[p.target.split("|")[p.target.split("|").length-1]]
            })
        } else {
            //If no search term, return all
            filtered_users = this.props.users;
        }

        //Could optimize by skipping in "all" case
        filtered_users = filtered_users.filter((user) => {
            switch(this.props.mode) {
                case "driver":
                    return user.user_type === "driver" && user.status === "active";
                case "rider":
                    return user.user_type === "rider" && user.status === "active";
                case "all":
                    return true;
                default:
                    return true;
            }
        });

        // This can be optimised, but it works for now
        // Estimate that sort takes 1 second per 100,000 items based on one google
        filtered_users.sort((a,b) => {
            if (a.status === b.status) {
                if (a.user_type === b.user_type) {
                    if (a.personal_info.last_name === b.personal_info.last_name) {
                        if (a.personal_info.first_name > b.personal_info.first_name) return 1;
                        return -1;
                    } else {
                        if (a.personal_info.last_name > b.personal_info.last_name) return 1;
                        return -1;
                    }
                } else {
                    if (a.user_type === "rider") return -1;
                    return 1;
                }
            } else {
                if (a.status === "active") return -1;
                return 1;
            }
        });

        //could also be done with a map function return
        for (let index in filtered_users) {
            let user = filtered_users[index];
            profile_table.push(
                <tr key={user.id} style={this.state.selected_row === user.id ? {
                    background: "#cce4ff",
                    display: "table",
                    width: '100%',
                    tableLayout: 'fixed'
                } : {display: "table", width: '100%', tableLayout: 'fixed'}}>
                    {this.props.mode === "all" ?
                        <td id={user.id}
                            onClick={(e) => this.handleSelect(e)}>{user.user_type.replace(/^\w/, c => c.toUpperCase())}</td>
                        :
                        <td id={user.id} onClick={(e) => this.handleSelect(e)}>PICTURE</td>
                    }
                    {this.props.mode === "all" ?
                        <>
                            <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.personal_info.last_name}</td>
                            <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.personal_info.first_name}</td>
                        </>
                    :
                        <>
                            <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.personal_info.first_name}</td>
                            <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.personal_info.last_name}</td>
                        </>
                    }
                    <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.village_id}</td>
                    {this.props.mode === "all" ?
                        <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.status.replace(/^\w/, c => c.toUpperCase())}</td>
                    :
                        null
                    }
                    <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.id}</td>
                </tr>
            );
        }
        return profile_table;
    }
    render(){
        return(
            <div>
                <Table striped bordered hover style={{width: '100%'}}>
                    <thead style={{display: "table", width: 'calc( 100% - 17px )'}}>
                    <tr style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
                        {this.generateTableHeaders()}
                    </tr>
                    </thead>
                    <tbody style={{display: 'block', height: '400px', width: '100%', overflow: 'auto'}}>
                    {this.generateTableData()}
                    </tbody>
                </Table>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    setActiveUser: (user) => dispatch({
        type: "set_active_user",
        payload: user
    }),
    setRideParticipant: (type, user) => dispatch({
        type: "set_ride_participant",
        payload: {
            type: type,
            user: user
        }
    }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileTable));
