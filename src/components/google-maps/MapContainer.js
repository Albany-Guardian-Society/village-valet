import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {connect} from "react-redux";


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}

	makeMarkers(location_list) {
        if (location_list === undefined) return;
        const markers = [];
        for (const location of Object.values(location_list)) {
            markers.push(
                <Marker
                    key={location.latitude+location.longitude}
                    title={location.name}
                    position={{lat: location.latitude, lng:location.longitude}}
                    name={location.name}
                />);
        }
        return markers;
    }

    render() {
        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}
            >
                <GoogleMap
                    id='map'
                    zoom={8}
                    mapContainerStyle={{width: "100%", height: "100%"}}
                    center={{ lat: 42.6526, lng: -73.7562}}
                >
                    {this.makeMarkers(this.props.locations)}
                </GoogleMap>
            </LoadScript>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
