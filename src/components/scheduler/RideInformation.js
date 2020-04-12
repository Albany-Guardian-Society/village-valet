import React, {Component} from "react";
import {connect} from "react-redux";
import firebase from 'firebase/app';

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Autocomplete} from "@react-google-maps/api";

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
            this.props.active_ride.locations[variable].address = place.formatted_address;
            this.props.active_ride.locations[variable].geolocation = new firebase.firestore.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng());
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    render() {
        return (
            <Container className="RideInformation" style={{minWidth: "100%"}}>
                <h1>Ride Information</h1>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h5>Options</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Control readOnly type="text" placeholder="First Name"
                                              value={this.props.active_ride.rider.first_name}/>
                                <Form.Control readOnly type="text" placeholder="Last Name"
                                              value={this.props.active_ride.rider.last_name}/>
                                <Form.Control type="date" placeholder="" id='sched_date' onChange={this.handleChange}
                                              value={this.props.active_ride.ride_data.date}/>
                                <Form.Label>Return address same as Pickup?</Form.Label>
                                <Form.Check id='sched_meta_samereturn' onChange={this.handleChange}
                                            checked={this.props.active_ride.ride_data.meta.samereturn}/>
                                <Form.Label>Calculate route given pickup/dropoff time</Form.Label>
                                <Form.Control as="select" id='sched_meta_givendropoff' onChange={this.handleChange}
                                              value={this.props.active_ride.ride_data.meta.givendropoff}>
                                    <option value={true} label="Dropoff"/>
                                    <option value={false} label="Pickup"/>
                                </Form.Control>
                            </Card.Body>
                        </Card>
                    </Col> <Col>
                    <Card>
                        <Card.Header>
                            <h5>Pickup</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Pickup Address:</Form.Label>
                                    <Autocomplete
                                        onLoad={this.onLoad}
                                        onPlaceChanged={() => this.onPlaceChanged('pickup', 0)}
                                    >
                                        <Form.Control type="text" placeholder="Pickup Location"
                                                      id='sched_pickup_address' onChange={this.handleChange}
                                                      value={this.props.active_ride.locations.pickup.address}/>
                                    </Autocomplete>
                                    <Form.Label>Pickup Time:</Form.Label>
                                    <Form.Control type="time" id='sched_pickup_time'
                                                  onChange={(e) => this.handleChange(e)}
                                                  value={this.props.active_ride.locations.pickup.time}
                                                  readOnly={this.props.active_ride.ride_data.meta.givendropoff === "true"}/>
                                    <Form.Label>Special Instructions:</Form.Label>
                                    <Form.Control type="text" placeholder="Pickup Instructions"
                                                  id='sched_pickup_special' onChange={this.handleChange}
                                                  value={this.props.active_ride.locations.pickup.special}/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h5>Dropoff</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Label>Dropoff Address:</Form.Label>
                                        <Autocomplete
                                            onLoad={this.onLoad}
                                            onPlaceChanged={() => this.onPlaceChanged('dropoff', 1)}
                                        >
                                            <Form.Control type="text" placeholder="Dropoff Location"
                                                          id='sched_dropoff_address' onChange={this.handleChange}
                                                          value={this.props.active_ride.locations.dropoff.address}/>
                                        </Autocomplete>
                                        <Form.Label>Dropoff Time:</Form.Label>
                                        <Form.Control type="time" id='sched_dropoff_time'
                                                      onChange={(e) => this.handleChange(e)}
                                                      value={this.props.active_ride.locations.dropoff.time}
                                                      readOnly={this.props.active_ride.ride_data.meta.givendropoff === "false"}/>
                                        <Form.Label>Special Instructions:</Form.Label>
                                        <Form.Control type="text" placeholder="Dropoff Instructions"
                                                      id='sched_dropoff_special' onChange={this.handleChange}
                                                      value={this.props.active_ride.locations.dropoff.special}/>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    {!this.props.active_ride.ride_data.meta.samereturn ? <Col>
                        <Card>
                            <Card.Header>
                                <h5>Return</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Form.Label>Return Address:</Form.Label>
                                        <Autocomplete
                                            onLoad={this.onLoad}
                                            onPlaceChanged={() => this.onPlaceChanged('return', 2)}
                                        >
                                            <Form.Control type="text" placeholder="Return" id='sched_return_address'
                                                          onChange={this.handleChange}
                                                          value={this.props.active_ride.locations.return.address}/>
                                        </Autocomplete>
                                        <Form.Label>Return Time:</Form.Label>
                                        <Form.Control type="time" placeholder="return time" id='sched_return_time'
                                                      onChange={(e) => this.handleChange(e)}
                                                      value={this.props.active_ride.locations.return.time}/>
                                        <Form.Label>Special Instructions:</Form.Label>
                                        <Form.Control type="text" placeholder="Return Instructions"
                                                      id='sched_return_special' onChange={this.handleChange}
                                                      value={this.props.active_ride.locations.return.special}/>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col> : null}
                </Row>
                <br/>
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
