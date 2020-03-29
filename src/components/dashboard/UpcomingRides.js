import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card"
import RidesTable from "./RidesTable";

const TEST = [
    {
        id:53423,
        rider:'Rider Name',
        driver:'Driver Name',
        locations: {
            origin: {lat: 42.6526, lng: -73.7562},
            pickup: {lat: 42.7301, lng: -73.7012},
            destination: {lat: 42.7284, lng: -73.6918}
        }
    },
    {
        id:5523455,
        rider:'Rider Name',
        driver:'Driver Name',
        locations: {
            origin: {lat: 42.6526, lng: -73.7562},
            pickup: {lat: 42.7301, lng: -73.7012},
            destination: {lat: 42.7284, lng: -73.6918}
        }
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
