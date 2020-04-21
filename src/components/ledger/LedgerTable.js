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
        return keys.map((key) => {
            return (
                <tr>
                    <td>{rides[key].id}</td>
                    <td>{rides[key].driver.first_name} {rides[key].driver.last_name}</td>
                    <td>{rides[key].rider.first_name} {rides[key].rider.last_name}</td>
                    <td>{rides[key].locations.pickup.address}</td>
                    <td>{rides[key].locations.dropoff.address}</td>
                    <td>{rides[key].ride_data.date}</td>
                    <td>
                        <Button id={rides[key].id} variant="danger"
                                onClick={() => this.handleCancel(rides[key].id)}>
                            Cancel Ride
                        </Button>
                    </td>
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