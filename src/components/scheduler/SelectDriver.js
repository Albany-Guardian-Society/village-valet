import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MapContainer from "../google-maps/MapContainer";
import ProfileTable from "../profiles/ProfileTable";
import Table from "react-bootstrap/Table";

// Above are all the imports for this file.
// Every file will need React, Component, connect

// The second section of imports are React Bootstrap components.  These allow for easy styling
// and layout without much need for custom CSS or HTML.

/**
 * SelectDriver
 * @typedef {Object} SelectDriver
 *
 */
class SelectDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Fills field for vehicle selection
     *
     * @example
     *     onChange={this.handleChange}
     */
    handleChange(event){
        if (event.target.id === "search") this.setState({search_term: event.target.value});
        else if (event.target.id === "sched_vehicle") this.props.updateScheduler("vehicle", this.props.active_ride.driver.id, event.target.value);
    };

    /**
     * Loads vehicle options for driver
     *
     * @example
     *     {this.vehicleOptions()}
     */
    vehicleOptions() {
        let options = [<option value={""} label={""} key={"null"}/>];
        if (!this.props.active_ride.driver.id) return options;
        options.push(...this.props.users[this.props.active_ride.driver.id].vehicles.map((car)=>{
            console.log(car);
            return <option key={car.lp} value={car.lp} label={car.year + " " + car.make_model}/>
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
            <Container className="SelectDriver" style={{minWidth: "100%"}}>
                <h1>Select Driver</h1>
                <Form>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Control type="search" id="search" placeholder="Search Drivers" onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>
                </Form>
                <hr/>
                <Row style={{height: "30vh", overflow: "scroll"}}>
                    <ProfileTable search_term={this.state.search_term} mode={"driver"}/>
                </Row>
                <Row style={{height: "30vh"}}>
                    <Col>
                        <MapContainer>Trip Summary</MapContainer>
                    </Col>
                    <Col>
                        <Row>
                            <Col>Driver:</Col>
                            <Col>{`${this.props.active_ride.driver.first_name}`} {`${this.props.active_ride.driver.last_name}`}</Col>
                        </Row>
                        <Row>
                            <Col>Select Vehicle:</Col>
                            <Col>
                                <Form.Control as="select" id="sched_vehicle" onChange={this.handleChange} value={this.props.active_ride.driver.vehicle.lp}>
                                    {this.vehicleOptions()}
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>Trip Duration:</Col>
                            <Col>{`${this.props.active_ride.ride_data.time_total}`}</Col>
                        </Row>
                    </Col>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectDriver);
