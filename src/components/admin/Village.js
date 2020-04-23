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
            mode: "",
        };
		this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        //Make sure that if they change the selected the mode is changed
        if (this.props.show_village !== prevProps.show_village) {
            this.setState({edit: false});
        }
    }

    handleChange(event) {
        let field = event.target.id.split("|")[1];
        this.props.changeVillage("edit", field, event.target.value);
	}

    saveVillage() {
        if (this.state.mode === "new") {
            this.props.changeVillage("add")
        } else {
            this.props.changeVillage("save")
        }
        this.setState({edit: false, password: "", mode: ""});
    }

    deleteVillage() {
        if (window.confirm("Are you sure you want to delete this village?\nTHIS CANNOT BE UNDONE!")) {
            this.props.changeVillage("delete");
            this.setState({edit: false, password: "", mode: ""});
        }
    }

    render() {
        return (
        <>
            <Card.Header>
                <h5 style={{float:"left"}}>{this.props.active_village.village_name ? this.props.active_village.village_name : "Select a Village"}</h5>
                {!this.state.edit ?
                    <>{this.props.show_village ?
                        <Button variant="dark" style={{float: "right"}} onClick={() => this.setState({edit: true, mode: "edit"})}>
                            Edit Village
                        </Button>
                    :
                        <Button variant="dark" style={{float: "right"}} onClick={() => this.setState({edit: true, mode: "new"})}>
                            Add Village
                        </Button>
                    }</>
                :
                    <>
                        <Button variant="success" style={{float: "right", marginLeft: "10px"}} onClick={() => this.saveVillage()}>
                            Save
                        </Button>
                        <Button variant="danger" style={{float: "right"}} onClick={() => this.deleteVillage()}>
                            Delete
                        </Button>
                    </>
                }
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
                                <Form.Control id="admin|village_name" onChange={this.handleChange} value={this.props.active_village.village_name}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Vetting Criteria: </td>
                            <td>
                                <Form.Control id="admin|vetting" onChange={this.handleChange} value={this.props.active_village.vetting}/>
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
    active_village: state.active_village,
    villages: state.villages
});

const mapDispatchToProps = dispatch => ({
    changeVillage: (mode, field=null, value=null) => dispatch({
        type: "change_admin",
        payload: {
            type: "village",
            mode: mode,
            field: field,
            value: value
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Village);
