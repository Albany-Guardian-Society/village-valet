import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class Village extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {

	}

    addVillage() {
        this.setState({edit: true});
        this.props.addVillage("add");
    }

    render() {
        return (
        <>
            <Card.Header>
                <h5 style={{float:"left"}}>{this.props.show_village ? this.props.villages[this.props.show_village].village_name : "Select a Village"}</h5>
                <Button variant="dark" style={{float: "right"}} onClick={() => this.addVillage()}>
                    Add Village
                </Button>
            </Card.Header>
            <Card.Body>
                {!this.state.edit ?
                    <Table><tbody>
                        <tr>
                            <td>Vetting Criteria: </td>
                            <td>{this.props.show_village ? this.props.villages[this.props.show_village].vetting : null}</td>
                        </tr>
                    </tbody></Table>
                :
                    <Table><tbody>
                        <tr>
                            <td>Village Name: </td>
                            <td>
                                <Form.Control/>
                            </td>
                        </tr>
                        <tr>
                            <td>Vetting Criteria: </td>
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
    addVillage: (mode) => dispatch({
        type: "change_admin",
        payload: {
            type: "village",
            mode: mode
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Village);
