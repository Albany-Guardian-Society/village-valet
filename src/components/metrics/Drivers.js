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
        console.log(drivers);
        return drivers.map((driver) => {
            return (
                <tr key={driver.id}>
                    <td>{driver.id}</td>
                    {/*<td>{driver}</td>*/}
                    {/*<td>{numberRides}</td>*/}
                    {/*<td>{mileage}</td>*/}
                    {/*<td>{volunteerHours}</td>*/}
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
