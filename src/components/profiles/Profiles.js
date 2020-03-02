import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


import Container from "react-bootstrap/Container";
import SearchBar from "./SearchBar";
import ProfileTable from "./ProfileTable";

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
                <SearchBar/>
                <ProfileTable mode={"all"}/>
            </Container>
        );
    }
}



const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
