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

    handleSelect(event) {
        //Highlight the row
        this.setState({selected_row: event.target.id});

        //Update the active_profile
        //First convert id into index


        this.props.setActiveRide(this.props.ride[event.target.id]);

        this.props.history.push('/Scheduler/SelectRider/'+event.target.id);

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
                        <Button id={rides[keys[i]].id} variant="danger">
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
    setActiveRide: (ride) => dispatch({
        type: "set_active_ride",
        payload: ride
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(LedgerTable);