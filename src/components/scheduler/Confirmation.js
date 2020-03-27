import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MapContainer from "../google-maps/MapContainer";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <MapContainer>Trip Summary</MapContainer>
                    </Col>
                    <Col>
                        <Row>Name: {`${this.props.active_ride.rider.first_name}`} {`${this.props.active_ride.rider.last_name}`}</Row>
                        <Row>
                            <Col>
                                <Row>Pickup Location: {`${this.props.active_ride.locations.pickup.address}`}</Row>
                                <Row>Dropoff Location: {`${this.props.active_ride.locations.dropoff.address}`}</Row>
                                <Row>Return Location: {`${this.props.active_ride.locations.return.address}`}</Row>
                            </Col>
                            <Col>
                                <Row>Pickup Time: {`${this.props.active_ride.locations.pickup.time}`}</Row>
                                <Row>Dropoff Time: {`${this.props.active_ride.locations.pickup.time}`}</Row>
                                <Row>Return Time: {`${this.props.active_ride.locations.pickup.time}`}</Row>
                            </Col>
                        </Row>
                        <Row>Trip Duration: {`${this.props.active_ride.ride_data.time_total}`}</Row>
                        <Row>Expected Traffic: {`${this.props.active_ride.ride_data.traffic}`}</Row>
                        <Row>Driver: {`${this.props.active_ride.driver_1.first_name}`} {`${this.props.active_ride.driver_1.last_name}`}</Row>
                        <Row>Return Driver: {`${this.props.active_ride.driver_1.first_name}`} {`${this.props.active_ride.driver_1.last_name}`}</Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    active_ride: state.active_ride
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
