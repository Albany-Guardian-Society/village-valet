import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MapContainer from "../google-maps/MapContainer";
import ProfileTable from "../profiles/ProfileTable";
import Table from "react-bootstrap/Table";

class SelectDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        if (event.target.id === "search") this.setState({search_term: event.target.value});
        else if (event.target.id === "sched_vehicle") this.props.updateScheduler("vehicle", null, event.target.value);
    };

    vehicleOptions() {
        let options = [<option value={""} label={""}/>];
        if (!this.props.active_ride.driver.id) return options;
        options.push(...this.props.users[this.props.active_ride.driver.id].vehicles.map((car)=>{
            return <option value={car} label={car.year + " " + car.make_model}/>
        }));
        return options;
    };

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
                <ProfileTable search_term={this.state.search_term} mode={ "driver"}/>
                <Row>
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
                                <Form.Control as="select" id="sched_vehicle" onChange={this.handleChange} value={this.props.active_ride.driver.vehicle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectDriver);
