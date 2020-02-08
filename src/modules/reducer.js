import _ from "lodash";

const initialState = {
    authenticated: false
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
		newState.player_id = action.payload;
        return newState;
    }

    case "logout": {
        let newState = _.cloneDeep(state);
        newState.authenticated = false;
		newState.player_id = "";
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
