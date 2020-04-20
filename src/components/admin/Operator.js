import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Operator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {

	}

    addOperator() {
        this.setState({edit: true});
        this.props.addOperator("add");
    }

    render() {
        return (
        <>
            <Card.Header>
                <h5 style={{float:"left"}}>{(this.props.show_village && this.props.show_operator) ? this.props.operators[this.props.show_village][this.props.show_operator].first_name +" "+ this.props.operators[this.props.show_village][this.props.show_operator].last_name : "Select an Operator"}</h5>
                <Button variant="dark" style={{float: "right"}} onClick={() => this.addOperator()}>
                    Add Operator
                </Button>
            </Card.Header>
            <Card.Body>
                {!this.state.edit ?
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
                :
                    <Table><tbody>
                        <tr>
                            <td>First Name: </td>
                            <td>
                                <Form.Control/>
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name: </td>
                            <td>
                                <Form.Control/>
                            </td>
                        </tr>
                        <tr>
                            <td>Username: </td>
                            <td>
                                <Form.Control/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td>
                                <Form.Control/>
                            </td>
                        </tr>
                        <tr>
                            <td>Village: </td>
                            <td>
                                <Form.Control/>
                            </td>
                        </tr>
                    </tbody></Table>
                }
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
    addOperator: (mode) => dispatch({
        type: "change_admin",
        payload: {
            type: "operator",
            mode: mode
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Operator);
