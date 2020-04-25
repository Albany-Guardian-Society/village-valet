import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RideEditor from "./EditRide";
import { withRouter } from 'react-router-dom';

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
     */
    handleSelect(event) {
        // event.target.id is the id of the ride
        // Highlight the row
        this.setState({selected_row: event.target.id.replace('edit','')});
        // This is the ride being selected
        this.props.setActiveRide(this.props.rides[event.target.id.replace('edit','')]);
        // When clicked go to schedule ride to edit ride
        console.log(event)

        this.props.history.push('/Ledger/EditRide/');
    }

    /**
     * Permanently deletes ride
     */
    handleCancel(rideID) {
        if (window.confirm("Are you sure you want to DELETE this ride?")) {
            this.props.cancelRide(rideID);
            window.alert("CANCELLED: " + rideID);
        }
    }

    /**
     * Deactivates ride when deactivate is clicked
     */
    handleDeactivateRide(rideID) {
        if (window.confirm("Are you sure you want to DEACTIVATE this ride?")) {
            this.props.deactivateRide(rideID);
            window.alert("DEACTIVATED: " + rideID);
        }
    }

    /**
     * Reactivates an inactive ride when reactivated is clicked
     */
    handleReactivateRide(rideID) {
        if (window.confirm("Are you sure you want to REACTIVATE this ride?")) {
            this.props.reactivateRide(rideID);
            window.alert("REACTIVATED: " + rideID);
        }
    }

    /**
     *
     * Displays Ledger table information with appropriate status tags and buttons
     */
    renderTableData() {
        let rides = this.props.rides;
        let keys = Object.keys(rides);
        return keys.map((key) => {
            if (rides[key].status === "active") {
                return (
                    <tr>
                        <td>{rides[key].id}</td>
                        <td>{rides[key].driver.first_name} {rides[key].driver.last_name}</td>
                        <td>{rides[key].rider.first_name} {rides[key].rider.last_name}</td>
                        <td>{rides[key].locations.pickup.address}</td>
                        <td>{rides[key].locations.dropoff.address}</td>
                        <td>{rides[key].ride_data.date}</td>
                        <td>Active</td>
                        <td>
                            <Button id={rides[key].id + "edit"} variant="primary" className="mr-1" size="sm"
                                    onClick={(e) => this.handleSelect(e)}>
                                Edit
                            </Button>
                            <Button id={rides[key].id + "deactivate"} variant="warning" className="mr-1" size="sm"
                                    onClick={() => this.handleDeactivateRide(rides[key].id)}>
                                Deactivate
                            </Button>
                            <Button id={rides[key].id + "cancel"} variant="danger" className="mr-1" size="sm"
                                    onClick={() => this.handleCancel(rides[key].id)}>
                                Cancel
                            </Button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{rides[key].id}</td>
                        <td>{rides[key].driver.first_name} {rides[key].driver.last_name}</td>
                        <td>{rides[key].rider.first_name} {rides[key].rider.last_name}</td>
                        <td>{rides[key].locations.pickup.address}</td>
                        <td>{rides[key].locations.dropoff.address}</td>
                        <td>{rides[key].ride_data.date}</td>
                        <td>Inactive</td>
                        <td>
                            <Button id={rides[key].id + "edit"} variant="primary" className="mr-1" size="sm"
                                    onClick={(e) => this.handleSelect(e)}>
                                Edit
                            </Button>
                            <Button id={rides[key].id + "reactivate"} variant="success" className="mr-1" size="sm"
                                    onClick={() => this.handleReactivateRide(rides[key].id)}>
                                Reactivate
                            </Button>
                            <Button id={rides[key].id + "cancel"} variant="danger" size="sm"
                                    onClick={() => this.handleCancel(rides[key].id)}>
                                Cancel
                            </Button>
                        </td>
                    </tr>
                )
            }
        })
    }

    /**
     *
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

