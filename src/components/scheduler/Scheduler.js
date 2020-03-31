import React, { Component } from 'react';
import { connect } from "react-redux";

import {LoadScript} from "@react-google-maps/api";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SelectRider from "./SelectRider";
import RideInformation from "./RideInformation";
import SelectDriver from "./SelectDriver";
import Confirmation from "./Confirmation";

const PAGE_MAX = 3;

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduler_page: 0
        };
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (window.confirm("Are you sure you want to schedule this ride for " + this.props.active_ride.rider.first_name + " " + this.props.active_ride.rider.last_name + " on " + this.props.active_ride.ride_data.date)) {
            console.log("Add Ride");
            this.props.history.push("/Dashboard");
        }
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
                return (
                    <LoadScript
                        id="script-loader"
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}
                        libraries={["places"]}
                    >
                        <RideInformation/>
                    </LoadScript>
                );
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
            <Container style={{minWidth: "100%"}}>
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
                        {this.state.scheduler_page !== 0  ?
                        <Button variant="dark" disabled={this.state.scheduler_page === 0} size="lg" id="prev_button" onClick={() => {this.changePage(-1)}}>
                            PREV
                        </Button>
                        : null }
                    </Col>
                    <Col>
                        {this.state.scheduler_page === PAGE_MAX ?
                        <Button disabled={this.state.scheduler_page !== PAGE_MAX} size="lg" id="sched_submit_button" onClick={() => {this.handleSubmit()}}>
                            Submit Ride
                        </Button>
                        : null}
                    </Col>
                    <Col>
                        {this.state.scheduler_page !== PAGE_MAX ?
                        <Button variant="dark" disabled={this.state.scheduler_page === PAGE_MAX} size="lg" id="next_button" onClick={() => {this.changePage(1)}}>
                            NEXT
                        </Button>
                        : null}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    active_ride: state.active_ride,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
