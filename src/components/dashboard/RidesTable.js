import React, {Component} from 'react';
import {connect} from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class RidesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
    }

    handleClick = ride => {
        this.props.changeRideBreakdown(ride)
    };

    createTable = () => {
        if (this.props.rides == null) return;
        let table = [];
        for (const ride of this.props.rides) {
            table.push(<Row style={{padding: "5px"}} key={ride.id}><Button size="lg" variant="light" block={true}
                                                                           onClick={() => this.handleClick(ride)}>{`Ride Id: ${ride.id}`}</Button></Row>)
        }
        return table
    };


    render() {
        return (
            <Container>
                {this.createTable()}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    changeRideBreakdown: (ride) => dispatch({
        type: "active_ride",
        payload: ride,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RidesTable);
