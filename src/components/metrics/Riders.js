import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import moment from "moment";

/** @class Riders shows rider profiles*/

class Riders extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Populates Table with Riders' information
     * @returns {Object[]}
     */
    renderTableData() {
        const results = {}
        let riders = Object.values(this.props.users).filter((user) => {
            return (user.user_type === 'rider')
        });
        const rides = Object.values(this.props.rides).filter(ride => moment(ride.ride_data.date, 'YYYY-MM-DD').isBefore(moment()))
        for (const rider of riders) {
            for (const ride of rides) {
                if (Object.keys(results).indexOf(rider.id) === -1) {
                    results[rider.id] = {}
                    results[rider.id]['rides'] = 0
                    results[rider.id]['mileage'] = 0
                    results[rider.id]['village_id'] = rider.primary_village_id
                }
                if (ride.rider.id !== rider.id) continue;
                results[rider.id]['rides'] += 1
                results[rider.id]['mileage'] += ride.ride_data.mileage.rider ? ride.ride_data.mileage.rider : 0
            }
        }
        return riders.map((rider) => {
          if (!(rider.id in results)) return null;
            return (
                <tr key={rider.id} style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
                    <td>{rider.id}</td>
                    <td>{rider.personal_info.first_name} {rider.personal_info.last_name}</td>
                    <td>{results[rider.id]['rides']}</td>
                    <td>{/*results[rider.id]['mileage'].isFixed(2)*/}</td>
                    <td>{results[rider.id]['village_id']}</td>
                </tr>
            )
        })
    }

    /**
     * Renders the Riders table's headers
     * @returns {Object[]}
     */
    renderTableHeader() {
        let header = ['Rider Id', 'Rider', 'Rides', 'Mileage', 'Village'];
        return header.map((item) => {
            return <th key={item}>{item}</th>
        })
    }

    handleChange(event){
    };

    /**
     * Renders everything formatted
     * @returns {*}
     */
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

/**
 * Gets rides and users from state
 * @param state
 * @returns {{rides: {}, users: {}}}
 */
const mapStateToProps = state => ({
    rides: state.rides,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Riders);
