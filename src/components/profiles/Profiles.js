import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ProfileTable from "./ProfileTable";

/**
 * Profiles
 * @typedef {Object} Profiles
 * @property {string} search_term - word used for profile table fuzzysort
 */
class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: "",
        };
		this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Handles when search_term is changed
     *
     * @param {Object} event - what search_term is set to
     */
	handleChange(event) {
        this.setState({search_term: event.target.value})
	}

    /**
     * Displays the profiles based on the search term
     *
     * @returns {HTMLDocument}
     */
    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <Row>
                    <Col sm={4}><Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/></Col>
                    <Col sm={1}>
                    </Col>
                    <Col sm={5}/>
                    <Col sm={2}>
                        <Button id="register_button" onClick={() => {this.props.clearRegistration(); this.props.history.push('/Profiles/Register');}}>
                            Register
                        </Button>
                    </Col>
                </Row>
                <hr/>
                <Row><Col>
                    <ProfileTable search_term={this.state.search_term} mode="all"/>
                </Col></Row>
            </Container>
        );
    }
}



const mapStateToProps = state => ({
});

/**
 * Sets up function to clear current registration information in reducer
 */
const mapDispatchToProps = dispatch => ({
    clearRegistration: () => dispatch({
        type: "clear_active_profile",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
