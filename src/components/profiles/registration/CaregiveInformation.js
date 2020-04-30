import React, {Component} from 'react';
import {connect} from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "./registration.css"

// May wish to add the ability for multiple caregivers

/**
 * Caregiver Information
 * @class CaregiverInformation
 */
class CaregiverInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handles when fields are changed
     *
     * @param {Object} event - what is typed into fields
     */
    handleChange(event) {
        switch (event.target.id) {
            default:
                this.props.updateRegistration("caregiver", event.target.id.replace('reg_', ''), event.target.value);
                break;
        }
    }

    /**
     * Displays the caregiver information
     *
     * @returns {HTMLDocument}
     */
    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 style={{float: "left"}}>Caregiver Contact</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="reg_row">
                        <Form.Label column sm={4} lg={2}>First Name:</Form.Label>
                        <Col><Form.Control id="reg_first_name" placeholder="First Name" onChange={this.handleChange}
                                           value={this.props.caregiver.first_name}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4} lg={2}>Last Name:</Form.Label>
                        <Col><Form.Control id="reg_last_name" placeholder="Last Name" onChange={this.handleChange}
                                           value={this.props.caregiver.last_name}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4} lg={2}>Email:</Form.Label>
                        <Col><Form.Control id="reg_email" placeholder="Email Address" onChange={this.handleChange}
                                           value={this.props.caregiver.email}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4} lg={2}>Mobile Phone:</Form.Label>
                        <Col><Form.Control id="reg_phone_mobile" placeholder="Mobile Phone" onChange={this.handleChange}
                                           value={this.props.caregiver.phone_mobile}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4} lg={2}>Home Phone:</Form.Label>
                        <Col><Form.Control id="reg_phone_home" placeholder="Home Phone" onChange={this.handleChange}
                                           value={this.props.caregiver.phone_home}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4} lg={2}>Communication Preference:</Form.Label>
                        <Col><Form.Control as="select" id="reg_preferred_communication" onChange={this.handleChange}
                                           value={this.props.caregiver.preferred_communication}>
                            <option value="" label=""/>
                            <option value="email" label="Email"/>
                            <option value="mobile" label="Mobile Phone"/>
                            <option value="home" label="Home Phone"/>
                        </Form.Control></Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

/**
 * Pulls caregiver and user type from state's active ride
 */
const mapStateToProps = state => ({
    caregiver: state.active_profile.caregiver,
    user_type: state.active_profile.user_type
});

/**
 * Sets up function to send caregiver information to reducer
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CaregiverInformation);
