import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import moment from "moment";

class Drivers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Populates Drivers table with information from database
     * @returns {*[]}
     */
    renderTableData() {
        const results = {}
        let drivers = Object.values(this.props.users).filter((user) => {
            return (user.user_type === 'driver')
        });
        const rides = Object.values(this.props.rides).filter(ride => moment(ride.ride_data.date, 'YYYY-MM-DD').isBefore(moment()))
        for (const driver of drivers) {
            for (const ride of rides) {
                if (Object.keys(results).indexOf(driver.id) === -1) {
                    results[driver.id] = {}
                    results[driver.id]['rides'] = 0
                    results[driver.id]['mileage'] = 0
                    results[driver.id]['time'] = 0
                }
                if (ride.driver.id !== driver.id) continue;
                results[driver.id]['rides'] += 1
                results[driver.id]['mileage'] += ride.ride_data.mileage.driver ? ride.ride_data.mileage.driver : 0
                results[driver.id]['time'] += ride.ride_data.time_total.driver ? ride.ride_data.time_total.driver : 0

            }
        }
        return drivers.map((driver) => {
          if (!(driver.id in results)) return null;
            return (
                <tr key={driver.id} style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
                    <td>{driver.id}</td>
                    <td>{driver.personal_info.first_name} {driver.personal_info.last_name}</td>
                    <td>{results[driver.id]['rides']}</td>
                    <td>{results[driver.id]['mileage'].toFixed(2)}</td>
                    <td>{moment("2015-01-01").startOf('day')
                        .seconds(results[driver.id]['time'])
                        .format('H [hours] mm [minutes]')}</td>
                </tr>
            )
        })
    }

    /**
     * Displays the Table Headers/Column Titles
     * @returns {*[]}
     */
    renderTableHeader() {
        let header = ['Driver Id', 'Driver', 'Rides', 'Mileage', 'Volunteer Hours'];
        return header.map((item) => {
            return <th key={item}>{item}</th>
        })
    }

    handleChange(event){
    };

    /**
     * Renders the entire Drivers' metrics table
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

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
