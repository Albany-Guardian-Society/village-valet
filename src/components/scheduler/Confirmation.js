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
            <Container className="Confirmation" style={{minWidth: "100%"}}>
                <h1>Confirmation</h1>
                <Row>
                    <Col>
                        <MapContainer>Trip Summary</MapContainer>
                    </Col>
                    <Col>
                        <Row>
                            Name: {this.props.active_ride.rider.first_name} {this.props.active_ride.rider.last_name}
                        </Row>
                        <Row>
                            Pickup: {this.props.active_ride.locations.pickup}
                        </Row>
                        <Row>
                            Dropoff: {this.props.active_ride.locations.dropoff}
                        </Row>
                        <Row>
                            Trip Duration: {this.props.active_ride.ride_data.time_total}
                        </Row>
                        <Row>
                            Expected Traffic: {this.props.active_ride.ride_data.traffic}
                        </Row>
                        <Row>
                            Driver: {this.props.active_ride.driver_1.first_name} {this.props.active_ride.driver_1.last_name}
                        </Row>
                        <Row>
                            Return Driver: {this.props.active_ride.driver_2.first_name} {this.props.active_ride.driver_2.last_name}
                        </Row>
                        <Row>
                            Return Destination: {this.props.active_ride.locations.return}
                        </Row>
                    </Col>
                </Row>
            </Container>

        );
    }
}

const mapStateToProps = state => ({
    active_ride: state.active_ride,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
