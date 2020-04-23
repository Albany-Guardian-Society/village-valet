import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class LedgerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleDeactivateRide(rideID) {
        if (window.confirm("Are you sure you want to DEACTIVATE this ride?")) {
            this.props.deactivateRide(rideID);
            window.alert("DEACTIVATED: " + rideID);
        }
    }

    handleReactivateRide(rideID) {
        if (window.confirm("Are you sure you want to REACTIVATE this ride?")) {
            this.props.reactivateRide(rideID);
            window.alert("REACTIVATED: " + rideID);
        }
    }

    handleCancel(rideID) {
        if (window.confirm("Are you sure you want to DELETE this ride?")) {
            this.props.cancelRide(rideID);
            window.alert("CANCELLED: " + rideID);
        }
    }

    renderTableData() {
        let rides = this.props.rides;
        let keys = Object.keys(rides);
        return keys.map((key) => {
            if (rides[key].ride_data.status === "active") {
                return (
                    <tr>
                        <td>{rides[key].id}</td>
                        <td>{rides[key].driver.first_name} {rides[key].driver.last_name}</td>
                        <td>{rides[key].rider.first_name} {rides[key].rider.last_name}</td>
                        <td>{rides[key].locations.pickup.address}</td>
                        <td>{rides[key].locations.dropoff.address}</td>
                        <td>{rides[key].ride_data.date}</td>
                        <td>{rides[key].ride_data.status}</td>
                        <td>
                            <Button id={rides[key].id + "deactivate"} variant="warning"
                                    onClick={() => this.handleDeactivateRide(rides[key].id)}>
                                Deactivate
                            </Button>
                            <Button id={rides[key].id + "cancel"} variant="danger"
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
                        <td>{rides[key].ride_data.status}</td>
                        <td>
                            <Button id={rides[key].id + "reactivate"} variant="success"
                                    onClick={() => this.handleReactivateRide(rides[key].id)}>
                                Reactivate
                            </Button>
                            <Button id={rides[key].id} variant="danger"
                                    onClick={() => this.handleCancel(rides[key].id)}>
                                Cancel
                            </Button>
                        </td>
                    </tr>
                )
            }
        })
    }

    renderTableHeader() {
        let header = ['Ride', 'Driver', 'Rider', 'Origin', 'Destination', 'Date', 'Status', 'Action'];
        return header.map((item) => {
            return <th key={item}>{item}</th>
        })
    }

    handleChange(event){
    };

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

const mapStateToProps = state => ({
    rides: state.rides,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    cancelRide: (rideID) => dispatch({
        type: "ride_cancel",
        payload: rideID
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(LedgerTable);