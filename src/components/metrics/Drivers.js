import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

class Drivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderTableData() {
        let drivers = Object.values(this.props.users).filter((user) => {
            return(user.user_type === 'driver')
        });

        //const result = {};

        // Object.keys(drivers)
        //     .forEach(key => result[key] = drivers[key]);
        //
        // Object.keys(this.props.rides)
        //     .forEach(key => result[key] = this.props.rides[key]);
        //
        // // console.log(result);
        // console.log(this.props.rides);
        // console.log(drivers);
        // console.log(result);
        return drivers.map((driver) => {
            return (
                <tr key={driver.id}>
                    <td>{driver.id}</td>
                    <td>{driver.personal_info.first_name}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = ['Driver Id', 'Driver', 'Rides', 'Mileage', 'Volunteer Hours'];
        return header.map((item) => {
            return <th key={item}>{item}</th>
        })
    }

    handleChange(event){
    };

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    rides: state.rides,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
