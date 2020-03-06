import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub_page: "general_info"
        };
        this.changePage = this.changePage.bind(this);
        this.genSubPage = this.genSubPage.bind(this);
    }

    changePage(page) {
        this.setState({sub_page: page});
    }

    genSubPage() {
        switch (this.state.sub_page) {
            case "general_info":
                return (
                <tbody>
                    <tr>
                        <th>First Name</th><td>{this.props.user.personal_info.first_name}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th><td>{this.props.user.personal_info.last_name}</td>
                    </tr>
                    <tr>
                        <th>Email</th><td>{this.props.user.personal_info.email}</td>
                    </tr>
                    <tr>
                        <th>Home Phone</th><td>{this.props.user.personal_info.phone_home}</td>
                    </tr>
                    <tr>
                        <th>Mobile Phone</th><td>{this.props.user.personal_info.phone_mobile}</td>
                    </tr>
                    <tr>
                        <th>Preferred Communcation</th><td>{this.props.user.personal_info.preferred_communication.replace(/^\w/, c => c.toUpperCase())}</td>
                    </tr>
                    <tr>
                        <th>Language</th><td>{this.props.user.personal_info.language.map((l) => {return l.replace(/^\w/, c => c.toUpperCase()) + ", "})}</td>
                    </tr>
                    <tr>
                        <th>Status</th><td>{this.props.user.status.replace(/^\w/, c => c.toUpperCase())}</td>
                    </tr>
                </tbody>
                );
            case "emergency":
                return (
                    <tbody>
                        <tr>
                            <th>First Name</th><td>{this.props.user.emergency_contact.first_name}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th><td>{this.props.user.emergency_contact.last_name}</td>
                        </tr>
                        <tr>
                            <th>Email</th><td>{this.props.user.emergency_contact.email}</td>
                        </tr>
                        <tr>
                            <th>Home Phone</th><td>{this.props.user.emergency_contact.phone_home}</td>
                        </tr>
                        <tr>
                            <th>Mobile Phone</th><td>{this.props.user.emergency_contact.phone_mobile}</td>
                        </tr>
                        <tr>
                            <th>Preferred Communcation</th><td>{this.props.user.emergency_contact.preferred_communication.replace(/^\w/, c => c.toUpperCase())}</td>
                        </tr>
                    </tbody>
                );
            case "vehicles":
                return (
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{this.props.user.personal_info.first_name}</td>
                    </tr>
                </tbody>
                );
            case "schedule":
                return (
                    <tr>
                        <td>First Name</td>
                        <td>{this.props.user.personal_info.first_name}</td>
                    </tr>
                );
            case "vetting":
                return (
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{this.props.user.personal_info.first_name}</td>
                    </tr>
                </tbody>
                );
            case "addresses":
                return (
                    <tbody>
                        {this.props.user.addresses.map((loc) => {
                            return (
                                <React.Fragment key={loc.name+loc.line_1}>
                                <tr>
                                    <td colSpan="2">{loc.name}</td>
                                </tr>
                                <tr>
                                    <th>Line 1</th>
                                    <td>{loc.line_1}</td>
                                </tr>
                                <br/>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                );
            case "special":
                return (
                    <tbody>
                        <tr>
                            <th>Allergies</th><td>{this.props.user.accommodations.allergies}</td>
                        </tr>
                        <tr>
                            <th>Mobility Aid</th><td>{this.props.user.accommodations.mobility_aid}</td>
                        </tr>
                        <tr>
                            <th>Smoke Free</th><td>{this.props.user.accommodations.smoke_preference.replace(/^\w/, c => c.toUpperCase())}</td>
                        </tr>
                        <tr>
                            <th>Additional Accomodations</th><td>{this.props.user.accommodations.special}</td>
                        </tr>
                    </tbody>
                );
            default:
                break;
        }
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
                            <ListGroup.Item active={this.state.sub_page === "general_info"} onClick={() => this.changePage("general_info")}>General Information</ListGroup.Item>
                            <ListGroup.Item active={this.state.sub_page === "emergency"} onClick={() => this.changePage("emergency")}>Emergency Contact</ListGroup.Item>
                            {this.props.user.user_type === "driver" ?
                                <>
                                <ListGroup.Item active={this.state.sub_page === "vehicles"} onClick={() => this.changePage("vehicles")}>Vehicles</ListGroup.Item>
                                <ListGroup.Item active={this.state.sub_page === "schedule"} onClick={() => this.changePage("schedule")}>Volunteer Schedule</ListGroup.Item>
                                <ListGroup.Item active={this.state.sub_page === "vetting"} onClick={() => this.changePage("vetting")}>Vetting</ListGroup.Item>
                                </>
                            :
                                <>
                                <ListGroup.Item active={this.state.sub_page === "addresses"} onClick={() => this.changePage("addresses")}>Addresses</ListGroup.Item>
                                <ListGroup.Item active={this.state.sub_page === "special"} onClick={() => this.changePage("special")}>Special Accomodations</ListGroup.Item>
                                </>
                            }
                        </ListGroup>
                    </Col>
                    <Col>
                        <Table striped bordered>
                            {this.genSubPage()}
                        </Table>
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
