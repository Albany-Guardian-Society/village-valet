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


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={{width: "100%", height: "100%"}}
                initialCenter={{ lat: 42.6526, lng: -73.7562}}
            >
                <Marker
                    title = { 'Changing Colors Garage' }
                    position = {{ lat: 39.648209, lng: -75.711185 }}
                    name = { 'Changing Colors Garage' }
                />
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_TOKEN)
})(MapContainer);
