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
                <tr key={index}>
                    <td>{user.personal_info.first_name}</td>
                    <td>{user.personal_info.last_name}</td>
                    <td>{user.user_type}</td>

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
                        <td>First</td>
                        <td>Last</td>
                        <td>User Type</td>
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
