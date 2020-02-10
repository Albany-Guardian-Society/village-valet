import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import firestore from "../modules/firestore.js";
import bcrypt from "bcryptjs";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Image from "react-bootstrap/Image";
import logo from "../assets/VillageValetLogo.jpg"

import "../App.css";

class Login extends Component {
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

    componentDidMount() {
        //When the enter key is pressed while on the login page
        //Process the login
        document.addEventListener('keyup', (k) => {
            if (k.keyCode === 13) {
                k.preventDefault();
                document.getElementById("login_button").click();
            }
        })
    }

    handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		}
	}

    handleLogin() {
        //Verify that the username and password match operator credetials
        firestore.collection("operators").where("username", "==", this.state.username.toLowerCase()).get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            if (data.length === 1) {
                if (bcrypt.compareSync(this.state.password, data[0].password)) {
                    this.props.updateAuth(data[0].username);
                    this.props.history.push('/Dashboard')
                } else {
                    this.setState({errorMessage: "Login Failed: Your username/password do not match."})
                }
            } else {
                this.setState({errorMessage: "Login Failed: Your username cannot be found."});
            }
        })
    }

    render() {
        return (
            <Container className="Login">
            <br/>
            <Row>
                <Col>
                    <Image src={logo} className="Login-Logo"/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                {this.state.errorMessage ?
                    <Alert variant="danger">
                        {this.state.errorMessage}
                    </Alert>
                : null}
                </Col>
            </Row>
            <Row>
                <Col>
                <Card className="Login-Box">
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Username:</Form.Label>
                            <Col>
                                <Form.Control id="username" placeholder="Username" onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Password:</Form.Label>
                            <Col>
                                <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>
                        <Button id="login_button" variant="primary" onClick={this.handleLogin}>
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
    authenticated: state.authenticated
});

const mapDispatchToProps = dispatch => ({
    updateAuth: (user) => dispatch({
        type: "authenticate",
        payload: user
    }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
