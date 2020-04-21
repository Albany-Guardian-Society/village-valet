import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";

class Village extends Component {
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
        <>
            <Card.Header>
                <h5 style={{float:"left"}}>{this.props.show_village ? this.props.villages[this.props.show_village].village_name : "Select a Village"}</h5>
            </Card.Header>
        </>
        );
    }
}

const mapStateToProps = state => ({
    villages: state.villages,
    operators: state.operators,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Village);
