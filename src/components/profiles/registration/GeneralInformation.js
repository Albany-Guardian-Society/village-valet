import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "./registration.css"

class GeneralInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
        switch (event.target.id) {
            case "reg_language":
                //When language is a multiselect
                this.props.updateRegistration("personal_info", event.target.id.replace('reg_',''), [event.target.value])
                break;
            default:
                this.props.updateRegistration("personal_info", event.target.id.replace('reg_',''), event.target.value)
                break;
        }
	}

    render() {
        return (
            <div>
                <Card>
                    <Card.Body> <Row>
                        <Form.Label column sm={4}  lg={2}>Account Type</Form.Label>
                        <Col><Form.Control as="select" id="reg_user_type" onChange={this.handleChange} value={this.props.user_type}>
                            <option value="" label=""/>
                            <option value="rider" label="Rider"/>
                            <option value="driver" label="Driver"/>
                        </Form.Control></Col>
                    </Row></Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>General Information</Card.Header>
                    <Card.Body>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>First Name:</Form.Label>
                            <Col><Form.Control id="reg_first_name" placeholder="First Name" onChange={this.handleChange} value={this.props.personal_info.first_name}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Last Name:</Form.Label>
                            <Col><Form.Control id="reg_last_name" placeholder="Last Name" onChange={this.handleChange} value={this.props.personal_info.last_name}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Email:</Form.Label>
                            <Col><Form.Control id="reg_email" placeholder="Email Address" onChange={this.handleChange} value={this.props.personal_info.email}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Mobile Phone:</Form.Label>
                            <Col><Form.Control id="reg_phone_mobile" placeholder="Mobile Phone" onChange={this.handleChange} value={this.props.personal_info.phone_mobile}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Home Phone:</Form.Label>
                            <Col><Form.Control id="reg_phone_home" placeholder="Home Phone" onChange={this.handleChange} value={this.props.personal_info.phone_home}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Communication Preference:</Form.Label>
                            <Col><Form.Control as="select" id="reg_preferred_communication" onChange={this.handleChange} value={this.props.personal_info.preferred_communication}>
                                <option value="" label=""/>
                                <option value="mobile" label="Mobile Phone"/>
                                <option value="home" label="Home Phone"/>
                            </Form.Control></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Preferred Language:</Form.Label>
                            <Col><Form.Control as="select" id="reg_language" onChange={this.handleChange} value={this.props.personal_info.language}>
                                {/*https://names.mongabay.com/languages/counties/Albany_County_NY.html*/}
                                <option/>
                                <option value="english" label="English"/>
                                <option value="spanish" label="Spanish"/>
                                <option value="french" label="French"/>
                                <option value="italian" label="Italian"/>
                                <option value="chinese" label="Chinese"/>
                                <option value="korean" label="Korean"/>
                                <option value="arabic" label="Arabic"/>
                            </Form.Control></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    personal_info: state.registration.personal_info,
    user_type: state.registration.user_type
});

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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
