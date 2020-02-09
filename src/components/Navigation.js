import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

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
            <React.Fragment>
            <Navbar expand="lg" variant="light" bg="light">
                <Link to="/Dashboard">
                    <Navbar.Brand>Village Valet</Navbar.Brand>
                </Link>
                <Link to="/Scheduler"> Scheduler </Link>
                <Link to="/Profiles"> Profiles </Link>
                <Link to="/Metrics"> Metrics </Link>
                <Button onClick={this.props.logout}> Logout </Button>
            </Navbar>
            <br/>
            </React.Fragment>
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
