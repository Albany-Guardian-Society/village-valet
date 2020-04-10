import React, {Component} from 'react';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript} from '@react-google-maps/api';
import * as moment from 'moment';


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions_cache: new Map()
        };
        this.handleChange = this.handleChange.bind(this);
        this.locations = {};
    }

    handleChange(event) {
    }

    directionsCallback(response, rideId) {
        if (response !== null && rideId != null) {
            if (response.status === 'OK') {
                this.state.directions_cache.set(rideId, response);
                this.setState({directions_cache: this.state.directions_cache});
            } else {
                console.log('response: ', response)
            }
        }
    }

    locationOrder() {
        if (this.props.ride.driver.dropoff == null || this.props.ride.driver.pickup == null) return;
        if (this.props.ride.driver) {
            this.locations['origin'] = this.props.ride.driver.current_geolocation;
            if (this.props.ride.driver.current_geolocation === this.props.ride.locations.pickup.geolocation) {
                this.locations['destination'] = this.props.ride.driver.home_geolocation;
                this.locations['waypoint'] = this.props.ride.driver.dropoff.geolocation;
            } else {
                this.locations['destination'] = this.props.ride.driver.dropoff.geolocation;
                this.locations['waypoint'] = this.props.ride.driver.pickup.geolocation;
            }
        } else {
            this.locations['origin'] = this.props.ride.pickup.geolocation;
            this.locations['destination'] = this.props.ride.driver.dropoff.geolocation;
        }
    }

    makeDirections(rideId) {
        if (this.state.directions_cache.has(rideId)) {
            return;
        }
        return <DirectionsService
            options={{
                origin: this.props.ride.driver.geolocation ? this.props.ride.driver.geolocation : this.props.ride.locations.pickup.geolocation,
                destination: this.props.ride.locations.dropoff.geolocation,
                travelMode: 'DRIVING',
                waypoints: this.props.ride.driver.geolocation ? [{
                    location: this.props.ride.locations.pickup.geolocation,
                    stopover: false
                }],
                optimizeWaypoints: false,
                drivingOptions: {
                    departureTime: moment(this.props.ride.ride_data.date + ' ' + this.props.ride.locations.pickup.time),
                    trafficModel: 'pessimistic'
                },
            }}
            callback={resp => {
                this.directionsCallback(resp, rideId);
            }}
            onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService)
            }}
            onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService)
            }}
        />;
    }

    renderDirections(rideId) {
        if (rideId === undefined) return;
        const response = this.state.directions_cache.get(rideId);
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
                    center={{lat: 42.6526, lng: -73.7562}}
                >
                    {this.props.ride && this.makeDirections(this.props.ride.ride_id || this.props.ride.rider.id)}
                    {this.props.ride && this.renderDirections(this.props.ride.ride_id || this.props.ride.rider.id)}
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MapContainer;
