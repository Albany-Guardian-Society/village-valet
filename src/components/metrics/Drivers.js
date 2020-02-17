import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const TEST = [
    {
        driverID:123434,
        driver:'Rider Name',
        mileage: 6,
        numberRides: 2,
        volunteerHours: 1
    },
    {
        driverID:5555,
        driver:'Rider Name',
        mileage: 6,
        numberRides: 3,
        volunteerHours: 5
    }
];

class Drivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
    };

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Driver ID</th>
                    <th>Driver</th>
                    <th>No. Trips</th>
                    <th>Mileage</th>
                    <th>Volunteer Hours</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{TEST[0].driverID}</td>
                    <td>{TEST[0].driver}</td>
                    <td>{TEST[0].numberRides}</td>
                    <td>{TEST[0].mileage}</td>
                    <td>{TEST[0].volunteerHours}</td>
                </tr>
                <tr>
                    <td>{TEST[1].driverID}</td>
                    <td>{TEST[1].driver}</td>
                    <td>{TEST[1].numberRides}</td>
                    <td>{TEST[1].mileage}</td>
                    <td>{TEST[1].volunteerHours}</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);