import _ from "lodash";

const initialState = {
    authenticated: false,
    ridebreakdown: {
        id: "",
        rider:'',
        driver:'',
        pickup: "",
        dropoff: ""
    }
};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "authenticate": {
        let newState = _.cloneDeep(state);
        newState.authenticated = true;
        return newState;
    }

    case "logout": {
        let newState = _.cloneDeep(state);
        newState.authenticated = false;
		newState.player_id = "";
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

export default sCubeReducer;
