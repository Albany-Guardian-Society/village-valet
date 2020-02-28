import React, { Component } from 'react';
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
        console.log(this.props.ride);
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
            <Container>
                {this.displayDetails()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ride: state.ridebreakdown

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RideDetails);
