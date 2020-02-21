import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SelectRider from "./SelectRider";
import RideInformation from "./RideInformation";
import SelectDriver from "./SelectDriver";
import Confirmation from "./Confirmation";

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduler_options: "info"
        };
		this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({scheduler_options: value});
    }

    changePage() {
        switch (this.state.scheduler_options) {
            case "rider":
                return (<SelectRider/>);
            case "info":
                return (<RideInformation/>);
            case "driver":
                return (<SelectDriver/>);
            case "confirm":
                return (<Confirmation/>);
            default:
                return(<SelectRider/>);
        }
    }

    render() {
        return (
            <Container>
                {this.changePage()}
                <Row>
                    <Col></Col>
                    <Col>
                        <Button id="prev_button" onClick={this}>
                            PREV
                        </Button>
                    </Col>
                    <Col>
                        <Button id="next_button" onClick={this}>
                            NEXT
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
