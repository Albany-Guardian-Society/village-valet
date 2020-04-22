import React, {Component} from 'react';
import {connect} from "react-redux";
import * as moment from 'moment';

import Card from "react-bootstrap/Card";

import RidesTable from "./RidesTable";

class ActiveRides extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
    }

    filterRides() {
        if (this.props.rides) {
            return Object.values(this.props.rides).filter(ride => ride.ride_data.date ===
                moment().format('YYYY-MM-DD')
                && moment(ride.locations.pickup.time, 'HH:mm').isSameOrBefore({
                    h: moment().hours(),
                    m: moment().minutes()
                }) &&
                moment(ride.locations.dropoff.time, "HH:mm").isSameOrAfter({
                    h: moment().hours(),
                    m: moment().minutes()
                }))
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>Active Rides</Card.Header>
                <Card.Body style={{alignItems: 'center'}}>
                    <RidesTable rides={this.filterRides()}/>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    rides: state.rides
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRides);
