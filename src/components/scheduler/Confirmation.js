import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table"

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
                        <Table>
                            <tr>
                                <td>Name:</td>
                                <td>{`${this.props.active_ride.rider.first_name}`} {`${this.props.active_ride.rider.last_name}`}</td>
                            </tr>
                            <tr>
                                <td>Pickup Location:</td>
                                <td>{`${this.props.active_ride.locations.pickup.address}`}</td>
                            </tr>
                            <tr>
                                <td>Dropoff Location:</td>
                                <td>{`${this.props.active_ride.locations.dropoff.address}`}</td>
                            </tr>
                            <tr>
                                <td>Pickup Time:</td>
                                <td>{`${this.props.active_ride.locations.pickup.time}`}</td>
                            </tr>
                            <tr>
                                <td>Dropoff Time:</td>
                                <td>{`${this.props.active_ride.locations.pickup.time}`}</td>
                            </tr>
                            <tr>
                                <td>Trip Duration:</td>
                                <td>{`${this.props.active_ride.ride_data.time_total}`}</td>
                            </tr>
                            <tr>
                                <td>Driver:</td>
                                <td>{`${this.props.active_ride.driver.first_name}`} {`${this.props.active_ride.driver.last_name}`}</td>
                            </tr>
                        </Table>
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
