import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LedgerTable from "./LedgerTable";

class Ledger extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
    };

    /**
     * Displays the Container for Ledger Table
     * @returns {*}
     */
    render() {
        return (
            <Container style={{minWidth: "100%"}}>
                <Row>
                <LedgerTable/>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);