import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import MapContainer from "../google-maps/MapContainer";

class RideBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);

    }

	handleChange(event) {
	}

	displayDetails() {
        if (this.props.ride === undefined) {
            return <div></div>
        }
        return <div>
            Ride Id: {this.props.ride.id}<br></br>
            Rider Name: {this.props.ride.rider}<br></br>
            Driver Name: {this.props.ride.rider}
        </div>

    }


    render() {
        return (
            <Card style={{height:'100%'}}>
                <Card.Header>Ride Breakdown</Card.Header>
                <Card.Body>
                    {this.displayDetails()}
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                        <MapContainer/>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    ride: state.ridebreakdown
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RideBreakdown);
