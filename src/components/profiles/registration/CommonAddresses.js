import React, {Component} from 'react';
import {connect} from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration.css"
import {Autocomplete} from "@react-google-maps/api";

class CommonAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);

        this.autocomplete = {};
        this.count = 0;
        this.onLoad = this.onLoad.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    handleChange(event) {
        let id = event.target.id.split("|")[0].replace("addr_", "");
        let field = event.target.id.split("|")[1];
        switch (field) {
            case "autocomplete":
                this.forceUpdate();
                break;
            default:
                this.props.updateRegistration("addresses", id + "|" + field, event.target.value);
                break;
        }
    }

    onLoad(autocomplete, index) {
        this.autocomplete[index] = autocomplete;
    }

    onPlaceChanged(index) {
        let street_number = 0;
        if (this.autocomplete[index] != null) {
            index = index - 1;
            const place = this.autocomplete[index + 1].getPlace();
            this.full_address = place.formatted_address;
            for (const component of place.address_components) {
                if (component.types.includes('street_number')) {
                    street_number = component.long_name
                } else if (component.types.includes('route')) {
                    this.props.addresses[index].line_1 = `${street_number} ${component.short_name}`
                } else if (component.types.includes('locality')) {
                    this.props.addresses[index].city = component.short_name
                } else if (component.types.includes('administrative_area_level_1')) {
                    this.props.addresses[index].state = component.short_name
                } else if (component.types.includes('postal_code')) {
                    this.props.addresses[index].zip = component.short_name
                }
            }
            this.props.triggerUpdate();
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    generateAddressForms() {
        let body = [];
        let index = 0;
        if (this.props.addresses.length === 0) body.push(<br key={"break"}/>);
        for (let a in this.props.addresses) { // eslint-disable-line no-unused-vars
            body.push(
                <Card.Body key={index}>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>Address Name:</Form.Label>
                        <Col><Form.Control id={"addr_" + index + "|name"} placeholder="--Address Name--"
                                           onChange={this.handleChange} value={this.props.addresses[index].name}/></Col>
                        <Col sm={3} lg={2}>
                            <Button id={index} variant="danger" onClick={(e) => this.props.removeAddress(e.target.id)}>
                                Remove Address
                            </Button>
                        </Col>
                    </Row>

                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>Address Search:</Form.Label>
                        <Col>
                            <Autocomplete
                                onLoad={(autocomplete) => {
                                    this.onLoad(autocomplete, index)
                                }}
                                onPlaceChanged={() => this.onPlaceChanged(index)}
                            >
                                <Form.Control id={"addr_" + index + "|autocomplete"} placeholder="--Address--"
                                              onChange={this.handleChange} value={this.full_address}/>
                            </Autocomplete>
                        </Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>Address Line 1:</Form.Label>
                        <Col><Form.Control id={"addr_" + index + "|line_1"}
                                           placeholder="--Primary Address Information--" onChange={this.handleChange}
                                           value={this.props.addresses[index].line_1}/></Col>
                        <Form.Label column sm={2} lg={2}>Address Line 2:</Form.Label>
                        <Col><Form.Control id={"addr_" + index + "|line_2"} placeholder="--Unit/Care Of/Attention--"
                                           onChange={this.handleChange}
                                           value={this.props.addresses[index].line_2}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>City:</Form.Label>
                        <Col><Form.Control id={"addr_" + index + "|city"} placeholder="--City--"
                                           onChange={this.handleChange} value={this.props.addresses[index].city}/></Col>
                        <Form.Label column sm={2} lg={2}>State:</Form.Label>
                        <Col><Form.Control id={"addr_" + index + "|state"} placeholder="--State--"
                                           onChange={this.handleChange}
                                           value={this.props.addresses[index].state}/></Col>
                        <Form.Label column sm={2} lg={2}>Zip:</Form.Label>
                        <Col><Form.Control id={"addr_" + index + "|zip"} placeholder="--ZIP--"
                                           onChange={this.handleChange} value={this.props.addresses[index].zip}/></Col>
                    </Row>
                    <Row className="reg_row">
                        <Form.Label column sm={2} lg={2}>Special Instructions:</Form.Label>
                        <Col><Form.Control as="textarea" rows={5} id={"addr_" + index + "|special_instructions"}
                                           placeholder="Please include any additional information that a driver would need to know when picking up or dropping off from this location."
                                           onChange={this.handleChange}
                                           value={this.props.addresses[index].special_instructions}/></Col>
                    </Row>
                </Card.Body>
            );
            //Divide all the addresses (do not place a break after the last value)
            if (index !== this.props.addresses.length-1) body.push(<hr key={index + "_break"}/>);

            index++;
        }
        return(body);
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 style={{float: "left"}}>Common Addresses</h5>
                    <Button variant="dark" style={{float: "right"}} onClick={() => this.props.addAddress()}>
                        Add Address
                    </Button>
                </Card.Header>
                {this.generateAddressForms()}
                <h6>{" "}</h6>
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
    removeAddress: (id) => dispatch({
        type: "registration",
        payload: {
            type: null,
            id: "remove_address",
            value: id
        }
    }),
    triggerUpdate: () => dispatch({
        type: "trigger_update",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonAddresses);
