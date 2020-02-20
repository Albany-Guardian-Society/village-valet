import _ from "lodash";

// The reducer is an internal middle man that handles passing information from each
// of the various components to something called the store.  The store is basically a
// global state.  This state is also never edited, but rather a copy is made, updated
// and then replaced.  This leads to come key benefits that escacpe me, but its "standard
// practice" do still handle the reducer this way.

// The reducer is "called" by using a dispatch.  These have a type and a payload.
// The type is matched against a switch statement to perform a state update.
// The payload is used to information from a component to the reducer and then save to store

const ADDRESS_TEMPLATE = {
    name: "",
    line_1: "",
    line_2: "",
    city: "",
    state: "",
    zip: "",
    special_instructions: "",
}

const BLANK_PROFILE = {
    user_type: "",
    village_id: "",
    personal_info: {
        first_name: "",
        last_name: "",
        email: "",
        phone_mobile: "",
        phone_home: "",
        preferred_communication: "",
        language: []
    },
    emergency_contact: {
        first_name: "",
        last_name: "",
        email: "",
        phone_mobile: "",
        phone_home: "",
        preferred_communication: "",
        relationship: ""
    },
    addresses: [ADDRESS_TEMPLATE,],
    accommodations: {
        allergies: "",
        mobility_aid: "",
        smoke_preference: "",
        special: ""
    },
}

const initialState = {
    authenticated: true,
    loaded: false,
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
    },
    villages: {},
    users: {},
    rides: {},
    // This is
    active_profile: _.cloneDeep(BLANK_PROFILE),

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
        newState.operator.village_id = action.payload.village_id;
        return newState;
    }

    case "logout": {
        let newState = _.cloneDeep(state);
        newState.authenticated = false;
        newState.loaded = false;
        return newState;
    }

    case "load": {
        let newState = _.cloneDeep(state);
        switch (action.payload.tag) {
            case "loaded":
                newState.loaded = action.payload.data;
                break;
            case "villages":
                newState.villages = action.payload.data;
                break;
            case "users":
                newState.users = action.payload.data;
                break;
            case "rides":
                newState.rides = action.payload.data;
                break;
            default:
        }
        return newState;
    }

    case "add_user": {
        let newState = _.cloneDeep(state);
        newState.users.push(action.payload);
        return newState;
    }

    case "clear_active_profile": {
        let newState = _.cloneDeep(state);
        newState.active_profile = _.cloneDeep(BLANK_PROFILE);
        return newState;
    }

    case "ridebreakdown": {
        let newState = _.cloneDeep(state);
        newState.ridebreakdown = action.payload;
        return newState;
    }

    case "registration": {
        let newState = _.cloneDeep(state);
            switch (action.payload.id) {
                case "user_type":
                    newState.active_profile[action.payload.id] = action.payload.value;
                    break;
                case "village_id":
                    newState.active_profile[action.payload.id] = action.payload.value;
                    break;
                case "add_address":
                    newState.active_profile.addresses.push(_.cloneDeep(ADDRESS_TEMPLATE));
                    break;
                case "remove_address":
                    newState.active_profile.addresses.splice(action.payload.value, 1);
                    break;
                default:
                    if (action.payload.type === "addresses") {
                        newState.active_profile[action.payload.type][action.payload.id.split("|")[0]][action.payload.id.split("|")[1]] = action.payload.value;
                    } else {
                        newState.active_profile[action.payload.type][action.payload.id] = action.payload.value;
                    }
                    break;
            }
        return newState;
    }

    default:
        return state;
    }
};

export default VillageReducer;
