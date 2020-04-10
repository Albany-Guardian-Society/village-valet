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
        let drivers = this.props.users.filter((user) => {
                return(user.user_type === 'driver')
        });

        const result = {};

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
                    {/*<td>{driver.numberRides}</td>*/}
                    {/*<td>{driver.mileage}</td>*/}
                    {/*<td>{driver.volunteer_hours}</td>*/}
                </tr>
            )
        })
    }

    renderTableHeader() {
        console.log('here');
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
                <h1 id='title'>Drivers</h1>
                <Table>
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
