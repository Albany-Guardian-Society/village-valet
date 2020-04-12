import React, { Component } from 'react';
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
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

class LedgerTable extends Component {
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
            <Container style={{minWidth: "100%"}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Ride ID</th>
                        <th>Driver</th>
                        <th>Rider</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Mileage</th>
                        <th>Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{TEST[0].id}</td>
                        <td>{TEST[0].driver}</td>
                        <td>{TEST[0].rider}</td>
                        <td>{TEST[0].pickup}</td>
                        <td>{TEST[0].dropoff}</td>
                        <td>{TEST[0].mileage}</td>
                        <td>{TEST[0].timestamp}</td>
                    </tr>
                    <tr>
                        <td>{TEST[1].id}</td>
                        <td>{TEST[1].driver}</td>
                        <td>{TEST[1].rider}</td>
                        <td>{TEST[1].pickup}</td>
                        <td>{TEST[1].dropoff}</td>
                        <td>{TEST[1].mileage}</td>
                        <td>{TEST[1].timestamp}</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LedgerTable);