import React, {Component} from "react";
import {connect} from "react-redux";
import firebase from 'firebase/app';

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
<<<<<<< HEAD
import Table from "react-bootstrap/Table";
=======
import Col from "react-bootstrap/Col";
>>>>>>> dev
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table"
import {Autocomplete} from "@react-google-maps/api";
import MapContainer from "../google-maps/MapContainer";

//import './pic_placeholder.png';

class RideInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.autocomplete = {};
        this.count = 0;

        this.onLoad = this.onLoad.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    handleChange(event) {
        let label_flag = event.target.id.split("_");
        if (label_flag[1] === "date") {
            //updating the date
            this.props.updateScheduler(label_flag[1], null, event.target.value)
        } else if (label_flag[1] === "meta") {
            console.log(label_flag[2]);
            if (label_flag[2] === "samereturn") {
                //updating the date
                this.props.updateScheduler(label_flag[2], null, event.target.checked)
            } else if (label_flag[2] === "givendropoff") {
                //updating the date
                this.props.updateScheduler(label_flag[2], null, event.target.value)
            }
        } else {
            //updating the location
            this.props.updateScheduler(label_flag[1], label_flag[2], event.target.value)
        }
    };

    getSelectedItems() {
        let items = [];
        let addresses = [];
        for (let i = 0; i < this.props.users.length; i++) {
            console.log(this.props.users[i].id);
            console.log(this.props.active_ride.rider.id);
            if (this.props.users[i].id === this.props.active_ride.rider.id) {
                // this.setState({addresses: this.props.users[i].addresses});
                let addresses = this.props.users[i].addresses
            }
        }
        for (let i = 0; i < addresses.length; i++) {
            items.push(<option key={i} value={i}>{i}</option>);
        }
        return items
    }

    onSelected(e) {
        console.log("value", e.target.value);
        //here you will see the current selected value of the select input
    }

    onLoad(autocomplete) {
        this.autocomplete[this.count] = autocomplete;
        this.count += 1
    }

    onPlaceChanged(variable, number) {
        if (this.autocomplete[number] != null) {
            const place = this.autocomplete[number].getPlace();
            // //The store should REALLY NOT be updated like this.
            // this.props.active_ride.locations[variable].address = place.formatted_address;
            // this.props.active_ride.locations[variable].geolocation = new firebase.firestore.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng());

            //Sould use the reducer
            console.log(variable);
            this.props.updateScheduler(variable, "address", place.formatted_address);
            this.props.updateScheduler(variable, "geolocation", new firebase.firestore.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng()));

        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    render() {
        return (
            <Container className="RideInformation" style={{minWidth: "100%"}}>
                <h1>Ride Information</h1>
                <Row>
<<<<<<< HEAD
                    <Table><tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{this.props.active_ride.rider.first_name + " " + this.props.active_ride.rider.last_name}</td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td><Form.Control type="date" placeholder="Date" id='sched_date' onChange={this.handleChange}
                                              value={this.props.active_ride.ride_data.date}/></td>
                        </tr>
                    </tbody></Table>
                    <Table><tbody>
                        <tr>
                            <td>Address</td>
                            <td>
                                <Autocomplete
                                    onLoad={this.onLoad}
                                    onPlaceChanged={() => this.onPlaceChanged('pickup', 0)}
                                >
                                <Form.Control type="text" placeholder="Pickup Location"
                                              id='sched_pickup_address' onChange={this.handleChange}
                                              value={this.props.active_ride.locations.pickup.address}/>
                                </Autocomplete>
                            </td>
                            <td>
                                <Autocomplete
                                    onLoad={this.onLoad}
                                    onPlaceChanged={() => this.onPlaceChanged('dropoff', 1)}
                                >
                                <Form.Control type="text" placeholder="Dropoff Location"
                                              id='sched_dropoff_address' onChange={this.handleChange}
                                              value={this.props.active_ride.locations.dropoff.address}/>
                                </Autocomplete>
                            </td>
                        </tr>
                        <tr>
                            <td>Special Instructions</td>
                            <td><Form.Control type="text" placeholder="Pickup Instructions"
                                              id='sched_pickup_special' onChange={this.handleChange}
                                              value={this.props.active_ride.locations.pickup.special}/></td>
                            <td><Form.Control type="text" placeholder="Dropoff Instructions"
                                              id='sched_dropoff_special' onChange={this.handleChange}
                                              value={this.props.active_ride.locations.dropoff.special}/></td>
                        </tr>
                        <tr>
                            <td>Time</td>
                            <td><Form.Control type="time" placeholder="Pickup Time" id='sched_pickup_time'
                                              onChange={(e) => this.handleChange(e)}
                                              value={this.props.active_ride.locations.pickup.time}/></td>
                            <td><Form.Control type="time" placeholder="Dropoff Time" id='sched_dropoff_time'
                                              onChange={(e) => this.handleChange(e)}
                                              value={this.props.active_ride.locations.dropoff.time}/></td>
                        </tr>
                    </tbody></Table>
                </Row>
                <MapContainer>Pickup to Dropoff Map</MapContainer>
=======
                    <Col>
                        <Card>
                            <Card.Header>
                                <h5>Options</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table borderless>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{`${this.props.active_ride.rider.first_name}`} {`${this.props.active_ride.rider.last_name}`}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Date:</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control type="date" placeholder="" id='sched_date' onChange={this.handleChange}
                                                          value={this.props.active_ride.ride_data.date}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Calculate route given pickup/dropoff time</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control as="select" id='sched_meta_givendropoff' onChange={this.handleChange}
                                                          value={this.props.active_ride.ride_data.meta.givendropoff}>
                                                <option value={true} label="Dropoff"/>
                                                <option value={false} label="Pickup"/>
                                            </Form.Control>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>{/*<MapContainer>Pickup to Dropoff</MapContainer>*/}</Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h5>Pickup</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table borderless>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Form.Label>Address:</Form.Label>
                                        </td>
                                        <td>
                                            <Autocomplete
                                                onLoad={this.onLoad}
                                                onPlaceChanged={() => this.onPlaceChanged('pickup', 0)}
                                            >
                                                <Form.Control type="text" placeholder="Pickup Location"
                                                              id='sched_pickup_address' onChange={this.handleChange}
                                                              value={this.props.active_ride.locations.pickup.address}/>
                                            </Autocomplete>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Time:</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control type="time" id='sched_pickup_time'
                                                          onChange={(e) => this.handleChange(e)}
                                                          value={this.props.active_ride.locations.pickup.time}
                                                          readOnly={this.props.active_ride.ride_data.meta.givendropoff === "true"}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Special Instructions:</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="Pickup Instructions"
                                                          id='sched_pickup_special' onChange={this.handleChange}
                                                          value={this.props.active_ride.locations.pickup.special}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h5>Dropoff</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table borderless>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Form.Label>Address:</Form.Label>
                                        </td>
                                        <td>
                                            <Autocomplete
                                                onLoad={this.onLoad}
                                                onPlaceChanged={() => this.onPlaceChanged('dropoff', 0)}
                                            >
                                                <Form.Control type="text" placeholder="Dropoff Location"
                                                              id='sched_dropoff_address' onChange={this.handleChange}
                                                              value={this.props.active_ride.locations.dropoff.address}/>
                                            </Autocomplete>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Time:</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control type="time" id='sched_dropoff_time'
                                                          onChange={(e) => this.handleChange(e)}
                                                          value={this.props.active_ride.locations.dropoff.time}
                                                          readOnly={this.props.active_ride.ride_data.meta.givendropoff === "false"}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label>Special Instructions:</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="Dropoff Instructions"
                                                          id='sched_dropoff_special' onChange={this.handleChange}
                                                          value={this.props.active_ride.locations.dropoff.special}/>
                                        </td>
                                    </tr>
                                </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
>>>>>>> dev
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    active_ride: state.active_ride,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    updateScheduler: (type, field, value) => dispatch({
        type: "scheduler",
        payload: {
            type: type,
            field: field,
            value: value
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RideInformation);
