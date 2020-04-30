import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const TEST = [
    {
        villageID:1,
        ridesToDate:10,
        ridesLastYear:5,
        ridesLastMonth:3,
        mileage:20,
        riders:6,
        drivers:2
    }
];

/** @class Villages shows villages -- currently needs development*/

class Villages extends Component {
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
                    <th>Village ID</th>
                    <th>Riders</th>
                    <th>Drivers</th>
                    <th>Rides Last Month</th>
                    <th>Rides Last Year</th>
                    <th>Rides to Date</th>
                    <th>Mileage</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{TEST[0].villageID}</td>
                        <td>{TEST[0].riders}</td>
                        <td>{TEST[0].drivers}</td>
                        <td>{TEST[0].ridesLastMonth}</td>
                        <td>{TEST[0].ridesLastYear}</td>
                        <td>{TEST[0].ridesToDate}</td>
                        <td>{TEST[0].mileage}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Villages);