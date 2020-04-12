import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class VolunteerSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let id = event.target.id.split("|")[0].replace("vol_", "");
        let field = event.target.id.split("|")[1];
        switch (field) {
            default:
                this.props.updateRegistration("volunteer_hours", id+"|"+field, event.target.value);
                break;
        }
	}

    generateHourRows() {
        let hour_rows = [];
        let last_index = String(this.props.volunteer_hours.length-1);
        for (let index in this.props.volunteer_hours) {
            hour_rows.push(
                <Row className="reg_row" key={index}>
                    <Col><Form.Control as="select" id={"vol_" + index + "|day"} onChange={this.handleChange}
                                       value={this.props.volunteer_hours[index].day}>
                        <option label="Sunday" value="sunday"/>
                        <option label="Monday" value="monday"/>
                        <option label="Tuesday" value="tuesday"/>
                        <option label="Wednesday" value="wednesday"/>
                        <option label="Thursday" value="thursday"/>
                        <option label="Friday" value="friday"/>
                        <option label="Saturday" value="saturday"/>
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

const mapStateToProps = state => ({
    volunteer_hours: state.active_profile.volunteer_hours,
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
