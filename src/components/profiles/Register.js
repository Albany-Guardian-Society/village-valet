import React, { Component } from 'react';
import { connect } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import CommonAddresses from "./registration/CommonAddresses.js";
import EmergencyInformation from "./registration/EmergencyInformation.js";
import GeneralInformation from "./registration/GeneralInformation.js";
import SpecialAccommodations from "./registration/SpecialAccommodations.js";
import VehicleInformation from "./registration/VehicleInformation.js";

// This page will build a user in its state then export that to the firebase.
// It should hopefully not "hit" the reducer to minimize clutter.
// Once a user is made it should be added to the store so another pull is not needed tho!

const DRIVER_MAX = 4;
const RIDER_MAX = 3;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            page: 0
        };
		this.handleChange = this.handleChange.bind(this);
        this.validateRegistration = this.validateRegistration.bind(this);
        this.changePage = this.changePage.bind(this);
    }

	handleChange(event) {
	}

    changePage(increment) {
        let proposed_page = this.state.page + increment;
        //Handle minimum
        if (proposed_page < 0) proposed_page = 0;

        //Handle highest page number
        if (this.props.registration.user_type === "rider") {
            if (proposed_page > RIDER_MAX) proposed_page = RIDER_MAX;
        } else {
            if (proposed_page > DRIVER_MAX) proposed_page = DRIVER_MAX;
        }

        this.setState({page: proposed_page})
    }

    generatePage() {
        // The directory of pages should change based on a rider/driver, 0
        // will always be the same
        if (this.props.registration.user_type === "driver") {
            switch(this.state.page) {
                case 0: return (<GeneralInformation/>);
                default: break;
            }
        } else {
            switch(this.state.page) {
                case 0: return (<GeneralInformation/>);
                case 1: return (<EmergencyInformation/>);
                case 2: return (<CommonAddresses/>);
                case 3: return (<SpecialAccommodations/>);
                default: break;
            }
        }
    }

    validateRegistration() {
        //Validate the registration
        // Might want to have a "list of errors and then display a bunch of them? might be ugly"
        // THis solution works for now
        if (!this.props.registration.user_type) {
            this.setState({errorMessage: "An \"Account Type\" is REQUIRED!"})
            return 0
        }
        if (!this.props.registration.personal_info.first_name) {
            this.setState({errorMessage: "A \"First Name\" is REQUIRED!"})
            return 0
        }
        return 1
    }

    render() {
        return (
        <div style={{paddingLeft: "3%", paddingRight: "3%"}}>
            {this.state.errorMessage ?
                <Alert variant="danger">{this.state.errorMessage}</Alert>
            : null}
            {this.props.registration.user_type ?
                <Alert variant={"primary"}>Creating {this.props.registration.user_type.replace(/^\w/, c => c.toUpperCase())}</Alert>
            : null}
            {this.generatePage()}
            <br/>
            <Row>
                <Col> <Button variant="dark" size="lg" onClick={() => this.changePage(-1)} disabled={this.state.page === 0}>
                    {"< Prev"}
                </Button> </Col>
                <Col> <Button variant="primary" size="lg" onClick={this.validateRegistration}>
                    Validate and Register
                </Button> </Col>
                <Col>
                    <Button variant="dark" size="lg" onClick={() => this.changePage(1)} disabled={!this.props.registration.user_type || (this.props.registration.user_type === "driver" && this.state.page >= DRIVER_MAX) || (this.props.registration.user_type === "rider" && this.state.page >= RIDER_MAX)}>
                        {"Next >"}
                    </Button>
                </Col>
            </Row>
            <br/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    registration: state.active_profile
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
