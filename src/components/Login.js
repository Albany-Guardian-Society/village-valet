import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import axios from "axios";

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
import cookie from 'react-cookies'


import {API_ROOT} from "../modules/api"

// Above are all the imports for this file.
// Every file will need React, Component, connect
// withRouter, firestore, bcrypt relate to the specific function of this page

// The seconf section of imports are React Bootstrap components.  These allow for easy styling
// and layout without much need for custom CSS or HTML.

// Finally, the last three imports are for the logo and custom css

/** @class Login authenticates the login for the operator, without this the app cannot be used*/
class Login extends Component {
    // The construction will be pretty constant.  The "props" are variables passed down from
    // the components parent (through an HTML attribute)
    // The state is basically the member variables of a component.
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
			showPassword: false,
            errorMessage: ""
        };
        // You basically just need to do this if you want access to state in a functiton
        // other than render
		this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    // This is a lifecycle state function of react.  It is called every time a component loads.
    // There are a couple of these methods, but DidMount is the most useful imo.
    componentDidMount() {
        //When the enter key is pressed while on the login page, process the login
        document.addEventListener('keyup', this.key_function);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.key_function);
    }

    //This was done to remove the bug that hitting enter caused the page to crash because "login_button" was not rendered
    key_function = (k) => {
        if (k.keyCode === 13) {
            k.preventDefault();
            document.getElementById("login_button").click();
        }
    }

    // I like to use a single handler for each "thing" I want a component to do.
    // This function handles when a user changes the text fields on the page.  It saves
    // information to the state.  I usually use this function to save information to the
    // store (reducer) but the login is a niche case.
    handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		}
	}

    // This function handles the login and is called when the login button is pressed.
    // It just does some firebase calls checking against the operators table.
    // The two important React things are the "this.props.updateAuth" and "this.setState"
    // The first as discussed above saves things only to this component. (Updating the state
    // triggers a "re-render", so by changing the text of errorMessage I can make it appear
    // on the page without any code besides assigning a variable.)
    // The this.props.updateAuth is a dispatch function (defined at the bottom of the file)
    // It passes a message to the reducer stack to be "reduced" into the store.
    handleLogin() {
        axios.post(API_ROOT + "/admin/login", {
            username: this.state.username.toLowerCase(),
            password: this.state.password
        }).then((response) => {
                cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                const user = {...response.data};
                this.props.updateAuth(user);
                this.props.history.push('/Dashboard');
                window.location.reload();
            }
        ).catch(error => {
            this.setState({errorMessage: "Login Failed: " + error.response.data.error})
        })
    }

    // render() is the bread and butter of react.  JSX (a mix of JS and HTML) is used to
    // create the actual layout of the page.  This can basically be thought of as writing
    // HTML and then using { } whenever you want to include code.  One example is in the second
    // <Row> which includes a ternery that causes a conditional render of the <Alert> which also
    // uses {this.state.errorMessage} to display the errorMessage as the elemets innerHTML
    // The second example is the some of the attributes like sm={2} or onClick={this.handleLogin}
    // In these cases the value of the attribue is being supplied as "code" instead of text
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

// mapStateToProps and mapDispatchToProps are part of the Redux implementation.
// mapStateToProps allows you to read variables from the store
const mapStateToProps = state => ({
    authenticated: state.authenticated
});

//mapDispatchToProps allows you to define function that pass information to the reducer
const mapDispatchToProps = dispatch => ({
    updateAuth: (user) => dispatch({
        type: "authenticate",
        payload: user
    }),
});

//This is the export it is REQUIRED unless a compenet will never have a parent or need to be imported
// Most components will not need the withRouter(), it exists here because of the forced page routing
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
