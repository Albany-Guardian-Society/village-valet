import React, {Component} from 'react';
import {connect} from "react-redux";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import CommonAddresses from "./registration/CommonAddresses.js";
import EmergencyInformation from "./registration/EmergencyInformation.js";
import GeneralInformation from "./registration/GeneralInformation.js";
import SpecialAccommodations from "./registration/SpecialAccommodations.js";
import DriverSpecific from "./registration/DriverSpecific.js";
import VehicleInformation from "./registration/VehicleInformation.js";
import VolunteerSchedule from "./registration/VolunteerSchedule.js";
import CaregiverInformation from "./registration/CaregiveInformation";
import moment from "moment";
import axios from "axios";
import {API_ROOT} from "../../modules/api";
import cookies from "react-cookies";

// This page will build a user in its state then export that to the firebase.
// It should hopefully not "hit" the reducer to minimize clutter.
// Once a user is made it should be added to the store so another pull is not needed tho!

const DRIVER_MAX = 5;
const RIDER_MAX = 4;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error_message: "",
            page: 0
        };
		this.handleChange = this.handleChange.bind(this);
        this.validateRegistration = this.validateRegistration.bind(this);
        this.changePage = this.changePage.bind(this);
    }

	handleChange(event) {
	}

    changePage(increment) {
        if (increment <= 0 || this.validateRegistration()) {
            let proposed_page = this.state.page + increment;
            //Handle minimum
            if (proposed_page < 0) proposed_page = 0;

            //Handle highest page number
            if (this.props.registration.user_type === "rider" && proposed_page > RIDER_MAX) {
                proposed_page = RIDER_MAX;
            } else if (proposed_page > DRIVER_MAX) {
                proposed_page = DRIVER_MAX;
            }

            this.setState({page: proposed_page, error_message: ""});
        } else {
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }

    generatePage() {
        // The directory of pages should change based on a rider/driver, 0
        // will always be the same
        if (this.props.registration.user_type === "driver") {
            switch(this.state.page) {
                case 0: return (<GeneralInformation/>);
                case 1: return (<CommonAddresses mode="driver"/>);
                case 2: return (<EmergencyInformation/>);
                case 3: return (<VehicleInformation/>);
                case 4: return (<VolunteerSchedule/>);
                case 5: return (<DriverSpecific/>);
                default: break;
            }
        } else {
            switch (this.state.page) {
                case 0: return (<GeneralInformation/>);
                case 1: return (<CommonAddresses mode="rider"/>);
                case 2: return (<EmergencyInformation/>);
                case 3: return (<CaregiverInformation/>);
                case 4: return (<SpecialAccommodations/>);
                default: break;
            }
        }
    }

    validateEmail(email) {
        let emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(email);
    }

    validatePhoneNumber(number){
        let phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return phoneNumberPattern.test(number);
    }

    validateZipCode(zip){
        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        return zipCodePattern.test(zip);
    }

    validateRegistration() {
        //Validate the registration
        // Might want to have a "list of errors and then display a bunch of them? might be ugly"
        // THis solution works for now
        switch (this.state.page) {
            case 0:
                if (!this.props.registration.user_type) {
                    this.setState({error_message: "INVALID ACCOUNT TYPE: Please select an account type."});
                    return false;
                } else if (!this.props.registration.personal_info.first_name) {
                    this.setState({error_message: "INVALID FIRST NAME: Please provide a first name."});
                    return false;
                } else if (!this.props.registration.personal_info.last_name) {
                    this.setState({error_message: "INVALID LAST NAME: Please provide a last name."});
                    return false;
                }
                switch (this.props.registration.personal_info.preferred_communication) {
                    case "email":
                        if (!this.validateEmail(this.props.registration.personal_info.email)) {
                            this.setState({error_message: "INVALID EMAIL: Please provide a properly formatted email."});
                            return false;
                        }
                        break;
                    case "mobile":
                        if (!this.validatePhoneNumber(this.props.registration.personal_info.phone_mobile)) {
                            this.setState({error_message: "INVALID MOBILE PHONE: Please provide a properly formatted mobile phone number."});
                            return false;
                        }
                        break;
                    case "home":
                        if (!this.validatePhoneNumber(this.props.registration.personal_info.phone_home)) {
                            this.setState({error_message: "INVALID HOME PHONE: Please provide a properly formatted home phone number."});
                            return false;
                        }
                        break;
                    default:
                        this.setState({error_message: "INVALID COMMUNICATION PREFERENCE: Please select a form of communication."})
                        return false;
                }
                if (this.props.registration.personal_info.language.length === 0) {
                    this.setState({error_message: "INVALID LANGUAGE: Please provide a language."});
                    return false;
                }
                return true;
            case 1:
                if (this.props.registration.user_type === "rider") {
                    let address_names = new Set();
                    for (let i = 0; i < this.props.registration.addresses.length; i++) {
                        if (address_names.has(this.props.registration.addresses[i].name)) {
                            this.setState({error_message: "REDUNDANT ADDRESS NAME: Please provide a unique address name."});
                            address_names.clear();
                            return false;
                        } else if (!this.props.registration.addresses[i].name) {
                            this.setState({error_message: "INVALID ADDRESS NAME: Please provide an address name."});
                            return false;
                        } else if (!this.props.registration.addresses[i].line_1) {
                            this.setState({error_message: "INVALID ADDRESS LINE 1: Please provide an address."});
                            return false;
                        } else if (!this.props.registration.addresses[i].city) {
                            this.setState({error_message: "INVALID CITY: Please provide a city."});
                            return false;
                        } else if (!this.props.registration.addresses[i].state) {
                            this.setState({error_message: "INVALID STATE: Please provide a state."});
                            return false;
                        } else if (!this.props.registration.addresses[i].zip) {
                            this.setState({error_message: "INVALID ZIP CODE: Please provide a zip code."});
                            return false;
                        }
                        address_names.add(this.props.registration.addresses[i].name);
                    }
                    address_names.clear();
                    return true;
                }
                else if (this.props.registration.user_type === "driver") {
                    if (!this.props.registration.addresses[0].name) {
                        this.setState({error_message: "INVALID ADDRESS NAME: Please provide an address name."});
                        return false;
                    } else if (!this.props.registration.addresses[0].line_1) {
                        this.setState({error_message: "INVALID ADDRESS LINE 1: Please provide an address."});
                        return false;
                    } else if (!this.props.registration.addresses[0].city) {
                        this.setState({error_message: "INVALID CITY: Please provide a city."});
                        return false;
                    } else if (!this.props.registration.addresses[0].state) {
                        this.setState({error_message: "INVALID STATE: Please provide a state."});
                        return false;
                    } else if (!this.validateZipCode(this.props.registration.addresses[0].zip)) {
                        this.setState({error_message: "INVALID ZIP CODE: Please provide a zip code."});
                        return false;
                    }
                    return true;
                }
                return false;
            case 2:
                if (!this.props.registration.emergency_contact.first_name) {
                    this.setState({error_message: "INVALID FIRST NAME: Please provide a first name."});
                    return false;
                } else if (!this.props.registration.emergency_contact.last_name) {
                    this.setState({error_message: "INVALID LAST NAME: Please provide a last name."});
                    return false;
                } else if (this.props.registration.emergency_contact.email) {
                    if (!this.validateEmail(this.props.registration.emergency_contact.email)) {
                        this.setState({error_message: "INVALID EMAIL: Please provide a properly formatted email."});
                        return false;
                    }
                } else if (!this.props.registration.emergency_contact.phone_home && !this.props.registration.emergency_contact.phone_mobile) {
                    this.setState({error_message: "INVALID PHONE NUMBER: Please provide a phone number."});
                    return false;
                } else if (this.props.registration.emergency_contact.phone_home) {
                    if (!this.validatePhoneNumber(this.props.registration.emergency_contact.phone_home)) {
                        this.setState({error_message: "INVALID HOME PHONE: Please provide a properly formatted home phone number."});
                        return false;
                    }
                } else if (this.props.registration.emergency_contact.phone_mobile) {
                    if (!this.validatePhoneNumber(this.props.registration.emergency_contact.phone_mobile)) {
                        this.setState({error_message: "INVALID MOBILE PHONE: Please provide a properly formatted mobile phone number."});
                        return false;
                    }
                } else if (!this.props.registration.emergency_contact.relationship) {
                    this.setState({error_message: "INVALID RELATIONSHIP: Please provide a relationship."});
                    return false;
                }
                return true;
            case 3:
                if (this.props.registration.user_type === "rider") {
                    return true;
                }
                else if (this.props.registration.user_type === "driver") {
                    let license_plates = new Set();
                    for (let i = 0; i < this.props.registration.vehicles.length; i++) {
                        if (license_plates.has(this.props.registration.vehicles[i].lp)) {
                            this.setState({error_message: "REDUNDANT LICENSE PLATE: Please provide a unique license plate."});
                            license_plates.clear();
                            return false;
                        } else if (!this.props.registration.vehicles[i].make_model) {
                            this.setState({error_message: "INVALID VEHICLE MAKE/MODEL: Please provide a vehicle make/model."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].year) {
                            this.setState({error_message: "INVALID VEHICLE YEAR: Please provide a vehicle year."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].color) {
                            this.setState({error_message: "INVALID VEHICLE YEAR: Please provide a vehicle color."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].lp) {
                            this.setState({error_message: "INVALID LICENSE PLATE: Please provide a license plate."});
                            return false;
                        } else if (this.props.registration.vehicles[i].seats === 0) {
                            this.setState({error_message: "INVALID SEAT NUMBER: Please provide a seat number."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].insur_provider) {
                            this.setState({error_message: "INVALID INSURANCE PROVIDER: Please provide an insurance provider."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].insur_policy) {
                            this.setState({error_message: "INVALID INSURANCE POLICY: Please provide an insurance policy."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].insur_exp) {
                            this.setState({error_message: "INVALID INSURANCE EXPIRATION DATE: Please provide an insurance expiration date."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].insur_coverage) {
                            this.setState({error_message: "INVALID INSURANCE COVERAGE: Please provide insurance coverage."});
                            return false;
                        } else if (!this.props.registration.vehicles[i].insp_date) {
                            this.setState({error_message: "INVALID INSPECTION DATE: Please provide an inspection date."});
                            return false;
                        }
                        license_plates.add(this.props.registration.vehicles[i].lp);
                    }
                    license_plates.clear();
                    return true;
                }
                return false;
            case 4:
                if (this.props.registration.user_type === "rider") {
                    if (!this.props.registration.accommodations.smoke_preference) {
                        this.setState({error_message: "INVALID SMOKE PREFERENCE: Please select a smoke preference."});
                        return false;
                    }
                    return true;
                }
                else if (this.props.registration.user_type === "driver") {
                    for (let i = 0; i < this.props.registration.volunteer_hours.length; i++) {
                        if (this.props.registration.volunteer_hours[i].start) {
                            if (!this.props.registration.volunteer_hours[i].end || moment(this.props.registration.volunteer_hours[i].start, "HH:mm").isAfter(moment(this.props.registration.volunteer_hours[i].end, "HH:mm"))) {
                                this.setState({error_message: "INVALID END TIME: Please provide an end time after start time."});
                                return false;
                            }
                        } else if (this.props.registration.volunteer_hours[i].end) {
                            if (!this.props.registration.volunteer_hours[i].start) {
                                this.setState({error_message: "INVALID START TIME: Please provide a start time."});
                                return false;
                            }
                        }
                    }
                    return true;
                }
                return false;
            case 5:
                if (this.props.registration.user_type === "driver") {
                    if (!this.props.registration.driver_specific.vetting) {
                        this.setState({error_message: "INVALID VETTING: Please provide date last vetted."});
                        return false;
                    }
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    handleSubmit() {
        if (this.validateRegistration() && window.confirm("Are you sure you want to register this account for " + this.props.registration.personal_info.first_name + " " + this.props.registration.personal_info.last_name + "?")) {
            axios.post(API_ROOT + "/database/users/user", {user: this.props.registration}, {
                headers: {
                    "Authorization": "BEARER " + cookies.load('token')
                }
            }).then(response => {
                this.props.addUser(this.props.registration, response.data.id);
                this.props.clearRegistration();
                //This is part of react-router and allows forced page routing
                this.props.history.push('/Profiles');
            });
        }
    }

    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                {this.state.error_message ? <Alert variant="danger">{this.state.error_message}</Alert> : null}
                {this.generatePage()}
                <br/>
                <Row style={{
                    textAlign: "center",
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    height: "60px",
                    width: "100%",
                }}>
                    <Col></Col>
                    <Col>
                        <Button variant="dark" size="lg" id="prev_button"
                                disabled={(this.state.page === 0)}
                                onClick={() => {this.changePage(-1)}}>
                            PREV
                        </Button>
                    </Col>
                    <Col>
                        <Button size="lg" id="reg_submit_button"
                                disabled={(this.props.registration.user_type === "rider" && this.state.page !== RIDER_MAX) || (this.props.registration.user_type === "driver" && this.state.page !== DRIVER_MAX)}
                                onClick={() => {this.handleSubmit()}}>
                            Submit
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="dark" size="lg" id="next_button"
                                disabled={(this.props.registration.user_type === "rider" && this.state.page === RIDER_MAX) || (this.props.registration.user_type === "driver" && this.state.page === DRIVER_MAX)}
                                onClick={() => {this.changePage(1)}}>
                            NEXT
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>
                <br/>
            </Container>
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
