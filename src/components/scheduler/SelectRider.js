import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import MapContainer from "../google-maps/MapContainer";

import ProfileTable from "../profiles/ProfileTable";

class SelectRider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };
    

    render() {
        return (
            <Container className="SelectRider" style={{minWidth: "100%"}}>
                <h1>Select Rider</h1>
                <Row>
                    <Col sm={10}><Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/></Col>
                    <Col sm={2}>
                        <Button id="search_button" onClick={this.handleSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <hr/>
                <ProfileTable mode={"rider"}/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRider);
