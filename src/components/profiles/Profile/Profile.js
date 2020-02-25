import React, { Component } from 'react';
import { connect } from "react-redux";
import usrpic from './user-profile-male-logo.jpg';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileTable from "./Profile_Table.js";
import {Image} from "react-bootstrap";


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
                    <Col>
                        <Image publicId={usrpic} height="150" width="150" />
                    </Col>
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
