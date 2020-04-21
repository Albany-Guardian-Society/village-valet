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
            mode: "",
            password: "",
        };
		this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        //Make sure that if they change the selected the mode is changed
        if (this.props.show_operator !== prevProps.show_operator) {
            this.setState({edit: false});
        }
    }

	handleChange(event) {
        let field = event.target.id.split("|")[1];
        if (field === "password") {
            //This should probably be validated!
            this.setState({password: event.target.value});
            //Encrypt and pass the password
            this.props.changeOperator("edit", "password", event.target.value);
        } else {
            this.props.changeOperator("edit", field, event.target.value);
        }
	}

    villageOptions() {
        let options = [];
        let villages = Object.keys(this.props.villages);
        options = villages.map((v) => {
            return(
                <option key={this.props.villages[v].id} value={this.props.villages[v].id} label={this.props.villages[v].village_name}/>
            )
        })
        return [<option key={""} value={""} label={""}/>, ...options];
    }

    saveOperator() {
        //VALIDATE HERE!
        if (this.state.mode === "new") {
            this.props.changeOperator("add")
        } else {
            this.props.changeOperator("save")
        }
        this.setState({edit: false, password: "", mode: ""});
    }

    deleteOperator() {
        if (window.confirm("Are you sure you want to delete this operator?\nTHIS CANNOT BE UNDONE!")) {
            this.props.changeOperator("delete");
            this.setState({edit: false, password: "", mode: ""});
        }
    }

    render() {
        return (
        <>
            <Card.Header>
                <h5 style={{float:"left"}}>{this.props.active_operator.first_name ? this.props.active_operator.first_name +" "+ this.props.active_operator.last_name : "Select an Operator"}</h5>
                {!this.state.edit ?
                    <>{this.props.show_village && this.props.show_operator ?
                        <Button variant="dark" style={{float: "right"}} onClick={() => this.setState({edit: true, mode: "edit"})}>
                            Edit Operator
                        </Button>
                    :
                        <Button variant="dark" style={{float: "right"}} onClick={() => this.setState({edit: true, mode: "new"})}>
                            Add Operator
                        </Button>
                    }</>
                :
                    <>
                        <Button variant="success" style={{float: "right"}} onClick={() => this.saveOperator()}>
                            Save
                        </Button>
                        <Button variant="danger" style={{float: "right"}} onClick={() => this.deleteOperator()}>
                            Delete
                        </Button>
                    </>
                }
            </Card.Header>
            <Card.Body>
                {!this.state.edit ?
                    <Table><tbody>
                        <tr>
                            <td>Username: </td>
                            <td>{this.props.active_operator.username}</td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td>{this.props.active_operator.email}</td>
                        </tr>
                        <tr>
                            <td>Village: </td>
                            <td>{this.props.active_village.village_name}</td>
                        </tr>
                    </tbody></Table>
                :
                    <Table><tbody>
                        <tr>
                            <td>First Name: </td>
                            <td>
                                <Form.Control id="admin|first_name" onChange={this.handleChange} value={this.props.active_operator.first_name}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name: </td>
                            <td>
                                <Form.Control id="admin|last_name" onChange={this.handleChange} value={this.props.active_operator.last_name}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td>
                                <Form.Control id="admin|email" onChange={this.handleChange} value={this.props.active_operator.email}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Username: </td>
                            <td>
                                <Form.Control id="admin|username" onChange={this.handleChange} value={this.props.active_operator.username}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password: </td>
                            <td>
                                <Form.Control placeholder="Leave blank to keep existing password." id="admin|password" onChange={this.handleChange} value={this.state.password}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Village: </td>
                            <td>
                                <Form.Control as="select" id="admin|village_id" onChange={this.handleChange} value={this.props.active_operator.village_id}>
                                    {this.villageOptions()}
                                </Form.Control>
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
    active_operator: state.active_operator,
    active_village: state.active_village,
    villages: state.villages
});

const mapDispatchToProps = dispatch => ({
    changeOperator: (mode, field=null, value=null) => dispatch({
        type: "change_admin",
        payload: {
            type: "operator",
            mode: mode,
            field: field,
            value: value
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Operator);
