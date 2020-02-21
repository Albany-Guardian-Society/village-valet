import React, { Component } from 'react';
import { connect } from "react-redux";


class ProfilesTable extends Component {
    constructor(props){
        super(props);
        this.state={
        };
        this.generateTableData = this.generateTableData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    generateTableData(){
        let res=[];
        let tableData = this.props.users;
        for(let i =0; i < tableData.length; i++){
            res.push(
                <tr >
                    <td key={this.props.users[i].id}>{this.props.users[i].id}</td>
                    <td key={this.props.users[i].first_name}>{this.props.users[i].first_name}</td>
                    <td key= {this.props.users[i].last_name}>{this.props.users[i].last_name}</td>

                </tr>
            )
        }
        return res;
    }
    render(){
        return(
            <div>
                <table className="table  table-hover">
                    <thead>
                    <tr>
                        <th>ID #</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Profile Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.generateTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}




const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesTable);
