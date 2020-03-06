import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub_page: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
    }

    render() {
        return (
            <div style={{paddingLeft: "3%", paddingRight: "3%"}}>
            <Card>
                <Card.Header>
                    <h5 style={{float:"left"}}>{this.props.user.personal_info.first_name + " " + this.props.user.personal_info.last_name}</h5>
                    <div style={{float:"right"}}>
                        {this.props.user.status === "active" ?
                        <React.Fragment>
                            <Button variant="dark" style={{marginRight: "10px"}}>
                                Edit
                            </Button>
                            <Button variant="danger">
                                Deactivate
                            </Button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button variant="warning" style={{marginRight: "10px"}}>
                                Reactivate
                            </Button>
                            <Button variant="danger">
                                Permanently Delete
                            </Button>
                        </React.Fragment>
                        }
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row>
                    <Col sm={3}>
                        <ListGroup>
                            <ListGroup.Item>General Information</ListGroup.Item>
                            <ListGroup.Item>Emergency Contact</ListGroup.Item>
                            {this.props.user.user_type === "driver" ?
                                <>
                                <ListGroup.Item>Vehicles</ListGroup.Item>
                                <ListGroup.Item>Volunteer Schedule</ListGroup.Item>
                                <ListGroup.Item>Vetting</ListGroup.Item>
                                </>
                            :
                                <>
                                <ListGroup.Item>Addresses</ListGroup.Item>
                                <ListGroup.Item>Special Accomodations</ListGroup.Item>
                                </>
                            }
                        </ListGroup>
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>General Information</ListGroup.Item>
                            <ListGroup.Item>Emergency Information</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    </Row>
                </Card.Body>
            </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.active_profile,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
