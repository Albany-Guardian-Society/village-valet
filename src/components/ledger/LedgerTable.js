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

    handleCancel(rideID) {
        if (window.confirm("Are you sure you want to CANCEL this ride?")) {
            this.props.cancelRide(rideID);
            window.alert("DEACTIVATED: " + rideID);
        }
    }

    renderTableData() {
        let rides = this.props.rides;
        let keys = Object.keys(rides);
        for ( let i = 0, len = keys.length; i < len; i++) {
            return (
                <tr>
                    <td>{rides[keys[i]].id}</td>
                    <td>{rides[keys[i]].driver.first_name} {rides[keys[i]].driver.last_name}</td>
                    <td>{rides[keys[i]].rider.first_name} {rides[keys[i]].rider.last_name}</td>
                    <td>{rides[keys[i]].locations.pickup.address}</td>
                    <td>{rides[keys[i]].locations.dropoff.address}</td>
                    <td>{rides[keys[i]].ride_data.date}</td>
                    <td>
                        <Button id={rides[keys[i]].id} variant="danger" onClick={() => this.handleCancel(rides[keys[i]].id)}>
                            Cancel Ride
                        </Button>
                    </td>
                </tr>
            )

        }
        return rides.map((ride) => {
            return(
                <tr key={ride.id}>
                    <td>{ride.id}</td>
                </tr>
            )

        })
    }

    renderTableHeader() {
        let header = ['Ride', 'Driver', 'Rider', 'Origin', 'Destination', 'Date', 'Action'];
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