import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import fuzzysort from "fuzzysort";

import Table from "react-bootstrap/Table";

class ProfileTable extends Component {
    constructor(props){
        super(props);
        this.state={
            selected_row: "",
        };
        this.generateTableData = this.generateTableData.bind(this);
        this.generateTableHeaders = this.generateTableHeaders.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        this.setState({selected_row: event.target.id});
        //Handle this being selected
        //In the case of "all" we want to open the profile
        //In the case of "rider" or "driver" we want to add them to the active_ride
        if (this.props.mode === "all") {
            this.props.history.push('/Profiles/User/'+event.target.id);
        }
    }

    generateTableHeaders() {
        let headers = [];
        switch (this.props.mode) {
            case "driver":
                headers = ["Picture", "First Name", "Last Name", "Village", "Database ID"];
                break;
            case "rider":
                headers = ["Picture", "First Name", "Last Name", "Village", "Database ID"];
                break;
            case "all":
                headers = ["User Type", "First Name", "Last Name", "Village", "Database ID"];
                break;
            default:
                headers = ["User Type", "First Name", "Last Name", "Village", "Database ID"]
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
        let filtered_users = [];
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
                    return user.user_type === "driver";
                case "rider":
                    return user.user_type === "rider";
                case "all":
                    return true;
                default:
                    return true;
            }
        });

        //could also be done with a map function return
        for (let index in filtered_users) {
            let user = filtered_users[index];
            profile_table.push(
                <tr key={user.id} style={this.state.selected_row === user.id ? {background:"#cce4ff"} : null}>
                    {this.props.mode === "all" ?
                        <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.user_type.replace(/^\w/, c => c.toUpperCase())}</td>
                    :
                        <td id={user.id} onClick={(e) => this.handleSelect(e)}>PICTURE</td>
                    }
                    <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.personal_info.first_name}</td>
                    <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.personal_info.last_name}</td>
                    <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.village_id}</td>
                    <td id={user.id} onClick={(e) => this.handleSelect(e)}>{user.id}</td>
                </tr>
            );
        }
        return profile_table;
    }
    render(){
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {this.generateTableHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTableData()}
                    </tbody>
                </Table>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileTable));
