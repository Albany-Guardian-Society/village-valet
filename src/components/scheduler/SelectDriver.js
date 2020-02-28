import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import MapContainer from "../google-maps/MapContainer";

class SelectDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };

    render() {
        return (
            <Container className="SelectDriver" style={{minWidth: "100%"}}>
                <h1>Select Driver</h1>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label>Driver</Form.Label>
                        <Form.Check></Form.Check>
                        <Col>
                            <Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/>
                        </Col>
                        <Button id="search_button" onClick={this.handleSearch}>
                            Search
                        </Button>
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Picture</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Village</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>:)</td>
                        <td>Garrett</td>
                        <td>Dribusch</td>
                        <td>RPI</td>
                        <td>1-5PM</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Jeremy</td>
                        <td>Ettlinger</td>
                        <td>RPI</td>
                        <td>2-6PM</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Mohammad</td>
                        <td>Hamaf</td>
                        <td>RPI</td>
                        <td>7-11AM</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Matthew</td>
                        <td>Menendez</td>
                        <td>RPI</td>
                        <td>8PM-2AM</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Jonathon</td>
                        <td>Schmalz</td>
                        <td>RPI</td>
                        <td>12-6PM</td>
                    </tr>
                    <tr>
                        <td>:)</td>
                        <td>Nick</td>
                        <td>Zoner</td>
                        <td>RPI</td>
                        <td>6PM-12AM</td>
                    </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <Row>
                            Driver
                        </Row>
                        <Row>
                            Return Driver
                        </Row>
                    </Col>
                    <Col>
                        <MapContainer>Trip Summary</MapContainer>
                    </Col>
                    <Col>
                        <Row>
                            Trip Duration
                        </Row>
                        <Row>
                            Expected Traffic
                        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectDriver);
