import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Driver Volunteer Schedule
 * @class VolunteerSchedule
 */
class VolunteerSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handles when address is entered
     *
     * @param {Object} event - address entered
     */
    handleChange(event) {
        let id = event.target.id.split("|")[0].replace("vol_", "");
        let field = event.target.id.split("|")[1];
        switch (field) {
            default:
                this.props.updateRegistration("volunteer_hours", id+"|"+field, event.target.value);
                break;
        }
	}

    /**
     * Creates the forms on the page
     *
     * @returns {HTMLFormElement[]} - HTML forms to be displayed
     */
    generateHourRows() {
        let hour_rows = [];
        let last_index = String(this.props.volunteer_hours.length-1);
        for (let index in this.props.volunteer_hours) {
            hour_rows.push(
                <Row className="reg_row" key={index}>
                    <Col><Form.Control as="select" id={"vol_" + index + "|day"} onChange={this.handleChange}
                                       value={this.props.volunteer_hours[index].day}>
                        <option label="Sunday" value={0}/>
                        <option label="Monday" value={1}/>
                        <option label="Tuesday" value={2}/>
                        <option label="Wednesday" value={3}/>
                        <option label="Thursday" value={4}/>
                        <option label="Friday" value={5}/>
                        <option label="Saturday" value={6}/>
                    </Form.Control></Col>
                    <Form.Label column sm={2} lg={2}>Starting Time:</Form.Label>
                    <Col><Form.Control type="time" id={"vol_" + index + "|start"} onChange={this.handleChange}
                                       value={this.props.volunteer_hours[index].start}/></Col>
                    <Form.Label column sm={2} lg={2}>Ending Time:</Form.Label>
                    <Col><Form.Control type="time" id={"vol_" + index + "|end"} onChange={this.handleChange}
                                       value={this.props.volunteer_hours[index].end}/></Col>
                    <Col><Button variant="danger"
                                 onClick={(e) => this.props.removeVolHours(e.target.id)}>Delete</Button></Col>
                </Row>
            );
            if (index !== last_index) hour_rows.push(<hr key={"break_"+index}/>);
        }
        return hour_rows;
    }

    /**
     * Displays the volunteer hours and all its forms
     *
     * @returns {HTMLDocument}
     */
    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 style={{float: "left"}}>Volunteer Hours</h5>
                    <Button variant="dark" style={{float: "right"}} onClick={() => this.props.addVolHours()}>
                        Add Volunteer Day
                    </Button>
                </Card.Header>
                <Card.Body>
                    {this.generateHourRows()}
                </Card.Body>
                <h6>{" "}</h6>
            </Card>
        );
    }
}

/**
 * Pulls volunteer hours information from state's active ride
 */
const mapStateToProps = state => ({
    volunteer_hours: state.active_profile.volunteer_hours,
});

/**
 * Sets up functions to send registration and volunteer hour information to reducer
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
    addVolHours: () => dispatch({
        type: "registration",
        payload: {
            type: null,
            id: "add_vol_hours",
            value: null
        }
    }),
    removeVolHours: (id) => dispatch({
        type: "registration",
        payload: {
            type: null,
            id: "remove_vol_hours",
            value: id
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerSchedule);
