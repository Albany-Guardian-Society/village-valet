import React, {Component} from "react";
import {connect} from "react-redux";

import Container from "react-bootstrap/Container";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

    };

    render() {
        return (
            <Container className="Confirmation" style={{minWidth: "100%"}}>
                <h1>Confirmation</h1>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
