import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card";

import RidesTable from "./RidesTable";

const TEST = [
    {
        id:1234,
        rider:'Rider Name',
        driver:'Driver Name',
        locations: {
            origin: {lat: 42.6526, lng: -73.7562},
            pickup: {lat: 42.7301, lng: -73.7012},
            destination: {lat: 42.7284, lng: -73.6918}
        }
    },
    {
        id:5555,
        rider:'Rider Name',
        driver:'Driver Name',
        locations: {origin: {lat: 41.6526, lng: -73.7562}, destination: {lat: 41.7284, lng: -73.6918}}
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
