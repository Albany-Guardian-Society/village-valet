import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

// This page will build a user in its state then export that to the firebase.
// It should hopefully not "hit" the reducer to minimize clutter.
// Once a user is made it should be added to the store so another pull is not needed tho!

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_type: "",
            personal_information: {
                first_name: "",
                last_name: "",
                email: "",
                phone_mobile: "",
                phone_home: "",
                preferred_communication: "",

            }
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
        console.log(event.target.id)
        switch(event.target.id) {
            case "reg_type":
                this.setState({account_type: event.target.value})
                break;
            case "reg_first_name":
                this.setState({account_type: event.target.value})
                break;
            case "reg_last_name":
                this.setState({account_type: event.target.value})
                break;
            case "reg_type":
                this.setState({account_type: event.target.value})
                break;
            default: break;
        }
	}

    render() {
        return (
        <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
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
                                <option value="home" label="Home Phone"/>
                                <option value="mobile" label="Mobile Phone"/>
                            </Form.Control></Col>
                        </Row> <Row>
                            <Form.Label column sm={5} lg={3}>Preferred Language:</Form.Label>
                            <Col><Form.Control as="select" id="reg_language" onChange={this.handleChange}>
                                <option/>
                            </Form.Control></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            <div style={{width: "50%", float:"right"}}>
                Yo, This is a Register page.
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
