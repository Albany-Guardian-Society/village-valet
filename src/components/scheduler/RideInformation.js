import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
//import './pic_placeholder.png';

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
                            {/*<img src="pic_placeholder.png" alt="pic_placeholder"/>*/}
                        </Row>
                        <Row>
                            <Form.Control readOnly type="text" placeholder="Frist Name" id='first_n' />
                            <Form.Control readOnly type="text" placeholder="Last Name" id='last_n' />
                        </Row>
                        <Row>
                            <Form.Control type="date" placeholder="" id='ride_date' />
                        </Row>
                        <Row>
                            <Form.Control type="text" placeholder="Return" id='return_op' />
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
                                <td>Address</td>
                                <td><Form.Control type="text" placeholder="Pickup Location" id='pickup' /></td>
                                <td><Form.Control type="text" placeholder="Dropoff Location" id='dropoff' /></td>
                                <td><Form.Control type="text" placeholder="Return" id='return' /></td>
                            </tr>
                            {/*<tr>*/}
                            {/*    <td>Name</td>*/}
                            {/*    <td><Form.Control type="text" placeholder="Frist Name" id='first_n' /></td>*/}
                            {/*    <td><Form.Control type="text" placeholder="Last Name" id='last_n' /></td>*/}
                            {/*    <td></td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>Address</td>*/}
                            {/*    <td></td>*/}
                            {/*    <td></td>*/}
                            {/*    <td></td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td>Special Instructions</td>
                                <td><Form.Control type="text" placeholder="Pickup Instructions" id='pickup_si' /></td>
                                <td><Form.Control type="text" placeholder="Dropoff Instructions" id='dropoff_si'/></td>
                                <td><Form.Control type="text" placeholder="Return Instructions" id='return_si'/></td>
                            </tr>
                            <tr>
                                <td>Time</td>
                                <td><Form.Control type="time" placeholder="pickup time" id='pickup_time' /></td>
                                <td></td>
                                <td><Form.Control type="time" placeholder="return time" id='return_time' /></td>
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
