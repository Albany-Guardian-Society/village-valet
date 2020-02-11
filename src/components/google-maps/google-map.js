import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

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
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_TOKEN)
})(MapContainer);
