import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


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
            <Map
                google={this.props.google}
                zoom={8}
                style={{width: "100%", height: "100%"}}
                initialCenter={{ lat: 42.6526, lng: -73.7562}}
            >
                {this.makeMarkers(this.props.locations)}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_TOKEN)
})(MapContainer);
