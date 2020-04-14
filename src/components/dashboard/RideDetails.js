import React, {Component} from 'react';
import {connect} from "react-redux";
import * as moment from "moment";

import Container from "react-bootstrap/Container";

class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
    }

    displayDetails() {
        if (this.props.ride.ride_id === "") {
            return <div/>
        }
        return <div>
            Ride Id: {this.props.ride.ride_id}<br/>
            Rider Name: {`${this.props.ride.rider.first_name} ${this.props.ride.rider.last_name}`} <br/>
            Driver Name: {`${this.props.ride.driver.first_name} ${this.props.ride.driver.last_name}`} <br/>
            Date: {this.props.ride.ride_data.date} <br/>
            Pickup Time: {moment(this.props.ride.locations.pickup.time, "HH:mm").format('hh:mm a')} <br/>
            Dropoff Time: {moment(this.props.ride.locations.dropoff.time, "HH:mm").format('hh:mm a')} <br/>
        </div>

    }


    render() {
        return (
            <Container>
                {this.displayDetails()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ride: state.active_ride

});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RideDetails);
