import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration.css"

class CommonAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let id = event.target.id.split("|")[0].replace("addr_", "");
        let field = event.target.id.split("|")[1];
        switch (field) {
            default:
                console.log(event.target.id)
                this.props.updateRegistration("addresses", id+"|"+field, event.target.value);
                break;
        }
	}

    generateAddressForms() {
        let body = [];
        let index = 0;
        for (let a in this.props.addresses) {
            let address = this.props.addresses[a];
            body.push(
                <Card.Body key={index}>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>Address Name:</Form.Label>
                        <Col><Form.Control id={"addr_"+index+"|name"} placeholder="--Address Name--" onChange={this.handleChange} value={this.props.addresses[index].name}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>Address Line 1:</Form.Label>
                        <Col><Form.Control id={"addr_"+index+"|line_1"} placeholder="--Primary Address Information--" onChange={this.handleChange} value={this.props.addresses[index].line_1}/></Col>
                        <Form.Label column sm={2} lg={2}>Address Line 2:</Form.Label>
                        <Col><Form.Control id={"addr_"+index+"|line_2"} placeholder="--Unit/Care Of/Attention--" onChange={this.handleChange} value={this.props.addresses[index].line_2}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>City:</Form.Label>
                        <Col><Form.Control id={"addr_"+index+"|city"} placeholder="--City--" onChange={this.handleChange} value={this.props.addresses[index].city}/></Col>
                        <Form.Label column sm={2} lg={2}>State:</Form.Label>
                        <Col><Form.Control id={"addr_"+index+"|state"} placeholder="--State--" onChange={this.handleChange} value={this.props.addresses[index].state}/></Col>
                        <Form.Label column sm={2} lg={2}>Zip:</Form.Label>
                        <Col><Form.Control id={"addr_"+index+"|zip"} placeholder="--ZIP--" onChange={this.handleChange} value={this.props.addresses[index].zip}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2} >Special Instructions:</Form.Label>
                        <Col><Form.Control as="textarea" rows={5} id={"addr_"+index+"|special_instructions"}
                            placeholder="Please include any additional information that a driver would need to know when picking up or dropping off from this location."
                            onChange={this.handleChange} value={""}
                            value={this.props.addresses[index].special_instructions}/></Col>
                    </Row>
                </Card.Body>
            )
            if (index !== this.props.addresses.length-1) body.push(<hr key={index + "_break"}/>);

            index++;
        }
        return(body);
    }

    render() {
        return (
            <Card>
                <Card.Header>Common Addresses</Card.Header>
                {this.generateAddressForms()}
                <Row>
                    <Col/>
                    <Col/>
                    <Col/>
                    <Col/>
                    <Col>
                        <Button variant="dark" onClick={() => this.props.addAddress()}>
                            Add Address
                        </Button>
                    </Col>
                </Row>
                <h6/>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    addresses: state.active_profile.addresses,
    user_type: state.active_profile.user_type
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
    addAddress: () => dispatch({
        type: "registration",
        payload: {
            type: null,
            id: "add_address",
            value: null
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonAddresses);
