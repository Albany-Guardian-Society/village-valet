import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card";
import RidesTable from "../dashboard/RidesTable";



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
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Who?</Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>What?</Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>When?</Card.Header>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);