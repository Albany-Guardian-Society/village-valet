import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import MapContainer from "../google-maps/MapContainer";
import React, {Component} from "react";
import {connect} from "react-redux";


class RideInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };

    render() {
        return (
            <Container className="RideInformation" style={{minWidth: "100%"}}>
                <h1>Ride Information</h1>
                <Row>
                    <Col>
                        <Row>
                            Picture
                        </Row>
                        <Row>
                            Name
                        </Row>
                        <Row>
                            Round Trip Options
                        </Row>
                        <Row>
                            Date
                        </Row>
                    </Col>
                    <Col xs={10}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Pickup</th>
                                <th>Dropoff</th>
                                <th>Return</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Location</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Special Instructions</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(RideInformation);