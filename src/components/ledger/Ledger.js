import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LedgerTable from "./LedgerTable";

class Ledger extends Component {
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
                    <Col sm={4}><Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/></Col>
                    <Col sm={1}/>
                    <Col sm={5}/>
                    <Col sm={2}>
                        <Button id="cancel_button" variant="danger">
                            Cancel Ride
                        </Button>
                    </Col>
                </Row>
                <hr/>
                <Row>
                <LedgerTable/>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);