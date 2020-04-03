import React, { Component } from 'react';
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";

const TEST= [
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

    // renderTableData() {
    //     return this.state.drivers.map((rider, index) => {
    //         const { riderId, rider, mileage, numberRides, villageID } = rider; //destructuring
    //         return (
    //             <tr key={riderId}>
    //                 <td>{riderId}</td>
    //                 <td>{rider}</td>
    //                 <td>{mileage}</td>
    //                 <td>{numberRides}</td>
    //                 <td>{villageID}</td>
    //             </tr>
    //         )
    //     })
    // }
    //
    // renderTableHeader() {
    //     let header = Object.keys(this.state.riders[0]);
    //     return header.map((key, index) => {
    //         return <th key={index}>{key.toUpperCase()}</th>
    //     })
    // }
    //
    // handleChange(event){
    // };
    //
    // render() {
    //     return (
    //         <div>
    //             <h1 id='title'>Riders</h1>
    //             <table id='riderId'>
    //                 <tbody>
    //                 <tr>{this.renderTableHeader()}</tr>
    //                 {this.renderTableData()}
    //                 </tbody>
    //             </table>
    //         </div>
    //     );
    // }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Riders);