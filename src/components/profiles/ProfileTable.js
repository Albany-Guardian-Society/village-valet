import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import fuzzysort from "fuzzysort";

class ProfileTable extends Component {
    constructor(props){
        super(props);
        this.state={
        };
        this.generateTableData = this.generateTableData.bind(this);
        this.generateTableHeaders = this.generateTableHeaders.bind(this);

    }

    componentDidMount() {
    }

    generateTableHeaders() {
        if (this.props.mode === "driver"){
            return (
                <tr>
                    <th>Picture</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Village</th>
                    <th>Time</th>
                </tr>
            )
        } else if (this.props.mode === "rider"){
            return (
                <tr>
                    <th>Picture</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Village</th>
                </tr>
            )
        } else {
            return (
                <tr>
                    <th>Village</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>User Type</th>
                </tr>
            )
        }
    }

    generateTableData(){
        let res=[];
        let filtered_users = [];
        if (this.props.search_term) {
            let index = -1;
            filtered_users = fuzzysort.go(this.props.search_term, this.props.users.map((p) => {
                index++;
                return p.personal_info.first_name + p.personal_info.last_name + "|" + index;
            })).filter((p) => {
                return p.score > -2000;
            }).map((p) => {
                return this.props.users[p.target.split("|")[p.target.split("|").length-1]]
            })
        } else {
            filtered_users = this.props.users;
        }
        for (let index in filtered_users){
            let user = filtered_users[index];
            if (this.props.mode === "driver" && user.user_type === "driver") {
                res.push(
                    <tr key={user.id}>
                        <td>{user.user_type.replace(/^\w/, c => c.toUpperCase())}</td>
                        <td>{user.personal_info.first_name}</td>
                        <td>{user.personal_info.last_name}</td>
                        <td>{user.village_id}</td>
                        <td>{user.id}</td>
                    </tr>
                );
            } else if (this.props.mode === "rider" && user.user_type === "rider") {
                res.push(
                    <tr key={user.id}>
                        <td>{user.village_id}</td>
                        <td>{user.personal_info.first_name}</td>
                        <td>{user.personal_info.last_name}</td>
                        <td>{user.village_id}</td>
                    </tr>
                );
            } else {
                res.push(
                    <tr key={user.id}>
                        <td>{user.village_id}</td>
                        <td>{user.personal_info.first_name}</td>
                        <td>{user.personal_info.last_name}</td>
                        <td>{user.user_type}</td>
                    </tr>
                );
            }
        }
        return res;
    }
    render(){
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        {this.generateTableHeaders()}
                    </thead>
                    <tbody>
                        {this.generateTableData()}
                    </tbody>
                </Table>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTable);
