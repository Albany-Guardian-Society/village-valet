import React, {Component} from 'react';
import {connect} from "react-redux";
import firestore from "../../modules/firestore.js";

import {LoadScript} from "@react-google-maps/api";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import CommonAddresses from "./registration/CommonAddresses.js";
import EmergencyInformation from "./registration/EmergencyInformation.js";
import GeneralInformation from "./registration/GeneralInformation.js";
import SpecialAccommodations from "./registration/SpecialAccommodations.js";
import DriverSpecific from "./registration/DriverSpecific.js";
import VehicleInformation from "./registration/VehicleInformation.js";
import VolunteerSchedule from "./registration/VolunteerSchedule.js";
import CaregiverInformation from "./registration/CaregiveInformation";

// This page will build a user in its state then export that to the firebase.
// It should hopefully not "hit" the reducer to minimize clutter.
// Once a user is made it should be added to the store so another pull is not needed tho!

const DRIVER_MAX = 4;
const RIDER_MAX = 4;

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
                case 1: return (<EmergencyInformation/>);
                case 2: return (<VehicleInformation/>);
                case 3: return (<VolunteerSchedule/>);
                case 4: return (<DriverSpecific/>);
                default: break;
            }
        } else {
            switch (this.state.page) {
                case 0:
                    return (<GeneralInformation/>);
                case 1:
                    return (<CaregiverInformation/>);
                case 2:
                    return (<EmergencyInformation/>);
                case 3:
                    return (
                        <LoadScript
                            id="script-loader"
                            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}
                            libraries={["places"]}
                        >
                            <CommonAddresses/>
                        </LoadScript>);
                case 4:
                    return (<SpecialAccommodations/>);
                default:
                    break;
            }
        }
    }

    validateRegistration() {
        //Validate the registration
        // Might want to have a "list of errors and then display a bunch of them? might be ugly"
        // THis solution works for now
        if (!this.props.registration.user_type) {
            this.setState({
                errorMessage: "An \"Account Type\" is REQUIRED!",
                page: 0
            });
            return false
        }
        // //TEMPORARY
        // if (this.props.registration.user_type === "driver") {
        //     this.setState({
        //         errorMessage: "TEMPORARY: DRIVERS CANNOT BE CREATED",
        //         page: 0
        //     });
        //     return false
        // }

        if (!this.props.registration.personal_info.first_name) {
            this.setState({
                errorMessage: "A \"First Name\" is REQUIRED!",
                page: 0
            });
            return false
        }
        if (!this.props.registration.personal_info.last_name) {
            this.setState({
                errorMessage: "A \"Last Name\" is REQUIRED!",
                page: 0
            });
            return false
        }
        //Need atleast one form of communication
        if (!this.props.registration.personal_info.email
            && !this.props.registration.personal_info.phone_home
            && !this.props.registration.personal_info.phone_mobile) {
            this.setState({
                errorMessage: "At least one form of communication is REQUIRED!",
                page: 0
            });
            return false
        }
        //A user needs to give information for their choice of preferred communication
        if ((!this.props.registration.personal_info.email && this.props.registration.personal_info.preferred_communication === "email")
            || (!this.props.registration.personal_info.phone_home && this.props.registration.personal_info.preferred_communication === "home")
            || (!this.props.registration.personal_info.phone_mobile && this.props.registration.personal_info.preferred_communication === "mobile")) {
            this.setState({
                errorMessage: "You must provide information matching your communication preference.",
                page: 0
            });
            return false
        }

        // Once all validation passes submit the information to the firebase
        // Also add to the local list of users so a "re-pull" is not required immediatly
        this.submitRegistration();
        return true
    }

    //Might want to add this to the reducer for consistancy
    submitRegistration() {
        console.log(this.props.registration);
        firestore.collection("users").add(this.props.registration)
        .then((docRef) => {
            this.props.addUser(this.props.registration, docRef.id);
            this.props.clearRegistration();
            //This is part of react-router and allows forced page routing
            this.props.history.push('/Profiles');
        })
    }

    render() {
        return (
        <div style={{paddingLeft: "3%", paddingRight: "3%"}}>
            {this.state.errorMessage ?
                <Alert variant="danger">{this.state.errorMessage}</Alert>
            : null}
            {this.generatePage()}
            <br/>
            <Row style={{
                textAlign: "center",
                position: "fixed",
                left: "0",
                bottom: "0",
                height: "60px",
                width: "100%",}}>
                <Col> <Button variant="dark" size="lg" onClick={() => this.changePage(-1)} disabled={this.state.page === 0}>
                    {"< Prev"}
                </Button> </Col>
                <Col> <Button variant="primary" size="lg" onClick={() => {if (!this.validateRegistration()) window.scrollTo(0, 0);}}>
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
        addUser: (user, id) => dispatch({
            type: "add_user",
            payload: {...user, id: id}
        }),
    clearRegistration: () => dispatch({
        type: "clear_active_profile",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
