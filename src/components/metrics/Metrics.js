import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import Ledger from "./Ledger.js";
import Riders from "./Riders.js";
import Drivers from "./Drivers.js";
import Reports from "./Reports";

class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(value) {
        this.setState({metric_options:value})

    }

	changeTable() {
        switch (this.state.metric_options) {
            case "ledger":
                return (<Ledger/>);
            case "riders":
                return (<Riders/>);
            case "drivers":
                return (<Drivers/>);
            case "reports":
                return (<Reports/>);
            default:
                return(<Ledger/>);
        }
    }

    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <ButtonToolbar style={{paddingBottom:'1%'}}
                    className="justify-content-between"
                    aria-label="Toolbar with Button groups">
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleChange} >
                        <ToggleButton id='ledger'  value={'ledger'}>Ledger</ToggleButton>
                        <ToggleButton id='riders' value={'riders'}>Riders</ToggleButton>
                        <ToggleButton id='drivers' value={'drivers'}>Drivers</ToggleButton>
                        <ToggleButton id='reports'  value={'reports'}>Reports</ToggleButton>
                    </ToggleButtonGroup>

                    <ButtonGroup aria-label="First group">
                        <Button  variant="info">Download</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                {this.changeTable()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
