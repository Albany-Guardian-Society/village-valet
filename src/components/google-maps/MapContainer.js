import React, {Component} from 'react';
import {DirectionsRenderer, DirectionsService, GoogleMap} from '@react-google-maps/api';
import * as moment from 'moment';
import {connect} from "react-redux";
// Above are all the imports for this file.
// Every file will need React, Component, connect



/**
 * @class MapContainer
 * @typedef {Object} MapContainer
 *
 */
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions_cache: new Map()
        };
        this.locations = {};
        this.timePast = false;
        this.timeNow = null;
        this.directionsCallback = this.directionsCallback.bind(this)

    }

    /**
     * Final step of scheduler.
     * Allows operator to look over information before submitting rider
     *
     * @example
     *
     */

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (((nextProps.ride.locations['pickup'].geolocation !== "" && nextProps.ride.locations['dropoff'].geolocation !== "") &&
            (this.props.ride.locations['pickup'].geolocation.lat !== nextProps.ride.locations['pickup'].geolocation.lat ||
                this.props.ride.locations['dropoff'].geolocation.lat !== nextProps.ride.locations['dropoff'].geolocation.lat)) ||
            (nextState.response != null && this.state.response !== nextState.response)
        ) {
            return true
        }
        return this.props.ride.driver.id !== nextProps.ride.driver.id;

    }
    /**
     * Converts meters to miles
     *
     * @example
     *Used in another function
     * this.convertMetersToMiles(response.routes[0].legs[0].distance.value)
     */
    convertMetersToMiles(meters) {
        return Math.round((meters * 0.00062137 + Number.EPSILON) * 100) / 100
    }
    /**
     * Stores information about the route into the store
     *
     * @example
     *Used in render
     * this.storeRouteInfo(response)
     */
    storeRouteInfo(response) {
        if (this.props.ride.ride_data.associated_ride && this.props.ride.ride_data.associated_ride.driver_id === this.props.ride.driver.id) {
            this.props.ride.ride_data.mileage.rider = this.convertMetersToMiles(response.routes[0].legs[0].distance.value);
            this.props.ride.ride_data.time_total.rider = response.routes[0].legs[0].duration.value
        } else {
            this.props.ride.ride_data.mileage.rider = this.convertMetersToMiles(response.routes[0].legs[1].distance.value);
            this.props.ride.ride_data.time_total.rider = response.routes[0].legs[1].duration.value
        }
        if (this.props.ride.driver.id) {
            this.props.ride.ride_data.mileage.driver = this.convertMetersToMiles(response.routes[0].legs[0].distance.value) + this.convertMetersToMiles(response.routes[0].legs[1].distance.value);
            this.props.ride.ride_data.time_total.driver = response.routes[0].legs[0].duration.value + response.routes[0].legs[1].duration.value;
        }
        this.props.updateActiveRide(this.props.ride)
    }
    /**
     * Used in the scheduler to format ride time and date
     *
     * @example
     *  {this.checkTimeInPast()}
     */
    checkTimeInPast() {
        this.timeNow = moment();
        if (this.props.ride.ride_data.date === '' || this.props.ride.locations.pickup.time === '') {
            this.timePast = true;
            return
        }
        this.timePast = moment(this.props.ride.ride_data.date + ' ' + this.props.ride.locations.pickup.time, "YYYY-MM-DD HH:mm").isBefore(this.timeNow);
    }
    /**
     * Stores entered directions and updates the state of the component
     *
     */
    directionsCallback(response) {
        if (response !== null) {
            if (response.status === 'OK') {
                let key;
                if ('waypoint' in Object.keys(this.locations)) {
                    key = this.locations['origin'].lat + this.locations['destination'].lat + this.locations['waypoint'].location.lat
                } else {
                    key = this.locations['origin'].lat + this.locations['destination'].lat
                }
                this.storeRouteInfo(response)
                this.state.directions_cache.set(key, response);
                this.setState({directions_cache: this.state.directions_cache, response: response});
            } else {
                console.log('response: ', response)
            }
        }
    }
    /**
     * Used for formatting the different locations the ride will have
     *
     */
    locationOrder() {
        if (this.props.ride.locations.dropoff == null || this.props.ride.locations.pickup == null) return;
        if (this.props.ride.driver.id) {
            if (this.props.ride.ride_data.associated_ride && this.props.ride.ride_data.associated_ride.driver_id === this.props.ride.driver.id) {
                this.locations['origin'] = this.props.ride.locations.pickup.geolocation;
                this.locations['destination'] = this.props.ride.driver.geolocation;
                this.locations['waypoint'] = [{
                    location: this.props.ride.locations.dropoff.geolocation,
                    stopover: true
                }];
            } else {
                this.locations['origin'] = this.props.ride.driver.geolocation;
                this.locations['destination'] = this.props.ride.locations.dropoff.geolocation;
                this.locations['waypoint'] = [{
                    location: this.props.ride.locations.pickup.geolocation,
                    stopover: true
                }];
            }
        } else {
            this.locations['origin'] = this.props.ride.locations.pickup.geolocation;
            this.locations['destination'] = this.props.ride.locations.dropoff.geolocation;
        }
    }
    /**
     * Creates directions in google maps using latitude and longitude
     *
     */
    makeDirections() {
        if (!this.locations['origin'].lat || !this.locations['destination'].lat) {
            return;
        }
        let key;
        if ('waypoint' in Object.keys(this.locations)) {
            key = this.locations['origin'].lat + this.locations['destination'].lat + this.locations['waypoint'].location.lat
        } else {
            key = this.locations['origin'].lat + this.locations['destination'].lat
        }
        if (this.state.directions_cache.has(key)) {
            this.setState({
                directions_cache: this.state.directions_cache,
                response: this.state.directions_cache.get(key)
            });
            return;
        }
        return <DirectionsService
            options={{
                origin: this.locations['origin'],
                destination: this.locations['destination'],
                travelMode: 'DRIVING',
                waypoints: this.locations['waypoint'],
                optimizeWaypoints: false,
                drivingOptions: {
                    departureTime: this.timePast ? this.timeNow.toDate() : moment(this.props.ride.ride_data.date + ' ' + this.props.ride.locations.pickup.time, "YYYY-MM-DD HH:mm").toDate(),
                    trafficModel: 'pessimistic'
                }
            }}
            callback={resp => {
                this.directionsCallback(resp);
            }}
            onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService)
            }}
            onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService)
            }}
        />;
    }
    /**
     * Displays directions
     *
     */
    renderDirections() {
        if (!this.state.response) return;
        return <DirectionsRenderer
            options={{
                directions: this.state.response
            }}
            onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
            }}
            onUnmount={directionsRenderer => {
                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
            }}
        />
    }
    /**
     * Displays the map container
     *
     * @returns {HTMLDocument}
     *
     */
    render() {
        return (
            <GoogleMap
                id='map'
                zoom={8}
                mapContainerStyle={{width: "100%", height: "100%"}}
                center={{lat: 42.6526, lng: -73.7562}}
            >
                {this.locationOrder()}
                {this.checkTimeInPast()}
                {this.locations && this.makeDirections()}
                {this.renderDirections()}
            </GoogleMap>
        )
    }
}

/**
 * Pulls rides from state
 *
 */
const mapStateToProps = state => ({
    ride: state.active_ride,
});

/**
 * Updates active rides
 *
 */
const mapDispatchToProps = dispatch => ({
    updateActiveRide: (ride) => dispatch({
        type: "update_active_ride",
        payload: ride,
    }),

});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
