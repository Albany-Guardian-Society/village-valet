import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import cookies from "react-cookies"

import "../App.css";

/** @class Navigation holds buttons to navigate through the website*/

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    logout() {
        cookies.remove('token');
        cookies.remove('googlemapstoken');
        cookies.remove('is_admin');
        cookies.remove('operator_id');
        window.location.reload()
    }

    render() {
        return (
            <div>
                <Navbar bg="light" variant="light" style={{width: "100%"}}>
                    <Navbar.Brand>
                        <Link to="/Dashboard" style={{textDecoration: 'none'}}>Village Valet</Link>
                    </Navbar.Brand>
                    <Col>
                        <Link to="/Scheduler" style={{textDecoration: 'none'}}>Scheduler</Link>
                    </Col>
                    <Col>
                        <Link to="/Profiles" style={{textDecoration: 'none'}}>Profiles</Link>
                    </Col>
                    <Col>
                        <Link to="/Ledger" style={{textDecoration: 'none'}}>Ledger</Link>
                    </Col>
                    <Col>
                        <Link to="/Metrics" style={{textDecoration: 'none'}}>Metrics</Link>
                    </Col>
                    <Col>
                        {this.props.operator.admin ?
                            <Link to="/Admin" style={{textDecoration: 'none'}}>Admin</Link>
                            : null}
                    </Col>
                    <Col style={{textAlign: "right"}}>
                        <span>Operator:&nbsp;{this.props.operator.first_name}</span>
                    </Col>
                    <Col>
                        <Button variant="dark" onClick={this.logout}> Logout </Button>
                </Col>
            </Navbar>
            <br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    operator: state.operator,
    village_id: state.operator.village_id
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
