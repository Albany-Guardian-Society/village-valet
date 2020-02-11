import _ from "lodash";

// The reducer is an internal middle man that handles passing information from each
// of the various components to something called the store.  The store is basically a
// global state.  This state is also never edited, but rather a copy is made, updated
// and then replaced.  This leads to come key benefits that escacpe me, but its "standard
// practice" do still handle the reducer this way.

// The reducer is "called" by using a dispatch.  These have a type and a payload.
// The type is matched against a switch statement to perform a state update.
// The payload is used to information from a component to the reducer and then save to store

const initialState = {
    authenticated: false,
    operator: {
        first_name: "",
        last_name: "",
        village_id: "",
    },
    ridebreakdown: {
        id: "",
        rider:'',
        driver:'',
        pickup: "",
        dropoff: ""
    }
};

//The authentication should be cached for a period of time
//so that reloading the page doesnt mess us up.

const VillageReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "authenticate": {
        let newState = _.cloneDeep(state);
        newState.authenticated = true;
        newState.operator.first_name = action.payload.first_name;
        newState.operator.last_name = action.payload.last_name;
        newState.operator.village_id = action.payload.village;
        return newState;
    }

    case "logout": {
        let newState = _.cloneDeep(state);
        newState.authenticated = false;
        return newState;
    }

    case "ridebreakdown": {
        let newState = _.cloneDeep(state);
        newState.ridebreakdown = action.payload;
        return newState;
    }


    default:
        return state;
    }
};

export default VillageReducer;
