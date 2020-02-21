import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


import Container from "react-bootstrap/Container";
import SearchBar from "./SearchBar";
import ProfilesTable from "./ProfilesTable";

class Profiles extends Component {
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
            <Container style={{minWidth: "100%"}}>
                <Link to="/Profiles/Register" style={{ textDecoration: 'none' }}>Register</Link>
                <SearchBar></SearchBar>
                <ProfilesTable></ProfilesTable>
            </Container>
        );
    }
}


//let tabledate = this.props.users

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
