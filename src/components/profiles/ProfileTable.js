import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";



class ProfileTable extends Component {
    constructor(props){
        super(props);
        this.state={
        };
        this.generateTableData = this.generateTableData.bind(this);
    }

    generateTableData(){
        let res=[];
        for (let index in this.props.users){
            let user = this.props.users[index];
            res.push(
                <tr key={user.id}>
                    <td>{user.user_type.replace(/^\w/, c => c.toUpperCase())}</td>
                    <td>{user.personal_info.first_name}</td>
                    <td>{user.personal_info.last_name}</td>
                    <td>{user.village_id}</td>  //Will want to map village_id to a village name
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
                        <td>User Type</td>
                        <td>First</td>
                        <td>Last</td>
                        <td>Village Association</td>
                        <td>ID</td>
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
