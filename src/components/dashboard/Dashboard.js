import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import ActiveRides from "./ActiveRides.js";
import UpcomingRides from "./UpcomingRides.js";
import RideBreakdown from "./RideBreakdown.js";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}

    render() {
        // Three columns: upcoming rides, active rides, ride summary
        return (
            <Container style={{minWidth: "100%"}}>
                <Row>
                    <Col>
                        <UpcomingRides/>
                    </Col>
                    <Col>
                        <ActiveRides/>
                    </Col>
                    <Col>
                        <RideBreakdown/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
