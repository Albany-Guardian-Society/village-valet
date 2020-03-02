import React, { Component } from 'react';
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ProfileTable from "./ProfileTable";

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: "",
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
        this.setState({search_term: event.target.value})
	}

    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <Row>
                    <Col sm={4}><Form.Control type="search" id="search" placeholder="Search" onChange={this.handleChange}/></Col>
                    <Col sm={1}>
                        {/*<Button id="search_button" onClick={this.handleSearch}>
                            Search
                        </Button> */}
                    </Col>
                    <Col sm={5}/>
                    <Col sm={2}>
                        <Button id="register_button" onClick={() => {this.props.history.push('/Profiles/Register');}}>
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

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
