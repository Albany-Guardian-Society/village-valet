import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

class LedgerTable extends Component {
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
            <Container style={{minWidth: "100%"}}>
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
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    rides: state.rides,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LedgerTable);