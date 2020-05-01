import React, {Component} from "react";
import {connect} from "react-redux";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table"
import {Autocomplete} from "@react-google-maps/api";
import MapContainer from "../google-maps/MapContainer";
import moment from "moment";

// Above are all the imports for this file.
// Every file will need React, Component, connect

// The second section of imports are React Bootstrap components.  These allow for easy styling
// and layout without much need for custom CSS or HTML

/**
 * @class RideInformation
 * @typedef {Object} RideInformation
 *
 */
class RideInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCommonAddress = this.handleCommonAddress.bind(this);

        this.autocomplete = {};
        this.count = 0;

        this.onLoad = this.onLoad.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    /**
     * Updates and saves selected date and time on the page
     * in the form
     *
     * @example
     *     onChange={this.handleChange}
     */
    componentDidMount() {
        let today = moment()
        //Set the default day to be one week in advance
        if (!this.props.active_ride.ride_data.date) {
            this.props.updateScheduler("date", null, today.add(8, 'days').format("YYYY-MM-DD"));
        }
    }

    handleChange(event) {
        let label_flag = event.target.id.split("_");
        if (label_flag[1] === "date") {
            //updating the date
            this.props.updateScheduler(label_flag[1], null, event.target.value);
        } else if (label_flag[1] === "purpose") {
            //updating the date
            this.props.updateScheduler(label_flag[1], null, event.target.value);
        } else if (label_flag[1] === "meta" && label_flag[2] === "samereturn") {
            //updating the date
            this.props.updateScheduler(label_flag[2], null, event.target.checked)
        } else {
            //updating the location
            this.props.updateScheduler(label_flag[1], label_flag[2], event.target.value)
        }
    };


    /**
     * When the operator selects "other" the autocomplete form will
     * become editable
     * If they do not select other then it will the form will filled and will not
     * be able to be changed.
     *
     * @example
     *     onChange={this.handleCommonAddress}
     */
    handleCommonAddress(event, type) {
        if (event.target.value === "other") {
            //Update store
            this.props.updateScheduler("common_address", "set|"+type, event.target.value);
        } else {
            this.props.updateScheduler("common_address", type, this.props.active_ride.rider.id+"|"+event.target.value.replace("addr_", ""));
        }
    }

    getSelectedItems() {
        let items = [];
        let addresses = [];
        for (let i = 0; i < this.props.users.length; i++) {
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

    /**
     * Creates more autocompletes and keeps track of them at different indices
     *
     * @example
     *     onChange={this.handleChanget}
     */
    onLoad(autocomplete) {
        this.autocomplete[this.count] = autocomplete;
        this.count += 1
    }

    /**
     * Uses autocomplete to list relevant addresses for pick up and drop off
     * based on what is typed in.
     *
     * @example
     *     onPlaceChanged  ={() => this.onPlaceChanged('pickup', 0)}
     */
    onPlaceChanged(variable, number) {
        if (this.autocomplete[number] != null) {
            const place = this.autocomplete[number].getPlace();
            this.props.updateScheduler(variable, "address", place.formatted_address);
            this.props.updateScheduler(variable, "geolocation", {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
            if (place.geometry !== null) {
                this.props.updateScheduler(variable, "address", place.formatted_address);
                this.props.updateScheduler(variable, "geolocation", {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });
            }
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    /**
     * Grabs all common addresses for person of interest
     * and loads them into the available options
     *
     * @example
     *      {this.getCommonAddresses("pickup")}
     *
     */
    getCommonAddresses(mode) {
        let options = [];
        if (!this.props.active_ride.locations[mode].address) options.push(<option value={""} label={""} key="null"/>);
        if (!this.props.active_ride.rider.id) return options;
        options.push(...this.props.users[this.props.active_ride.rider.id].addresses.map((loc)=>{
            return <option value={"addr_"+loc.line_1} label={loc.name} key={loc.name}/>
        }));
        options.push(<option value={"other"} label={"--Other--"} key="other"/>)
        return options;
    }

    vehicleOptions() {
        let options = [<option value={""} label={""}/>];
        if (!this.props.active_ride.driver.id) return options;
        options.push(...this.props.users[this.props.active_ride.driver.id].vehicles.map((car)=>{
            return <option value={car.lp} label={car.year + " " + car.make_model}/>
        }));
        return options;
    };

    /**
     * Displays the confirmation page.
     *
     * @returns {HTMLDocument}
     *
     */
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
                                            <Form.Label>Trip Purpose:</Form.Label>
                                        </td>
                                        <td>
                                            <Form.Control as="select" placeholder="" id='sched_purpose' onChange={this.handleChange} value={this.props.active_ride.ride_data.purpose}>
                                                {["", "Medical Appointments", "Pharmacy", "Grocery", "Congregate Meal", "Social Activity", "Religious", "Personal Care", "Errands", "Vet (Pet)", "Gym", "Restaurant"]
                                                    .map((item) => {
                                                        return <option label={item} value={item} key={item}/>
                                                    })}
                                            </Form.Control>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Mobility Aid:
                                        </td>
                                        <td>
                                            {this.props.users[this.props.active_ride.rider.id].accommodations.mobility_aid ? `${this.props.users[this.props.active_ride.rider.id].accommodations.mobility_aid}` : "N/A"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Special Accommodations:
                                        </td>
                                        <td>
                                            {this.props.users[this.props.active_ride.rider.id].accommodations.special ? `${this.props.users[this.props.active_ride.rider.id].accommodations.special}` : "N/A"}
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
                                Pickup to Dropoff
                            </Card.Header>
                            <Card.Body>
                                <Row style={{position: 'relative', width: '100%', height: '250px'}}>
                                    <MapContainer/>
                                </Row>
                                <Row>
                                    <Col>Estimated Rider Trip Duration:</Col>
                                    <Col>
                                        {this.props.active_ride.ride_data.time_total.rider ?
                                            moment("2015-01-01").startOf('day')
                                            .seconds(this.props.active_ride.ride_data.time_total.rider)
                                            .format('H:mm:ss') : ""}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>Based on dropoff time, pickup time should be:</Col>
                                    <Col>
                                        {(this.props.active_ride.locations.dropoff.time) ?
                                            moment(this.props.active_ride.locations.dropoff.time, "HH:mm")
                                                .subtract(this.props.active_ride.ride_data.time_total.rider, 'second')
                                                .format('hh:mm:ss A') : ""}
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
                                            <Form.Control as="select"
                                                          id='sched_pickup_address' onChange={(e) => this.handleCommonAddress(e, "pickup")}
                                                          value={this.props.active_ride.ride_data.meta.pickup_CA}>
                                                  {this.getCommonAddresses("pickup")}
                                            </Form.Control>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <Autocomplete
                                                onLoad={this.onLoad}
                                                onPlaceChanged  ={() => this.onPlaceChanged('pickup', 0)}
                                            >
                                                <Form.Control type="text" placeholder="Pickup Location"
                                                              disabled = {this.props.active_ride.ride_data.meta.pickup_CA !== "other"}
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
                                                          value={this.props.active_ride.locations.pickup.time}/>
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
                                            <Form.Control as="select"
                                                          id='sched_dropoff_address'
                                                          onChange={(e) => this.handleCommonAddress(e, "dropoff")}
                                                          value={this.props.active_ride.ride_data.meta.dropbox_CA}>
                                                {this.getCommonAddresses("dropoff")}
                                            </Form.Control>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <Autocomplete
                                                onLoad={this.onLoad}
                                                onPlaceChanged={() => this.onPlaceChanged('dropoff', 1)}
                                            >
                                                <Form.Control type="text" placeholder="Dropoff Location"
                                                              id='sched_dropoff_address' onChange={this.handleChange}
                                                              disabled = {this.props.active_ride.ride_data.meta.dropoff_CA !== "other"}
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
                                                          value={this.props.active_ride.locations.dropoff.time}/>
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
            </Container>
        );
    }
}
/**
 * Pulls active_ride and users from state
 *
 */
const mapStateToProps = state => ({
    active_ride: state.active_ride,
    users: state.users
});
/**
 * Sets up functions to send scheduler information to the reducer
 *
 */
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
