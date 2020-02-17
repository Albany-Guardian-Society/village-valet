import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav"
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import Ledger from "./Ledger.js"

class Metrics extends Component {
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
            <Container style={{minWidth: "100%"}}>
                <ButtonToolbar style={{padding:'5px'}}
                    className="justify-content-between"
                    aria-label="Toolbar with Button groups"
                >
                    <ButtonGroup aria-label="First group">
                        <Button  variant="info">Print</Button>
                    </ButtonGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="btnGroupAddon">Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            placeholder="Ride ID, Name, etc."
                            aria-label="Ride ID, Name, etc."
                            aria-describedby="btnGroupAddon"
                        />
                    </InputGroup>
                </ButtonToolbar>

                <Nav variant="pills" defaultActiveKey="/Metrics">
                    <Nav.Item>
                        <Nav.Link eventKey="/Metrics">Ledger</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Drivers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Riders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3">Reports</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Ledger/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
