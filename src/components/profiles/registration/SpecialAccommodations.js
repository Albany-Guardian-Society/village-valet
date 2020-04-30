import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

/**
 * Special Accommodations
 * @typedef {Object} SpecialAccommodations
 */
class SpecialAccommodations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handles when fields are changed
     *
     * @param {Object} event - what is typed into fields
     */
    handleChange(event) {
        switch (event.target.id) {
            default:
                this.props.updateRegistration("accommodations", event.target.id.replace('reg_',''), event.target.value);
                break;
        }
	}

    /**
     * Displays the special accommodation information
     *
     * @returns {HTMLDocument}
     */
    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 style={{float:"left"}}>Special Accommodations</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Allergy Information:</Form.Label>
                        <Col><Form.Control id="reg_allergies" placeholder="Ex. Cats/Dogs, Dust, Leather" onChange={this.handleChange} value={this.props.accommodations.allergies}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Mobility Aid:</Form.Label>
                        <Col><Form.Control id="reg_mobility_aid" placeholder="Ex. Walker, Cane, Wheelchair" onChange={this.handleChange} value={this.props.accommodations.mobility_aid}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={4}  lg={2}>Smoke-Free:</Form.Label>
                        <Col><Form.Control as="select" id="reg_smoke_preference" onChange={this.handleChange} value={this.props.accommodations.smoke_preference}>
                            <option value="" label=""/>
                            <option value="yes" label="Yes"/>
                            <option value="no" label="No"/>
                        </Form.Control></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2} >Special Instructions:</Form.Label>
                        <Col><Form.Control as="textarea" rows={5} id={"reg_special"}
                            placeholder="Please provide any additional infomation that would be pertinent to a volunteer that would be driving you."
                            onChange={this.handleChange}
                            value={this.props.accommodations.special}/></Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

/**
 * Pulls accommodation information from state's active ride
 */
const mapStateToProps = state => ({
    accommodations: state.active_profile.accommodations,
});

/**
 * Sets up function to send special accommodation information to reducer
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialAccommodations);
