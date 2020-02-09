import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

	handleChange(event) {
	}

    handleLogin() {
        this.props.updateAuth(1);
    }

    render() {
        return (
            <Container>
            <Row>
                <Col>
                Image
                </Col>
            </Row>
            <Row>
                <Col>
                <Card>
                    <Form>
                    <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleLogin}>
                        Submit
                    </Button>
                    </Form>
                </Card>
                </Col>
            </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateAuth: (id) => dispatch({
        type: "authenticate",
        payload: id
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
