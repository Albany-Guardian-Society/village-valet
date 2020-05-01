import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/** @class Operator The operator component. */
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

    /**
    * componentDidUpdate fires when the component updates
    *
    * @param {props} prevProps the props of the state before it updated
    */
    componentDidUpdate(prevProps) {
        //Make sure that if they change the selected the mode is changed
        if (this.props.show_operator !== prevProps.show_operator) {
            this.setState({edit: false});
        }
    }

    /**
    * handleChange handles any changes being made by this component
    *
    * @param {Event} event contains the information about what fired the function
    */
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

    /**
    * villageOptions created the dropdown lists for village options
    *
    * @return {HTML} List of valid village options
    */
    villageOptions() {
        let options = [];
        let villages = Object.values(this.props.villages);
        options = villages.map((v) => {
            return(
                <option key={v.id} value={v.id} label={v.village_name}/>
            )
        })
        return [<option key={""} value={""} label={""}/>, ...options];
    }

    /** saveOperator sends operator information to the reducer to be saved*/
    saveOperator() {
        if (this.validate()) {
            if (this.state.mode === "new") {
                this.props.changeOperator("add")
            } else {
                this.props.changeOperator("save")
            }
            this.setState({edit: false, password: "", mode: ""});
        }
    }

    /** deleteOperator sends operator information to the reducer to be deleted*/
    deleteOperator() {
        if (window.confirm("Are you sure you want to delete this operator?\nTHIS CANNOT BE UNDONE!")) {
            this.props.changeOperator("delete");
            this.setState({edit: false, password: "", mode: ""});
        }
    }

    /** validate validated the infomration in the operator*/
    validate() {
        if (this.props.active_operator.first_name === "") {
            window.alert("INVALID NAME: Please provide a first name.");
            return false;
        } else if (this.props.active_operator.last_name === "") {
            window.alert("INVALID NAME: Please provide a last name.");
            return false;
        } else if (this.props.active_operator.email === "") {
            window.alert("INVALID EMAIL: Please provide an email.");
            return false;
        } else if (this.props.active_operator.phone === "") {
            window.alert("INVALID PHONE NUMBER: Please provide a phone number.");
            return false;
        } else if (this.props.active_operator.username === "") {
            window.alert("INVALID USERNAME: Please provide a username.");
            return false;
        } else if (this.state.mode === "new" && this.props.active_operator.password === "") {
            window.alert("INVALID PASSWORD: Please provide a password.");
            return false;
        } else if (this.props.active_operator.village_id === "") {
            window.alert("INVALID VILLAGE: Please select a Village for the Operator.");
            return false;
        }
        return true;
    }

    /**
    * render renders the HTML
    *
    * @return {HTML} The HTML visable element
    */
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
                        <Button variant="success" style={{float: "right", marginLeft: "10px"}} onClick={() => this.saveOperator()}>
                            Save
                        </Button>
                        {this.state.mode !== "new" ?
                        <Button variant="danger" style={{float: "right"}} onClick={() => this.deleteOperator()}>
                            Delete
                        </Button>
                        : null }
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
                            <td>Phone Number: </td>
                            <td>{this.props.active_operator.phone}</td>
                        </tr>
                        <tr>
                            <td>Village: </td>
                            <td>{this.props.active_village ? this.props.active_village.village_name : ""}</td>
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
                            <td>Phone Number: </td>
                            <td>
                                <Form.Control id="admin|phone" onChange={this.handleChange} value={this.props.active_operator.phone}/>
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
                                <Form.Control placeholder={this.state.mode === "new" ? "" : "Leave blank to keep existing password."} id="admin|password" onChange={this.handleChange} value={this.state.password}/>
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
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Operator);
