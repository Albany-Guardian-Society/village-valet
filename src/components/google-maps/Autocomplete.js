import React, {Component} from 'react';
import {Autocomplete, LoadScript} from "@react-google-maps/api";

class AutoComplete extends Component {
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
                <Autocomplete
                    onLoad={this.onLoad}
                    onPlaceChanged={this.onPlaceChanged}
                >
                </Autocomplete>
            </LoadScript>
        )
    }
}

export default AutoComplete;
