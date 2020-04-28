import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import Riders from "./Riders.js";
import Drivers from "./Drivers.js";
import Reports from "./Reports";
import Col from "react-bootstrap/Col";

//Reports
import MileageReport from "./reports/MileageReport.js";

class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          metric_options: "drivers",
        };
		this.handleChange = this.handleChange.bind(this);
    }

    /**
     * handles the metrics tab button presses
     * @param value: the metric/report selected
     */
	   handleChange(value) {
        this.setState({metric_options:value})

    }

    /**
     * changes the report to be downloaded
     * @returns {*}: Components to the corresponding metric/report
     */
    pickReport() {
      if (this.state.metric_options === "reports") {
        if (this.props.active_profile.id) {
          return <MileageReport/>
        } else {
          return <p>Select a Person</p>
        }
      }
    }

    /**
     * changes the displayed table
     * @returns {*}: Components to the corresponding metric/report
     */
	   changeTable() {
        switch (this.state.metric_options) {
            case "riders":
                return (<Riders/>);
            case "drivers":
                return (<Drivers/>);
            case "reports":
                return (<Reports/>);
            default:
                return(<Riders/>);
        }
    }

    /**
     * Displays the metrics toolbar, download button, and selected metric/report
     * @returns {*}
     */
    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <ButtonToolbar
                    className="justify-content-between"
                    aria-label="Toolbar with Button groups">

                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleChange} >
                        <ToggleButton id='riders' value={'riders'}>Riders</ToggleButton>
                        <ToggleButton id='drivers' value={'drivers'}>Drivers</ToggleButton>
                        <ToggleButton id='reports'  value={'reports'}>Reports</ToggleButton>
                    </ToggleButtonGroup>

                    <Col sm={2}>
                        {this.pickReport()}
                    </Col>
                </ButtonToolbar>
                <hr/>
                {this.changeTable()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
  active_profile: state.active_profile
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
