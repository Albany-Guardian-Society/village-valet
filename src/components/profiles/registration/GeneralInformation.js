import React, {Component} from 'react';
import {connect} from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "./registration.css"

/**
 * General Information
 * @class GeneralInformation
 */
class GeneralInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Makes user's village id the operator's village id by default
     */
    componentDidMount() {
        if (!this.props.village_id) {
            this.props.updateRegistration("personal_info", "primary_village_id", this.props.operator_village);
        }
    }

    /**
     * Handles when fields are changed
     *
     * @param {Object} event - what is typed into fields
     */
	handleChange(event) {
        switch (event.target.id) {
            case "reg_language":
                //Language is a multiselect and needs to be handled differently
                this.props.updateRegistration("personal_info", event.target.id.replace('reg_', ''), Array.from(event.target.selectedOptions).map((o) => {
                    return o.value
                }));
                break;
            case "reg_primary_village_id":
                this.props.updateRegistration("personal_info", event.target.id.replace('reg_', ''), event.target.value)
                break;
            default:
                this.props.updateRegistration("personal_info", event.target.id.replace('reg_', ''), event.target.value);
                break;
        }
	}

	/**
     * Generates list of villages
     */
    villageOptions() {
        let options = [];
        let villages = Object.keys(this.props.villages);
        options = villages.map((v) => {
            return(
                <option key={this.props.villages[v].id} value={this.props.villages[v].id} label={this.props.villages[v].village_name}/>
            )
        })
        return options;
    }

    /**
     * Displays the general information
     *
     * @returns {HTMLDocument}
     */
    render() {
        return (
            <div>
                {!this.props.partial ? <React.Fragment>
                    <Card>
                        <Card.Body>
                            <Row className="reg_row">
                                <Form.Label column sm={4}  lg={2}>Account Type:</Form.Label>
                                <Col><Form.Control as="select" id="reg_user_type" onChange={this.handleChange} value={this.props.user_type}>
                                    <option value="" label=""/>
                                    <option value="rider" label="Rider"/>
                                    <option value="driver" label="Driver"/>
                                </Form.Control></Col>
                            </Row>
                            <Row className="reg_row">
                                <Form.Label column sm={4} lg={2}>Village Membership:</Form.Label>
                                <Col><Form.Control as="select" id="reg_primary_village_id" onChange={this.handleChange}
                                                   value={this.props.village_id}>
                                    {this.villageOptions()}
                                </Form.Control></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                </React.Fragment>
                :
                null}
                <Card>
                    <Card.Header>
                        <h5 style={{float:"left"}}>General Information</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>First Name:</Form.Label>
                            <Col><Form.Control id="reg_first_name" placeholder="--First Name--" onChange={this.handleChange} value={this.props.personal_info.first_name}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Last Name:</Form.Label>
                            <Col><Form.Control id="reg_last_name" placeholder="--Last Name--" onChange={this.handleChange} value={this.props.personal_info.last_name}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Communication Preference:</Form.Label>
                            <Col><Form.Control as="select" id="reg_preferred_communication" onChange={this.handleChange} value={this.props.personal_info.preferred_communication}>
                                <option value="" label=""/>
                                <option value="email" label="Email"/>
                                <option value="mobile" label="Mobile Phone"/>
                                <option value="home" label="Home Phone"/>
                            </Form.Control></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Email:</Form.Label>
                            <Col><Form.Control id="reg_email" placeholder="--Email Address--" onChange={this.handleChange} value={this.props.personal_info.email}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Mobile Phone:</Form.Label>
                            <Col><Form.Control id="reg_phone_mobile" placeholder="--Mobile Phone--" onChange={this.handleChange} value={this.props.personal_info.phone_mobile}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Home Phone:</Form.Label>
                            <Col><Form.Control id="reg_phone_home" placeholder="--Home Phone--" onChange={this.handleChange} value={this.props.personal_info.phone_home}/></Col>
                        </Row>
                        <Row className="reg_row">
                            <Form.Label column sm={4}  lg={2}>Preferred Language:</Form.Label>
                            <Col><Form.Control multiple={true} as="select" id="reg_language" onChange={this.handleChange} value={this.props.personal_info.language}>
                                {/*https://names.mongabay.com/languages/counties/Albany_County_NY.html*/}
                                <option value="english" label="English"/>
                                <option value="spanish" label="Spanish"/>
                                <option value="french" label="French"/>
                                <option value="italian" label="Italian"/>
                                <option value="chinese" label="Chinese"/>
                                <option value="korean" label="Korean"/>
                                <option value="arabic" label="Arabic"/>
                            </Form.Control></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

/**
 * Pulls information from state's active ride
 */
const mapStateToProps = state => ({
    personal_info: state.active_profile.personal_info,
    user_type: state.active_profile.user_type,
    village_id: state.active_profile.primary_village_id,
    user_villages: state.active_profile.villages,
    villages: state.villages,
    operator_village: state.operator.village_id
});

/**
 * Sets up function to send general information to reducer
 */
const mapDispatchToProps = dispatch => ({
    updateRegistration: (type, id, value) => dispatch({
        type: "registration",
        payload: {
            type: type,
            id: id,
            value: value
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
