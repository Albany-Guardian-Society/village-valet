import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import fuzzysort from "fuzzysort";
import moment from "moment";

import Table from "react-bootstrap/Table";

/**
 * Profile Table
 * @typedef {Object} ProfileTable
 * @property {string} selcted_row - which row in the table has been selected (darkly highlighted on screen)
 */
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

    /**
     * Handles when row is selected
     *
     * @param {Object} event - profile of row selected
     */
    handleSelect(event) {
        //Highlight the row
        this.setState({selected_row: event.target.id});

        //Update the active_profile
        //First convert id into index
        this.props.setActiveUser(this.props.users[event.target.id]);

        // If "all" -> open the profile
        // If "rider" or "driver" -> add to active_ride
        if (this.props.mode === "all") {
            this.props.history.push('/Profiles/User/'+event.target.id);
        } else {
            if (this.props.mode === "rider") {
                this.props.setRideParticipant("rider", this.props.users[event.target.id]);
            } else if (this.props.mode === "driver") {
                this.props.setRideParticipant("driver", this.props.users[event.target.id])
            }
        }
    }

    /**
     * Generates Profile Table Headers
     *
     * @returns {HTMLTableHeaderCellElement[]} Header names
     */
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

    /**
     * Generates Profile Table Body
     *
     * @returns {HTMLTableDataCellElement[][]} Array of rows, each row having array of user information
     */
    generateTableData(){
        let profile_table=[];

        //FIRST STEP.  Filter the users.
        //Users are filtered by type and then by search term
        let filtered_users;
        if (this.props.search_term) {
            let index = -1;
            filtered_users = fuzzysort.go(this.props.search_term, Object.values(this.props.users).map((p) => {
                index++;
                return p.personal_info.first_name + p.personal_info.last_name + "|" + index;
            })).filter((p) => {
                // This was choosed arbitrarily... It is the match criteria index,
                // More negative means a worse match
                return p.score > -2000;
            }).map((p) => {
                //Convert back to the user objects
                return Object.values(this.props.users)[p.target.split("|")[p.target.split("|").length-1]]
            })
        } else {
            //If no search term, return all
            filtered_users = Object.values(this.props.users);
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
        if (this.props.mode === "driver" && this.props.active_ride.locations.pickup.time && this.props.active_ride.locations.dropoff.time) {
            // Get rid of all the drivers who are not active or not driving when needed
            filtered_users = filtered_users.filter((a) => {
                if (a.status !== "active") {
                    return false;
                }
                // make sure that they're volunteering during pickup/dropoff window
                // should be making sure they are volunteering when driver leaves their house
                for (let i = 0; i < a.volunteer_hours.length; i++) {
                    let ride_date = new Date(this.props.active_ride.ride_data.date);
                    if ((ride_date.getDay() + 1) % 7 === Number(a.volunteer_hours[i].day)) {
                        if (moment(a.volunteer_hours[i].start, "HH:mm") < moment(this.props.active_ride.locations.pickup.time, "HH:mm")
                            && moment(a.volunteer_hours[i].end,"HH:mm") > moment(this.props.active_ride.locations.dropoff.time, "HH:mm")) {
                            return true;
                        }
                    }
                }
                return false;
            });
            filtered_users.sort((a, b) => {
                let dist_a = Math.pow(Math.pow((a.addresses[0].geolocation.lat - this.props.active_ride.locations.pickup.geolocation.lat), 2) + Math.pow((a.addresses[0].geolocation.lng - this.props.active_ride.locations.pickup.geolocation.lng), 2), .5);
                let dist_b = Math.pow(Math.pow((b.addresses[0].geolocation.lat - this.props.active_ride.locations.dropoff.geolocation.lat), 2) + Math.pow((b.addresses[0].geolocation.lng - this.props.active_ride.locations.dropoff.geolocation.lng), 2), .5);
                if (dist_a < dist_b) {
                    return -1;
                } else if (dist_a === dist_b) {
                    return 0;
                } else {
                    return 1;
                }
            });
        }
        else {
            filtered_users.sort((a, b) => {
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
        }

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

    /**
     * Displays the profile table
     *
     * @returns {HTMLDocument}
     */
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

/**
 * Pulls users and active ride from state
 */
const mapStateToProps = state => ({
    users: state.users,
    active_ride : state.active_ride,
});

/**
 * Sets up functions to send selected profile information to reducer
 */
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
