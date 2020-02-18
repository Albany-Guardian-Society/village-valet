import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}

    render() {
        return (
            <div>
                Yo, This is a Error page.
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
