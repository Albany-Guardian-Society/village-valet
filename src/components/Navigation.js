import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import "../App.css";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		}
	}

    render() {
        return (
            <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand>
                    <Link to="/Dashboard" style={{ textDecoration: 'none' }}>Village Valet</Link>
                </Navbar.Brand>
                <Nav>
                    <Nav.Item>
                        <Link to="/Scheduler" style={{ textDecoration: 'none' }}>Scheduler</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/Profiles" style={{ textDecoration: 'none' }}>Profiles</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/Metrics" style={{ textDecoration: 'none' }}>Metrics</Link>
                    </Nav.Item>
                </Nav>
                <Form inline>
                    <Button onClick={this.props.logout}> Logout </Button>
                </Form>
            </Navbar>
            <br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({
        type: "logout",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
