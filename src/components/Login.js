import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import bcrypt from "bcryptjs";

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
            username: "",
            password: "",
			showPassword: false,
            errorMessage: ""
        };
		this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		}
        console.log(event.target.value)
	}

    handleLogin() {
        //Verify that the username and password match operator credetials
        firestore.collection("operators").where("username", "==", this.state.username.toLowerCase()).get()
        .then(querySnapshot => {
            console.log(querySnapshot.docs);
            const data = querySnapshot.docs.map(doc => doc.data());
            if (data.length === 1) {
                if (bcrypt.compareSync(this.state.password, data[0].password)) {
                    this.props.updateAuth(data[0].username);
                } else {
                    this.setState({errorMessage: "Login Failed: Your username/password do not match."})
                }
            } else {
                this.setState({errorMessage: "Login Failed: Your username cannot be found."});
            }
        })
        console.log(bcrypt.hashSync(this.state.password, 10));
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
                {this.state.errorMessage}
                </Col>
            </Row>
            <Row>
                <Col>
                <Card>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control id="username" placeholder="Username" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleLogin}>
                            Login
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
    updateAuth: (user) => dispatch({
        type: "authenticate",
        payload: user
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
