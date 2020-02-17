import React, { Component } from 'react';
import { connect } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// This page will build a user in its state then export that to the firebase.
// It should hopefully not "hit" the reducer to minimize clutter.
// Once a user is made it should be added to the store so another pull is not needed tho!

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ""
        };
		this.handleChange = this.handleChange.bind(this);
        this.validateRegistration = this.validateRegistration.bind(this);
    }

	handleChange(event) {
        switch(event.target.id) {
            default:
                this.setState({[event.target.id]: event.target.value})
                break;
        }
	}

    validateRegistration() {
        //Validate the registration
        // Might want to have a "list of errors and then display a bunch of them? might be ugly"
        // THis solution works for now
        if (!this.state.reg_type) {
            this.setState({errorMessage: "An \"Account Type\" is REQUIRED!"})
        }
        if (!this.state.reg_first_name) {
            this.setState({errorMessage: "A \"First Name\" is REQUIRED!"})
        }
    }

    render() {
        return (
        <div style={{paddingLeft: "3%", paddingRight: "3%"}}>
            {this.state.errorMessage ?
                <Alert variant="danger">{this.state.errorMessage}</Alert>
            : null}
            <div style={{width: "50%", float:"left"}}>
                <Card>
                    <Card.Body> <Row>
                        <Form.Label column sm={4}>Account Type</Form.Label>
                        <Col><Form.Control as="select" id="reg_type" onChange={this.handleChange}>
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
                        <Row>
                            <Form.Label column sm={5} lg={3}>First Name:</Form.Label>
                            <Col><Form.Control id="reg_first_name" placeholder="First Name" onChange={this.handleChange}/></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Last Name:</Form.Label>
                            <Col><Form.Control id="reg_last_name" placeholder="Last Name" onChange={this.handleChange}/></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Email:</Form.Label>
                            <Col><Form.Control id="reg_email" placeholder="Email Address" onChange={this.handleChange}/></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Mobile Phone:</Form.Label>
                            <Col><Form.Control id="reg_phone_mobile" placeholder="Mobile Phone" onChange={this.handleChange}/></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Home Phone:</Form.Label>
                            <Col><Form.Control id="reg_phone_home" placeholder="Home Phone" onChange={this.handleChange}/></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Communication Preference:</Form.Label>
                            <Col><Form.Control as="select" id="reg_pref_comm" onChange={this.handleChange}>
                                <option value="" label=""/>
                                <option value="mobile" label="Mobile Phone"/>
                                <option value="home" label="Home Phone"/>
                            </Form.Control></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Preferred Language:</Form.Label>
                            <Col><Form.Control as="select" id="reg_language" onChange={this.handleChange}>
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
            <div style={{width: "50%", float:"right"}}>
                <Button onClick={this.validateRegistration}>
                        Register
                </Button>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
