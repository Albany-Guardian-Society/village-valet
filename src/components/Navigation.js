import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
            <Navbar bg="light" variant="light" style={{width: "100%"}}>
                <Navbar.Brand>
                    <Link to="/Dashboard" style={{ textDecoration: 'none' }}>Village Valet</Link>
                </Navbar.Brand>
                <Col>
                    <Link to="/Scheduler" style={{ textDecoration: 'none' }}>Scheduler</Link>
                </Col>
                <Col>
                    <Link to="/Profiles" style={{ textDecoration: 'none' }}>Profiles</Link>
                </Col>
                <Col>
                    <Link to="/Ledger" style={{ textDecoration: 'none' }}>Ledger</Link>
                </Col>
                <Col>
                    <Link to="/Metrics" style={{ textDecoration: 'none' }}>Metrics</Link>
                </Col>
                <Col><Button variant="dark" onClick={this.props.debug}> DEBUG </Button></Col>
                <Col style={{textAlign:"right"}}>
                    <span>Operator:&nbsp;{this.props.operator}</span>
                </Col>
                <Col>
                    <Button variant="dark" onClick={this.props.logout}> Logout </Button>
                </Col>
            </Navbar>
            <br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    operator: state.operator.first_name,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({
        type: "logout",
        payload: null
    }),
    debug: () => dispatch({
        type: "dump_store",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
