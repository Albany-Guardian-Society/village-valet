import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';
import moment from 'moment';

/** @class LedgerTable makes a ledger of all passed, present, and upcoming rides*/

class LedgerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }

    /**
     * Switches to the Edit ride functionality
     * @param event -  ride object
     */
    handleSelect(event) {
        // event.target.id is the id of the ride
        // Highlight the row
        this.setState({selected_row: event.target.id.replace('edit','')});
        // This is the ride being selected
        this.props.setActiveRide(this.props.rides[event.target.id.replace('edit','')]);
        // When clicked go to schedule ride to edit ride
        this.props.history.push('/Ledger/EditRide/');
    }

    /**
     * Permanently deletes ride
     * @param rideID -  ID of ride
     * @return window confirm and alert
     */
    handleCancel(rideID) {
        if (window.confirm("Are you sure you want to DELETE this ride?")) {
            this.props.cancelRide(rideID);
            window.alert("CANCELLED: " + rideID);
        }
    }

    /**
     * Deactivates ride when deactivate is clicked
     * @param rideID -  ID of ride
     * @return window confirm and alert
     */
    handleDeactivateRide(rideID) {
        if (window.confirm("Are you sure you want to DEACTIVATE this ride?")) {
            this.props.deactivateRide(rideID);
            window.alert("DEACTIVATED: " + rideID);
        }
    }

    /**
     * Reactivates an inactive ride when reactivate is clicked
     * @param rideID -  ID of ride
     * @return window confirm and alert
     */
    handleReactivateRide(rideID) {
        if (window.confirm("Are you sure you want to REACTIVATE this ride?")) {
            this.props.reactivateRide(rideID);
            window.alert("REACTIVATED: " + rideID);
        }
    }

    /**
     * Action buttons for upcoming rides with deactivate
     * @param rides[key]
     * @return HTMLTableDataCellElement - of Buttons
     */

    futureButtons1(rides) {
        return(
            <td>
                <Button id={rides.id + "edit"} variant="primary" className="mr-1" size="sm"
                           onClick={(e) => this.handleSelect(e)}>
                Edit
                </Button>

                <Button id={rides.id + "deactivate"} variant="warning" className="mr-1" size="sm"
                        onClick={() => this.handleDeactivateRide(rides.id)}>
                    Deactivate
                </Button>
                <Button id={rides.id + "cancel"} variant="danger" className="mr-1" size="sm"
                        onClick={() => this.handleCancel(rides.id)}>
                    Cancel
                </Button>
            </td>
        )
    }

    /**
     * Action buttons for upcoming rides with Reactivate
     * @param rides[key]
     * @return HTMLTableDataCellElement - of Buttons
     */

    futureButtons2(rides) {
        return(
            <td>
                <Button id={rides.id + "edit"} variant="primary" className="mr-1" size="sm"
                        onClick={(e) => this.handleSelect(e)}>
                    Edit
                </Button>

                <Button id={rides.id + "reactivate"} variant="success" className="mr-1" size="sm"
                        onClick={() => this.handleReactivateRide(rides.id)}>
                    Reactivate
                </Button>
                <Button id={rides.id + "cancel"} variant="danger" className="mr-1" size="sm"
                        onClick={() => this.handleCancel(rides.id)}>
                    Cancel
                </Button>
            </td>
        )
    }

    /**
     * Action buttons for passed rides ie only 'Cancel'
     * @param rides[key]
     * @returns HTMLButtonElement
     */

    passedButtons(rides){
        return(
            <td>
                <Button id={rides.id + "cancel"} variant="danger" className="mr-1" size="sm"
                        onClick={() => this.handleCancel(rides.id)}>
                    Cancel
                </Button>
            </td>
                )


}

    /**
     *
     * Displays Ledger table information with appropriate status tags and buttons
     */
    renderTableData() {
        let rides = this.props.rides;
        let keys = Object.keys(rides);
        return keys.map((key) => {

            /**
             * check if ride is confirmed
             */
            let button_set;
            let status;
            const confirm_check = rides[key].ride_data.driver_confirmed ? <tr>D: Confirmed </tr> : <tr>D: Pending </tr>
            const date = moment(rides[key].ride_data.date, "YYYY-MM-DD")

            /**
             * check for inactive and active rides - activate or reactivate
             */
            if (rides[key].status === "inactive") {
                button_set = this.futureButtons2(rides[key]);
                status = <tr>Inactive</tr>;

            } else {
                button_set = this.futureButtons1(rides[key]);
                status = <tr>Active</tr>;

            }
            /**
             *  Check for date for ride to see if upcoming or passed
             */
            if (date.isBefore(moment().format("YYYY-MM-DD"))) {
                button_set = this.passedButtons(rides[key])
                status = <tr>Passed</tr>
            }
            return (
                <tr>
                    <td>{rides[key].id}</td>
                    <td>{rides[key].driver.first_name} {rides[key].driver.last_name}</td>
                    <td>{rides[key].rider.first_name} {rides[key].rider.last_name}</td>
                    <td>{rides[key].locations.pickup.address}</td>
                    <td>{rides[key].locations.dropoff.address}</td>
                    <td>{rides[key].ride_data.date}</td>
                    <td>
                        {status}
                        {confirm_check}
                    </td>
                    {button_set}
                </tr>
            )
        })
    }

    /**
     * Displays Ledger table Headers/Column Titles with
     */
    renderTableHeader() {
        let header = ['Ride', 'Driver', 'Rider', 'Origin', 'Destination', 'Date','Status', 'Action'];
        return header.map((item) => {
            return <th key={item}>{item}</th>
        })
    }

    /**
     *
     * @returns The full table with headers and information
     */
    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

/**
 * Pulls users and rides from state
 * @param state
 * @returns {{rides: {}, users: {}}}
 */
const mapStateToProps = state => ({
    rides: state.rides,
    users: state.users
});

/**
 * Handles the backend calls for ride changes (reducer)
 * @param dispatch
 * @returns {{reactivateRide: (function(*=): *), deactivateRide: (function(*=): *), cancelRide: (function(*=): *), setActiveRide: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
    setActiveRide: (ride) => dispatch({
        type: "active_ride",
        payload: ride
    }),

    cancelRide: (rideID) => dispatch({
        type: "ride_cancel",
        payload: rideID
    }),

    deactivateRide: (rideID) => dispatch({
        type: "ride_deactivate",
        payload: rideID
    }),

    reactivateRide: (rideID) => dispatch({
        type: "ride_reactivate",
        payload: rideID
    }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LedgerTable));

