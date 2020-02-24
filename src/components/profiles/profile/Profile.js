import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileTable from "./ProfileContainer.js";

class Profile extends Component {
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
                <Row>
                    Picture/Name
                </Row>
                <Row>
                    <Col>
                        <ProfileTable/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
