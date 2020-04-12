import React, {Component} from 'react';
import {connect} from "react-redux";

import Card from "react-bootstrap/Card"
import MapContainer from "../google-maps/MapContainer";
import RideDetails from "./RideDetails";

class RideBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);

    }

	handleChange(event) {
	}

    render() {
        return (
            <Card style={{height:'100%'}}>
                <Card.Header>Ride Breakdown</Card.Header>
                <Card.Body>
                    <RideDetails/>
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                        <MapContainer/>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RideBreakdown);
