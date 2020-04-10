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
        let riders = this.props.users.filter((user) => {
            return(user.user_type === 'rider')
        });

        console.log(riders);
        return riders.map((rider) => {
            return (
                <tr key={rider.id}>
                    <td>{rider.id}</td>
                    <td>{rider.personal_info.first_name}</td>
                    {/*<td>{rider.number_rides}</td>*/}
                    {/*<td>{driver.mileage}</td>*/}
                    <td>{rider.village_id}</td>
                    <td>{rider.village_id}</td>
                    <td>{rider.village_id}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        console.log('here');
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
                <h1 id='title'>Riders</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Riders);
