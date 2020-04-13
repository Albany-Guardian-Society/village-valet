import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import CardDeck from "react-bootstrap/CardDeck";
import ProfileTable from "../profiles/ProfileTable";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";



class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
    };

    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <CardDeck>
                    <Card>
                        <Card.Header as="th">Choose the Type of Report</Card.Header>
                        <Card.Body className="text-left">

                            <Form.Group as={Row}>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Mileage"
                                        name="formReportType"
                                        id="formReportTypeMileage"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Completed Rides"
                                        name="formReportType"
                                        id="formReportTypeCR"
                                    />
                                </Col>
                            </Form.Group>

                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="th">Enter Time Frame (Leave Blank for Entire History)</Card.Header>
                        <Card.Body className="text-left">
                            Start Date (Inclusive):
                            <Col><Form.Control type="date" id="start_date"/></Col>

                            End Date (Inclusive):
                            <Col><Form.Control type="date" id="end_date"/></Col>

                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="th">Select a Person</Card.Header>
                        <Card.Body className="text-left">
                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Select All"
                                        name="formReportPeople"
                                        id="formReportPeopleSA"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={<ProfileTable/>}
                                        name="formReportPeople"
                                        id="formReportPeopleIndividual"
                                    />
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                </CardDeck>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);