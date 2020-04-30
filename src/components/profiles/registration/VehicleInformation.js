import React, {Component} from 'react';
import {connect} from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration.css"

/**
 * Vehicle Information
 * @class VehicleInformation
 */
class VehicleInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handles when fields are changed
     *
     * @param {Object} event - what is typed into fields
     */
    handleChange(event) {
        let id = event.target.id.split("|")[0].replace("car_", "");
        let field = event.target.id.split("|")[1];
        switch (field) {
            default:
                this.props.updateRegistration("vehicles", id+"|"+field, event.target.value);
                break;
        }
	}

    /**
     * Creates the forms on the page
     *
     * @returns {[HTMLFormElement]} - HTML forms to be displayed
     */
    generateVehicleForms() {
        let body = [];
        let index = 0;
        if (this.props.vehicles.length === 0) body.push(<br key={"break"}/>);
        for (let a in this.props.vehicles) { // eslint-disable-line no-unused-vars
            body.push(
                <Card.Body key={index}>
                    <div className="reg_row">
                        <h6>Vehicle Information</h6>
                    </div>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>Vehicle Make/Model:</Form.Label>
                        <Col><Form.Control id={"car_"+index+"|make_model"} placeholder="--Make/Model--" onChange={this.handleChange} value={this.props.vehicles[index].make_model}/></Col>
                        <Col sm={3} lg={2}>
                            <Button id={index} variant="danger" onClick={(e) => this.props.removeVehicle(e.target.id)}>
                                Remove Vehicle
                            </Button>
                        </Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>Vehicle Year:</Form.Label>
                        <Col><Form.Control type="number" id={"car_"+index+"|year"} placeholder="--Year--" onChange={this.handleChange} value={this.props.vehicles[index].year}/></Col>
                        <Form.Label column sm={3} lg={2}>Vehicle Color:</Form.Label>
                        <Col><Form.Control id={"car_"+index+"|color"} placeholder="--Color--" onChange={this.handleChange} value={this.props.vehicles[index].color}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>License Plate:</Form.Label>
                        <Col><Form.Control id={"car_"+index+"|lp"} placeholder="--License Plate--" onChange={this.handleChange} value={this.props.vehicles[index].lp}/></Col>
                        <Form.Label column sm={3} lg={2}>Number of Seats:</Form.Label>
                        <Col><Form.Control type="number" id={"car_"+index+"|seats"} placeholder="--Number of Seats--" onChange={this.handleChange} value={this.props.vehicles[index].seats}/></Col>
                    </Row>
                    <hr/>
                    <div className="reg_row">
                        <h6>Insurance Information</h6>
                    </div>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>Provider:</Form.Label>
                        <Col><Form.Control id={"car_" + index + "|insur_provider"} placeholder="--Insurance Provider--"
                                           onChange={this.handleChange}
                                           value={this.props.vehicles[index].insur_provider}/></Col>
                        <Form.Label column sm={3} lg={2}>Policy Number:</Form.Label>
                        <Col><Form.Control id={"car_" + index + "|insur_policy"} placeholder="--Policy Number--"
                                           onChange={this.handleChange}
                                           value={this.props.vehicles[index].insur_policy}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>Insurance Expiration:</Form.Label>
                        <Col><Form.Control type="date" id={"car_" + index + "|insur_exp"}
                                           placeholder="--Expiration Date--" onChange={this.handleChange}
                                           value={this.props.vehicles[index].insur_exp}/></Col>
                        <Form.Label column sm={3} lg={2}>Coverage Amount:</Form.Label>
                        <Col><Form.Control type="number" id={"car_" + index + "|insur_coverage"}
                                           placeholder="--Coverage Amount--" onChange={this.handleChange}
                                           value={this.props.vehicles[index].insur_coverage}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>Date of Last Inspection:</Form.Label>
                        <Col><Form.Control type="date" id={"car_" + index + "|insp_date"}
                                           placeholder="--Date of Previous Inspection--" onChange={this.handleChange}
                                           value={this.props.vehicles[index].insp_date}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={3} lg={2}>Additional Notes:</Form.Label>
                        <Col><Form.Control as="textarea" rows={5} id={"car_" + index + "|special"}
                                           placeholder=""
                                           onChange={this.handleChange}
                                           value={this.props.vehicles[index].special}/></Col>
                    </Row>
                </Card.Body>
            );
            //Divide all the vehicles (do not place a break after the last value)
            if (index !== this.props.vehicles.length-1) body.push(<hr key={index + "_break"}/>);

            index++;
        }
        return(body);
    }

    /**
     * Displays the vehicle information and all its forms
     *
     * @returns {HTMLDocument}
     */
    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 style={{float:"left"}}>Vehicles</h5>
                    <Button variant="dark" style={{float:"right"}} onClick={() => this.props.addVehicle()}>
                        Add Vehicle
                    </Button>
                </Card.Header>
                {this.generateVehicleForms()}
                <h6>{" "}</h6>
            </Card>
        );
    }
}

/**
 * Pulls vehicles and user type from state's active ride
 */
const mapStateToProps = state => ({
    vehicles: state.active_profile.vehicles,
    user_type: state.active_profile.user_type
});

/**
 * Sets up functions to send registration and vehicle information to reducer
 */
const mapDispatchToProps = dispatch => ({
    updateRegistration: (type, id, value) => dispatch({
        type: "registration",
        payload: {
            type: type,
            id: id,
            value: value
        }
    }),
    addVehicle: () => dispatch({
        type: "registration",
        payload: {
            type: null,
            id: "add_vehicle",
            value: null
        }
    }),
    removeVehicle: (id) => dispatch({
        type: "registration",
        payload: {
            type: null,
            id: "remove_vehicle",
            value: id
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInformation);
