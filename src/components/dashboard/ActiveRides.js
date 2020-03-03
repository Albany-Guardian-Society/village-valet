import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";

import RidesTable from "./RidesTable";

const TEST = [
    {
        id:1234,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432",
        locations: {orign:{latitude:42.6526,longitude:-73.7562},
        destination:{latitude:42.7284,longitude:-73.6918}}
    },
    {
        id:5555,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432",
        locations:{orign:{latitude:42.6526,longitude:-73.7562},
        destination:{latitude:42.7284,longitude:-73.6918}}
    }
];

class ActiveRides extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }


	handleChange(event) {
	}

    render() {
        return (
            <Card>
                <Card.Header>Active Rides</Card.Header>
                <Card.Body style={{alignItems:'center'}}>
                    <RidesTable rides = {TEST}/>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    changeRideBreakdown: (ride) => dispatch({
        type: "ridebreakdown",
        payload: ride,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRides);
