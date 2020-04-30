import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProfileTable from "../profiles/ProfileTable";

// Above are all the imports for this file.
// Every file will need React, Component, connect

// The second section of imports are React Bootstrap components.  These allow for easy styling
// and layout without much need for custom CSS or HTML.

/**
 * @class SelectRider
 * @typedef {Object} SelectRider
 *
 */
class SelectRider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    /**
     * Sets rider to selection in scheduler
     *
     * @example
     *     onChange={this.handleChange}
     */
    handleChange(event){
        this.setState({search_term: event.target.value})
    };

    /**
     * Displays the confirmation page.
     *
     * @returns {HTMLDocument}
     *
     */
    render() {
        return (
            <Container className="SelectRider" style={{minWidth: "100%"}}>
                <h1>Select Rider</h1>
                <Row>
                    <Col sm={12}><Form.Control type="search" id="search" placeholder="Search"
                                               onChange={this.handleChange}/></Col>
                </Row>
                <hr/>
                <ProfileTable search_term={this.state.search_term} mode={"rider"}/>
            </Container>
        );
    }
}

/**
 * Pulls users from state
 *
 */
const mapStateToProps = state => ({
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRider);
