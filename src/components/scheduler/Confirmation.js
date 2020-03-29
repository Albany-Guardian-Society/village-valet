import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import MapContainer from "../google-maps/MapContainer.js";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
    };

    message = {
        // Comma separated list of recipients
        to: '${riderFirstName} ${riderLastName} <${riderEmail}>, ${driverFirstName} ${driverLastName} <${driverEmail}> ',

        // Subject of the message
        subject: 'AGS Village Valet Ride Confirmation' + Date.now(),

        // plaintext body
        text: '',

        // HTML body
        html: "<p><strong>AGS Village Valet Ride Confirmation</strong></p>\n" +
            "<p><u><strong>Rider Trip Summary</strong></u></p>\n" +
            "<p>Rider Name: {this.props.active_ride.rider.first_name} + \" \" + {this.props.active_ride.rider.last_name}</p>\n" +
            "<p>Pickup Location: {this.props.active_ride.locations.pickup_address}</p>\n" +
            "<p>Dropoff Location: {this.props.active_ride.locations.dropoff_address}</p>\n" +
            "<p>Trip Duration: {this.props.active_ride.ride_data.time_total}</p>\n" +
            "<p>Expected Traffic: {this.props.active_ride.ride_data.traffic}</p>\n" +
            "<p>\n" +
            "  <br>\n" +
            "</p>\n" +
            "<p><strong><u>Driver Trip Summary</u></strong></p>\n" +
            "<p>Pickup Driver Name: {this.props.active_ride.driver_1.first_name} + ' ' + {this.props.active_ride.driver_1.last_name}&nbsp;</p>\n" +
            "<p>Return Driver Name: {this.props.active_ride.driver_2.first_name} + ' ' + {this.props.active_ride.driver_2.last_name}</span>&nbsp;</p>\n" +
            "<p>Return Destination: {this.props.active_ride.locations. return address}</p>",

    };

    render() {
        return (
            <Container className="Confirmation" style={{minWidth: "100%"}}>
                <h1>Confirmation</h1>
                {this.message}
                <Row>
                    <Col>
                        <MapContainer>Trip Summary</MapContainer>
                    </Col>
                    <Col>
                        <Table><tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{this.props.active_ride.rider.first_name + " " + this.props.active_ride.rider.last_name}</td>
                            </tr>
                            <tr>
                                <td>Pickup:</td>
                                <td>{this.props.active_ride.locations.pickup.address}</td>
                            </tr>
                            <tr>
                                <td>Dropoff:</td>
                                <td>{this.props.active_ride.locations.dropoff.address}</td>
                            </tr>
                            <tr>
                                <td>Trip Duration:</td>
                                <td>{this.props.active_ride.ride_data.time_total}</td>
                            </tr>
                            <tr>
                                <td>Expected Traffic:</td>
                                <td>{this.props.active_ride.ride_data.traffic}</td>
                            </tr>
                            <tr>
                                <td>Driver:</td>
                                <td>{this.props.active_ride.driver_1.first_name} {this.props.active_ride.driver_1.last_name}</td>
                            </tr>
                            <tr>
                                <td>Return Driver:</td>
                                <td>{this.props.active_ride.driver_2.first_name} {this.props.active_ride.driver_2.last_name}</td>
                            </tr>
                            <tr>
                                <td>Return Destination:</td>
                                <td>{this.props.active_ride.locations.return.address}</td>
                            </tr>
                        </tbody></Table>
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
