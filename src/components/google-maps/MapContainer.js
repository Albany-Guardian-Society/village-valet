import React, {Component} from 'react';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript} from '@react-google-maps/api';


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions_cache: new Map()
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}

    directionsCallback(response, ride_id) {
        if (response !== null) {
            if (response.status === 'OK') {
                this.state.directions_cache.set(ride_id, response);
                this.setState({directions_cache: this.state.directions_cache});
            } else {
                console.log('response: ', response)
            }
        }
    }


    makeDirections(ride_id, locations) {
        if (locations === undefined || ride_id === undefined) return;
        if (this.state.directions_cache.has(ride_id)) {
            return;
        }
        return <DirectionsService
            options={{
                origin: locations.origin,
                destination: locations.destination,
                travelMode: 'DRIVING',
                waypoints: locations.pickup == null ? [] : [{location: locations.pickup}],
                optimizeWaypoints: true
            }}
            callback={resp => {
                this.directionsCallback(resp, ride_id);
            }}
            onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService)
            }}
            onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService)
            }}
        />;
    }

    renderDirections(ride_id) {
        if (ride_id === undefined) return;
        const response = this.state.directions_cache.get(ride_id);
        if (response == null) return;
        return <DirectionsRenderer
            options={{
                directions: response
            }}
            onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
            }}
            onUnmount={directionsRenderer => {
                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
            }}
        />
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
                    {this.props.ride && this.makeDirections(this.props.ride.id, this.props.ride.locations)}
                    {this.props.ride && this.renderDirections(this.props.ride.id)}
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MapContainer;
