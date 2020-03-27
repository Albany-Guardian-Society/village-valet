import React, {Component} from 'react';
import {Autocomplete, GoogleMap, LoadScript} from "@react-google-maps/api";


const center = {
    lat: 38.685,
    lng: -115.234
};

class MapContainerWithAutocomplete extends Component {
    constructor(props) {
        super(props);

        this.autocomplete = null;

        this.onLoad = this.onLoad.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    onLoad(autocomplete) {
        console.log('autocomplete: ', autocomplete);

        this.autocomplete = autocomplete
    }

    onPlaceChanged() {
        if (this.autocomplete !== null) {
            const place = this.autocomplete.getPlace();
            console.log(place);
            console.log(<place className="geometry location"></place>);
            console.log(JSON.stringify(place, null, 4))
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    render() {
        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}
                libraries={["places"]}
            >
                <GoogleMap
                    id="searchbox"
                    mapContainerStyle={{width: "100%", height: "100%"}}
                    zoom={2.5}
                    center={center}
                >
                    <Autocomplete
                        onLoad={this.onLoad}
                        onPlaceChanged={this.onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Customized your placeholder"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </Autocomplete>
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MapContainerWithAutocomplete;
