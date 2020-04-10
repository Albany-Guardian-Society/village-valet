import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import MapContainer from "../google-maps/MapContainer.js";
import axios from 'axios';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.messageTest = this.messageTest.bind(this);
    }

    handleChange(event){
    };

    riderMessage = {
        // Comma separated list of recipients
        to: '"' + this.props.users[this.props.active_ride.rider.id].personal_info.first_name + " " +this.props.users[this.props.active_ride.rider.id].personal_info.last_name +
            '" <' + this.props.users[this.props.active_ride.rider.id].personal_info.email + ">",

        // Subject of the message
        subject: 'AGS Village Valet Ride Confirmation: ' + this.props.active_ride.ride_data.date,

        // plaintext body
        text: '',

        // HTML body
        html: `<p><strong><u>AGS Village Valet Ride Confirmation</u></strong></p>\n` +
            `<p>Hello ${this.props.users[this.props.active_ride.rider.id].personal_info.first_name} ${this.props.users[this.props.active_ride.rider.id].personal_info.last_name},</p>\n` +
            `<p>The following information is your trip summary for your scheduled ride.</p>\n` +
            `<p><strong>Date:</strong> ${this.props.active_ride.ride_data.date} </p>\n` +
            `<p><strong>Pickup Address:</strong> ${this.props.active_ride.locations.pickup.address}</p>\n` +
            `<p><strong>Pickup Time:</strong> ${this.props.active_ride.locations.pickup.time}</p>\n` +
            `<p><strong>Drop off Address:</strong> ${this.props.active_ride.locations.dropoff.address}</p>\n` +
            `<p><strong>Drop off Time: TBD</strong></p>\n`+
            `<p><strong>Expected Traffic: TBD</strong></p>\n` +
            `<p><strong>Total Trip Duration: TBD</strong></p>\n` +
            `<p><br></p>\n` +
            `<p>Your driver, ${this.props.users[this.props.active_ride.driver_1.id].personal_info.first_name} ${this.props.users[this.props.active_ride.driver_1.id].personal_info.last_name}
            , will be driving a ${this.props.users[this.props.active_ride.driver_1.id].vehicles[0].color} ${this.props.users[this.props.active_ride.driver_1.id].vehicles[0].make_model} with
             the license plate ${this.props.users[this.props.active_ride.driver_1.id].vehicles[0].lp}. 
            They are aware of any special accommodations that you may have requested: ${this.props.users[this.props.active_ride.rider.id].accommodations.special}. You will be unable to cancel this 
            ride 48 hours prior to the pick up time. If you have any questions or would like to make any changes please feel 
            free to contact us.</p>\n` +
            `<p><br></p>\n` +
            `<p>Sincerely,</p>\n` +
            `<p>Village Valet</p>\n` +
            `<p><br></p>\n` +
            `<p>Village Valet Phone Number</p>\n` +
            `<p>Village Valet Address</p>\n` +
            `<p>Village Valet Email</p>\n`

    };



    messageTest() {
        console.log(this.riderMessage);
        axios.post('http://localhost:4000/send', {...this.riderMessage}).then()
    }

    render() {
        return (
            <Container className="Confirmation" style={{minWidth: "100%"}}>
                <h1>Confirmation</h1>
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
                <button onClick={this.messageTest}>Test</button>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    active_ride: state.active_ride,
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
