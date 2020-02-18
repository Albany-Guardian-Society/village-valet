import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class Error extends Component {
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
                <Card.Header>Special Accommodations</Card.Header>
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
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
