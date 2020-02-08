import React, { Component } from 'react';
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
                <Navbar.Brand href="/Dashboard"> Village Valet </Navbar.Brand>
                <Nav.Link href="/Scheduler"> Scheduler </Nav.Link>
                <Nav.Link href="/Profiles"> Profiles </Nav.Link>
                <Nav.Link href="/Metrics"> Metrics </Nav.Link>
                <Button> Logout </Button>
            </Navbar>
            <br/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
