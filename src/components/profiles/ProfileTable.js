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
            res.push(
                <tr key={user.id}>
                    <td>{user.user_type.replace(/^\w/, c => c.toUpperCase())}</td>
                    <td>{user.personal_info.first_name}</td>
                    <td>{user.personal_info.last_name}</td>
                    <td>{user.village_id}</td>
                    <td>{user.id}</td>
                </tr>
            );
        }

        return res;
    }
    render(){
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User Type</th>
                            <th>First</th>
                            <th>Last</th>
                            <th>Village Association</th>
                            <th>ID</th>
                        </tr>
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
