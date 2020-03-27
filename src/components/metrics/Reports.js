import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import CardDeck from "react-bootstrap/CardDeck";
import ProfileTable from "../profiles/ProfileTable";



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
                        <Card.Header as="th">Select a Driver</Card.Header>
                        <Card.Body className="text-left">
                            <ProfileTable mode={ "driver"}/>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header as="th">Choose the Type of Report</Card.Header>
                        <Card.Body className="text-left">
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            type={type}
                                            id={`mileage`}
                                            label={`Mileage`}
                                        />
                                    </div>
                                ))}
                            </Form>
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