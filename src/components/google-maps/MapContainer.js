import React, {Component} from 'react';
import {DirectionsRenderer, DirectionsService, GoogleMap, LoadScript} from '@react-google-maps/api';
import * as moment from 'moment';
import {connect} from "react-redux";


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions_cache: new Map()
        };
        this.handleChange = this.handleChange.bind(this);
        this.locations = {};
        this.timePast = false;
        this.timeNow = null;
    }

    handleChange(event) {
    }

    convertMetersToMiles(meters) {
        return Math.round((meters * 0.00062137 + Number.EPSILON) * 100) / 100
    }

    storeRouteInfo(response) {
        if (this.props.ride.driver == null || this.timePast) return;
        if (this.props.ride.ride_data.associated_ride && this.props.ride.ride_data.associated_ride.driver_id === this.props.ride.driver.id) {
            this.props.ride.ride_data.mileage.rider = this.convertMetersToMiles(response.routes[0].legs[0].distance.value);
            this.props.ride.ride_data.time_total.rider = response.routes[0].legs[0].duration.value
        } else {
            this.props.ride.ride_data.mileage.rider = this.convertMetersToMiles(response.routes[0].legs[1].distance.value);
            this.props.ride.ride_data.time_total.rider = response.routes[0].legs[1].duration.value
        }
        this.props.ride.ride_data.mileage.driver = this.convertMetersToMiles(response.routes[0].legs[0].distance.value) + this.convertMetersToMiles(response.routes[0].legs[1].distance.value);
        this.props.ride.ride_data.time_total.driver = response.routes[0].legs[0].duration.value + response.routes[0].legs[1].duration.value;
        this.props.updateActiveRide(this.props.ride)
    }

    checkTimeInPast() {
        this.timeNow = moment();
        this.timePast = moment(this.props.ride.ride_data.date + ' ' + this.props.ride.locations.pickup.time, "YYYY-MM-DD HH:mm").isBefore(this.timeNow);
    }

    directionsCallback(response, rideId) {
        if (response !== null && rideId != null) {
            if (response.status === 'OK') {
                this.state.directions_cache.set(rideId, response);
                this.setState({directions_cache: this.state.directions_cache});
                this.storeRouteInfo(response)
            } else {
                console.log('response: ', response)
            }
        }
    }

    convertGeoPointToLatLng(geopoint) {
        if (geopoint == null) return;
        return {lat: geopoint.latitude, lng: geopoint.longitude}
    };

    locationOrder() {
        if (this.props.ride.locations.dropoff == null || this.props.ride.locations.pickup == null) return;
        if (this.props.ride.driver) {
            if (this.props.ride.ride_data.associated_ride && this.props.ride.ride_data.associated_ride.driver_id === this.props.ride.driver.id) {
                this.locations['origin'] = this.convertGeoPointToLatLng(this.props.ride.locations.pickup.geolocation);
                this.locations['destination'] = this.convertGeoPointToLatLng(this.props.ride.driver.home_geolocation);
                this.locations['waypoint'] = {
                    location: this.convertGeoPointToLatLng(this.props.ride.locations.dropoff.geolocation),
                    stopover: true
                };
            } else {
                this.locations['origin'] = this.convertGeoPointToLatLng(this.props.ride.driver.home_geolocation);
                this.locations['destination'] = this.convertGeoPointToLatLng(this.props.ride.locations.dropoff.geolocation);
                this.locations['waypoint'] = {
                    location: this.convertGeoPointToLatLng(this.props.ride.locations.pickup.geolocation),
                    stopover: true
                };
            }
        } else {
            this.locations['origin'] = this.convertGeoPointToLatLng(this.props.ride.locations.pickup.geolocation);
            this.locations['destination'] = this.convertGeoPointToLatLng(this.props.ride.locations.dropoff.geolocation);
        }
    }

    makeDirections(rideId) {
        if (this.state.directions_cache.has(rideId) || this.locations['origin'] == null) {
            return;
        }
        return <DirectionsService
            options={{
                origin: this.locations['origin'],
                destination: this.locations['destination'],
                travelMode: 'DRIVING',
                waypoints: [this.locations['waypoint']],
                optimizeWaypoints: false,
                drivingOptions: {
                    departureTime: this.timePast ? this.timeNow.toDate() : moment(this.props.ride.ride_data.date + ' ' + this.props.ride.locations.pickup.time, "YYYY-MM-DD HH:mm").toDate(),
                    trafficModel: 'pessimistic'
                }
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
                    {this.locationOrder()}
                    {this.checkTimeInPast()}
                    {this.props.ride.locations.pickup.geolocation && this.makeDirections(this.props.ride.ride_id || this.props.driver.ride.driver.id || this.props.ride.rider.id)}
                    {this.props.ride.locations.pickup.geolocation && this.renderDirections(this.props.ride.ride_id || this.props.driver.ride.driver.id || this.props.ride.rider.id)}
                </GoogleMap>
            </LoadScript>
        )
    }
}

const mapStateToProps = state => ({
    ride: state.active_ride,
    rides: state.rides

});

const mapDispatchToProps = dispatch => ({
    updateActiveRide: (ride) => dispatch({
        type: "update_active_ride",
        payload: ride,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
