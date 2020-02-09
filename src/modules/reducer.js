import _ from "lodash";

const initialState = {
    authenticated: false,
    user: ""
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
        newState.user = action.payload;
        return newState;
    }

    case "logout": {
        let newState = _.cloneDeep(state);
        newState.authenticated = false;
        return newState;
    }

    default:
        return state;
    }
};

export default VillageReducer;
