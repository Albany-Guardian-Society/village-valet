import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card"
import RidesTable from "./RidesTable";

const TEST = [
    {
        id:53423,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432"
    },
    {
        id:5523455,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432"
    }
];

class UpcomingRides extends Component {
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
                <Card.Header>Upcoming Rides</Card.Header>
                <Card.Body>
                    <RidesTable rides = {TEST}/>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    ride: state.ridebreakdown
});

const mapDispatchToProps = dispatch => ({
    changeRideBreakdown: (ride) => dispatch({
        type: "ridebreakdown",
        payload: ride,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingRides);
