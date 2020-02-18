import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "./registration.css"

class EmergencyInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}

    render() {
        return (
            <Card>
                <Card.Header>Emergency Contact</Card.Header>
                <Card.Body>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>First Name:</Form.Label>
                        <Col><Form.Control id="reg_first_name" placeholder="First Name" onChange={this.handleChange} value={this.props.emergency_contact.first_name}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Last Name:</Form.Label>
                        <Col><Form.Control id="reg_last_name" placeholder="Last Name" onChange={this.handleChange} value={this.props.emergency_contact.last_name}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Email:</Form.Label>
                        <Col><Form.Control id="reg_email" placeholder="Email Address" onChange={this.handleChange} value={this.props.emergency_contact.email}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Mobile Phone:</Form.Label>
                        <Col><Form.Control id="reg_phone_mobile" placeholder="Mobile Phone" onChange={this.handleChange} value={this.props.emergency_contact.phone_mobile}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Home Phone:</Form.Label>
                        <Col><Form.Control id="reg_phone_home" placeholder="Home Phone" onChange={this.handleChange} value={this.props.emergency_contact.phone_home}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Communication Preference:</Form.Label>
                        <Col><Form.Control as="select" id="reg_preferred_communication" onChange={this.handleChange} value={this.props.emergency_contact.preferred_communication}>
                            <option value="" label=""/>
                            <option value="mobile" label="Mobile Phone"/>
                            <option value="home" label="Home Phone"/>
                        </Form.Control></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Relationship:</Form.Label>
                        <Col><Form.Control id="reg_relationship" onChange={this.handleChange} value={this.props.emergency_contact.relationship}/></Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    emergency_contact: state.registration.emergency_contact,
    user_type: state.registration.user_type
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyInformation);
