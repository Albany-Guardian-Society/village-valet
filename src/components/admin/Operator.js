import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

class Operator extends Component {
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
                <h5 style={{float:"left"}}>{(this.props.show_village && this.props.show_operator) ? this.props.operators[this.props.show_village][this.props.show_operator].first_name +" "+ this.props.operators[this.props.show_village][this.props.show_operator].last_name : "Select an Operator"}</h5>
            </Card.Header>
            <Card.Body>
                <Table><tbody>
                    <tr>
                        <td>Username: </td>
                        <td>{(this.props.show_village && this.props.show_operator) ? this.props.operators[this.props.show_village][this.props.show_operator].username : ""}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{(this.props.show_village && this.props.show_operator) ? this.props.operators[this.props.show_village][this.props.show_operator].email : ""}</td>
                    </tr>
                    <tr>
                        <td>Village: </td>
                        <td>{(this.props.show_village && this.props.show_operator) ? this.props.villages[this.props.show_village].village_name : ""}</td>
                    </tr>
                </tbody></Table>
            </Card.Body>
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

export default connect(mapStateToProps, mapDispatchToProps)(Operator);
