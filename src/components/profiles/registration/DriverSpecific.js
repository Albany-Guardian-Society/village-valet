import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class DriverSpecific extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            default:
                this.props.updateRegistration("driver_specific", event.target.id.replace('driver_',''), event.target.value);
                break;
        }
	}

    render() {
        return (
            <Card>
                <Card.Body>
                <Row className="reg_row">
                    <Form.Label column sm={3} lg={2}>Date Vetted:</Form.Label>
                    <Col><Form.Control type="date" id={"driver_vetting"} placeholder="--Date Vetted--" onChange={this.handleChange} value={this.props.driver_specific.vetting}/></Col>
                </Row>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    driver_specific: state.active_profile.driver_specific
});

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

export default connect(mapStateToProps, mapDispatchToProps)(DriverSpecific);
