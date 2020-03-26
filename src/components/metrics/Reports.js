import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import CardDeck from "react-bootstrap/CardDeck";



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
                        <Card.Header as="th">Who?</Card.Header>
                        <Card.Body>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="th">What?</Card.Header>
                        <Card.Body className="text-left">
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            type={type}
                                            id={`mileage`}
                                            label={`Mileage`}
                                        />

                                        <Form.Check
                                            type={type}
                                            label={`Volunteer Hours`}
                                            id={`volunteer hours`}
                                        />

                                        <Form.Check
                                            type={type}
                                            label={`Number of Trips`}
                                            id={`number of trips`}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="th">When?</Card.Header>
                        <Card.Body>
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