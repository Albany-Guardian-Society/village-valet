import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

class Riders extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    renderTableData() {
        let riders = Object.values(this.props.users).filter((user) => {
            return(user.user_type === 'rider')
        });

        return riders.map((rider) => {
            return (
                <tr key={rider.id} style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
                    <td>{rider.id}</td>
                    <td>{rider.personal_info.first_name}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = ['Rider Id', 'Rider', 'Rides', 'Mileage', 'Village'];
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
                    <thead style={{display: "table", width: 'calc( 100% - 17px )'}}>
                    <tr style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
                        {this.renderTableHeader()}
                    </tr>
                    </thead>
                    <tbody style={{display: 'block', height: '400px', width: '100%', overflow: 'auto'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Riders);
