import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card"
import RidesTable from "./RidesTable";
import * as moment from "moment";

/** @class UpcomingRides shows upcoming rides*/

class UpcomingRides extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
    }

    /**
     * Filters for future rides by date
     * @returns ride object
     */

    filterRides() {
        if (this.props.rides) {
            return Object.values(this.props.rides).filter(ride => ride.ride_data.date ===
                moment().format('YYYY-MM-DD') &&
                moment(ride.locations.pickup.time, "HH:mm").isAfter({h: moment().hours(), m: moment().minutes()}))
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>Upcoming Rides</Card.Header>
                <Card.Body>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingRides);
