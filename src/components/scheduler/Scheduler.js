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
            scheduler_page: 0
        };
		this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

    }

    changePage(increment) {
        let proposed_page = this.state.scheduler_page + increment;
        //Handle minimum
        if (proposed_page < 0) proposed_page = 0;

        //Handle highest page number

        if (proposed_page > 3) proposed_page = 3;

        this.setState({scheduler_page: proposed_page})
    }

    showPage() {
        switch (this.state.scheduler_page) {
            case 0: //Rider
                return (<SelectRider/>);
            case 1: //Info
                return (<RideInformation/>);
            case 2: //Driver
                return (<SelectDriver/>);
            case 3: //Confirm
                return (<Confirmation/>);
            default:
                return(<SelectRider/>);
        }
    }


    render() {
        return (
            <Container>
                {this.showPage()}
                <Row style={{
                    textAlign: "center",
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    height: "60px",
                    width: "100%",}}>
                    <Col></Col>
                    <Col>
                        <Button size="lg" id="prev_button" onClick={() => {this.changePage(-1)}}>
                            PREV
                        </Button>
                    </Col>
                    <Col>
                        <Button size="lg" id="next_button" onClick={() => {this.changePage(1)}}>
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
