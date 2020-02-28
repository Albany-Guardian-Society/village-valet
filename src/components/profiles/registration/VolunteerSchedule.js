import React, { Component } from 'react';
import { connect } from "react-redux";

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
	}

    generateHourRows() {
        let hour_rows = [];
        console.log(this.props.volunteer_hours);
        for (let index in this.props.volunteer_hours) {
            hour_rows.push(
                <Row className="reg_row" key={index}>
                    <Col><Form.Control as="select" value={this.props.volunteer_hours[index].day}>
                        <option label="Sunday" value="sunday" />
                        <option label="Monday" value="monday" />
                        <option label="Tuesday" value="tuesday" />
                        <option label="Wednesday" value="wednesday" />
                        <option label="Thursday" value="thursday" />
                        <option label="Friday" value="friday" />
                        <option label="Saturday" value="saturday" />
                    </Form.Control></Col>
                    <Form.Label column sm={2} lg={2}>Starting Time:</Form.Label>
                    <Col><Form.Control as="select" value={this.props.volunteer_hours[index].start}>
                        <option/>
                    </Form.Control></Col>
                    <Form.Label column sm={2} lg={2}>Ending Time:</Form.Label>
                    <Col><Form.Control as="select" value={this.props.volunteer_hours[index].end}>
                        <option/>
                    </Form.Control></Col>
                    <Col><Button variant="danger">Delete</Button></Col>
                </Row>
            );
        }


        return hour_rows;
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 style={{float:"left"}}>Volunteer Hours</h5>
                    <Button variant="dark" style={{float:"right"}} onClick={() => this.props.addAddress()}>
                        Add Address
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
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerSchedule);
