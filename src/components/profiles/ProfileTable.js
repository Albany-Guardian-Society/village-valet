import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";



class ProfileTable extends Component {
    constructor(props){
        super(props);
        this.state={
        };
        this.generateTableData = this.generateTableData.bind(this);
        this.generateTableHeaders = this.generateTableHeaders.bind(this);

    }
    componentDidMount() {
        console.log(this.props.mode);
    }

    generateTableHeaders() {
        let headerList = [];
        if (this.props.mode === "driver"){
            headerList.push(
                    <tr>
                        <td>Picture</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Village</td>
                        <td>Time</td>
                    </tr>
            )
        }
        else if (this.props.mode === "rider"){
            headerList.push(
                    <tr>
                        <td>Picture</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Village</td>
                    </tr>
            )
        }
        else if (this.props.mode === "all"){
            headerList.push(
                    <tr>
                        <td>ID</td>
                        <td>First</td>
                        <td>Last</td>
                        <td>User Type</td>
                    </tr>
            )
        }
        return headerList;
    }

    generateTableData(){
        let res=[];
        for (let index in this.props.users){
            let user = this.props.users[index];
            if (this.props.mode === "driver" && user.user_type === "driver"){
                res.push(
                    <tr key={user.village_id}>
                        <td>{user.village_id}</td>
                        <td>{user.personal_info.first_name}</td>
                        <td>{user.personal_info.last_name}</td>
                        <td>{user.village_id}</td>
                        <td>6-9pm</td>
                    </tr>
            );
            }
            else if (this.props.mode === "rider" && user.user_type === "rider") {
                res.push(
                    <tr key={user.village_id}>
                        <td>{user.village_id}</td>
                        <td>{user.personal_info.first_name}</td>
                        <td>{user.personal_info.last_name}</td>
                        <td>{user.village_id}</td>
                    </tr>
                );
            }
            else if (this.props.mode === "all") {
                res.push(
                    <tr key={user.village_id}>
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
