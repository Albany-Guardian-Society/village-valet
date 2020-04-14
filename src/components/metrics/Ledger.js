import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const TEST = [
    {
        id:1234,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432",
        mileage: 6,
        timestamp: 1400
    },
    {
        id:5555,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432",
        mileage: 6,
        timestamp: 1400
    }
];

class Ledger extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderTableData() {
        let rides = this.props.rides;
        console.log(rides);
        let keys = Object.keys(rides);
        for ( let i = 0, len = keys.length; i < len; i++) {
            return (
                <tr>
                    <td>{rides[keys[i]].id}</td>
                    <td>{rides[keys[i]].driver.first_name}</td>
                    <td>{rides[keys[i]].rider.first_name}</td>
                    <td>n/a</td>
                    <td>n/a</td>

                </tr>
            )

        }
        return rides.map((ride) => {
            return(
                <tr key={ride.id}>
                    <td>{ride.id}</td>
                </tr>
                )

        })
    }

    renderTableHeader() {
        console.log('here');
        let header = ['Ride', 'Driver', 'Rider', 'Mileage', 'Volunteer Hours'];
        return header.map((item) => {
            return <th key={item}>{item}</th>
        })
    }

    handleChange(event){
    };

    render() {
        return (
            <div>
                <h1 id='title'>Ledger</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ledger);