import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const TEST = [
    {
        riderID:123434,
        rider:'Rider Name',
        mileage: 6,
        numberRides: 2,
        villageID: 1
    },
    {
        riderID:5555,
        rider:'Rider Name',
        mileage: 6,
        numberRides: 3,
        villageID: 5
    }
];

class Riders extends Component {
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
                    <th>Rider ID</th>
                    <th>Rider</th>
                    <th>No. Trips</th>
                    <th>Mileage</th>
                    <th>Village ID</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{TEST[0].riderID}</td>
                    <td>{TEST[0].rider}</td>
                    <td>{TEST[0].numberRides}</td>
                    <td>{TEST[0].mileage}</td>
                    <td>{TEST[0].villageID}</td>
                </tr>
                <tr>
                    <td>{TEST[1].riderID}</td>
                    <td>{TEST[1].rider}</td>
                    <td>{TEST[1].numberRides}</td>
                    <td>{TEST[1].mileage}</td>
                    <td>{TEST[1].villageID}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Riders);