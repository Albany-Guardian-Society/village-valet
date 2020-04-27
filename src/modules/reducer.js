import _ from "lodash";
import bcrypt from "bcryptjs";
import axios from "axios";
import {API_ROOT} from "./api";
import cookies from "react-cookies"
import cookie from "react-cookies"

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
    geolocation: {
        lat: 0,
        lng: 0
    }
};

const VEHICLE_TEMPLATE = {
    make_model: "",
    year: "",
    color: "",
    lp: "",
    insp_date: "",
    insur_provider: "",
    insur_policy: "",
    insur_exp: "",
    insur_coverage: 0,
    seats: 0,
    special: "",
};

const VOL_HOURS_TEMPLATE = (day = "monday") => {
    return {
        day: day,
        start: "",
        end: ""
    }
};

const BLANK_PROFILE = {
    user_type: "",
    primary_village_id: "",
    villages: [],
    status: "active",
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
    caregiver: {
        first_name: "",
        last_name: "",
        email: "",
        phone_mobile: "",
        phone_home: "",
        preferred_communication: "",
    },
    addresses: [ADDRESS_TEMPLATE,],
    accommodations: {
        allergies: "",
        mobility_aid: "",
        smoke_preference: "",
        special: ""
    },
    vehicles: [VEHICLE_TEMPLATE,],
    volunteer_hours: [0, 1, 2, 3, 4, 5, 6].map(day => VOL_HOURS_TEMPLATE(day)),
    driver_specific: {
        vetting: "",
    },
};

const BLANK_RIDE = {
    status: "",
    id: "",
    rider: {
        first_name: "",
        last_name: "",
        id: "",
    },
    driver: {
        first_name: "",
        last_name: "",
        id: "",
        vehicle: VEHICLE_TEMPLATE,
        home_geolocation: ""
    },
    locations: {
        pickup: {
            address: "",
            time: "",
            special: "",
            geolocation: ""
        },
        dropoff: {
            address: "",
            time: "",
            special: "",
            geolocation: ""
        },
    },
    ride_data: {
        village_id: "",
        mileage: {
            driver: "",
            rider: ""
        },
        time_total: {
            driver: "",
            rider: "",
        },
        traffic: "",
        date: "",
        purpose: "",
        associated_ride: {
            ride_id: "",
            driver_id: ""
        },
        meta: {
            return: false,
            givendropoff: "true",
            pickup_CA: true,
            dropoff_CA: true,
        }
    }
};

const BLANK_VILLAGE = {
    id: "",
    village_name: "",
    email: "",
    phone: "",
    vetting: "",
    defaults: {}
}

const BLANK_OPERATOR = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    username: "",
    village_id: ""
}

const initialState = {
    authenticated: false,
    loaded: false,
    operator: {
        first_name: "",
        last_name: "",
        village_id: "",
    },
    villages: {},
    users: {},
    rides: {},
    operators: {},
    // This is
    active_profile: _.cloneDeep(BLANK_PROFILE),
    active_ride: _.cloneDeep(BLANK_RIDE),
    active_village: _.cloneDeep(BLANK_VILLAGE),
    active_operator:_.cloneDeep(BLANK_OPERATOR),
    admin: {
        show_village: "",
        show_operator: "",
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

        case "trigger_update": {
            let newState = _.cloneDeep(state);
            return newState;
        }

        case "authenticate": {
            let newState = _.cloneDeep(state);
            newState.operator.admin = action.payload.village_id === 'admin';
            newState.operator.id = action.payload.id;
            newState.operator.first_name = action.payload.first_name;
            newState.operator.last_name = action.payload.last_name;
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
                case "operators":
                    newState.operators = action.payload.data;
                    break;
            default:
        }
        return newState;
    }

    case "admin_page": {
        let newState = _.cloneDeep(state);
        if (action.payload.village === "") {
            newState.active_village = _.cloneDeep(BLANK_VILLAGE);
            newState.admin.show_village = "";
        } else {
            newState.active_village = state.villages[action.payload.village];
            newState.admin.show_village = action.payload.village;
        }
        if (action.payload.id === "") {
            newState.active_operator = _.cloneDeep(BLANK_OPERATOR);
            newState.admin.show_operator = "";
        } else {
            newState.active_operator = state.operators[action.payload.id];
            newState.admin.show_operator = action.payload.id;
        }
        return newState;
    }

    case "change_admin": {
        let newState = _.cloneDeep(state);
        if (action.payload.type === "operator") {
            switch (action.payload.mode) {
                case "add": {
                    axios.post(API_ROOT + '/database/operators/operator', {operator: newState.active_operator}, {
                        headers: {
                            "Authorization": "BEARER " + cookies.load('token')
                        }
                    }).then(response => {
                        cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                        newState.active_operator.id = response.data.id;
                        //If its the first operator you need to add the village id
                        newState.operators[response.data.id] = newState.active_operator;
                    });
                    break;
                }
                case "edit": {
                    if (action.payload.field === "password") {
                        newState.active_operator["password"] = bcrypt.hashSync(action.payload.value, 10);
                    } else {
                        newState.active_operator[action.payload.field] = action.payload.value;
                    }
                    break;
                }
                case "save": {
                    let newUser = _.cloneDeep(newState.active_operator)
                    //THIS WILL BE HANDLED BETTER BY AN ENDPOINT DESIGNED FOR SAVING USERS WHEN THE PASSWORD IS UNCHANGED.
                    //If the password was unchaged, dont edit it
                    axios.put(API_ROOT + '/database/operators/operator', {operator: newUser}, {
                        headers: {
                            "Authorization": "BEARER " + cookies.load('token')
                        }
                    }).then((response) => {
                        cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                        newState.operators[newState.active_operator.id] = {...newState.active_operator, ...newUser};
                        //if moving the village
                    })
                    break;
                }
                case "delete": {
                    axios.delete(API_ROOT + '/database/operators/operator', {
                        data: {operator_id: newState.active_operator.id},
                        headers: {
                            "Authorization": "BEARER " + cookies.load('token')
                        }
                    }).then((response) => {
                        cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                        delete newState.operators[newState.active_operator.id];
                        newState.active_village = _.cloneDeep(BLANK_VILLAGE);
                        newState.active_operator = _.cloneDeep(BLANK_VILLAGE);
                    })
                }
            }
        } else if (action.payload.type === "village") {
            switch (action.payload.mode) {
                case "add": {
                    axios.post(API_ROOT + '/database/villages/village', {village: newState.active_village}, {
                        headers: {
                            "Authorization": "BEARER " + cookies.load('token')
                        }
                    }).then(response => {
                        cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                        newState.active_village.id = response.data.id;
                        newState.villages[response.data.id] = newState.active_village;
                        newState.admin.show_village = response.data.id
                        this.forceUpdate()
                    });
                    break;
                }
                case "edit": {
                    newState.active_village[action.payload.field] = action.payload.value;
                    break;
                }
                case "save": {
                    axios.put(API_ROOT + '/database/villages/village', {village: newState.active_village}, {
                        headers: {
                            "Authorization": "BEARER " + cookies.load('token')
                        }
                    }).then(response => {
                        cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});

                    })
            newState.villages[newState.active_village.id] = _.cloneDeep(newState.active_village);
                    break;
                }
                case "delete": {
                    if (newState.operators && !(Object.keys(newState.operators).includes(newState.active_village.id))) {
                        axios.delete(API_ROOT + '/database/villages/village', {
                            data: {village_id: newState.active_village.id},
                            headers: {
                                "Authorization": "BEARER " + cookies.load('token')
                            }
                        }).then(response => {
                            cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                        });
                        delete newState.village[newState.active_village.id];
                        newState.active_village = _.cloneDeep(BLANK_VILLAGE);
                        newState.active_operator = _.cloneDeep(BLANK_VILLAGE);
                        this.forceUpdate()
                    } else {
                        //Add the check for riders and Drivers
                        //FUTURE TEAM ADD THIS LITTLE FEATURE!
                        window.alert("You CANNOT delete a village that still has active riders, drivers, or operators!");
                    }
                }
            }
        }
        return newState;
    }

    case "add_user": {
        let newState = _.cloneDeep(state);
        newState.users[action.payload.id] = (action.payload);
        return newState;
    }

    case "clear_active_profile": {
        let newState = _.cloneDeep(state);
        newState.active_profile = _.cloneDeep(BLANK_PROFILE);
        return newState;
    }

    case "set_active_user": {
        let newState = _.cloneDeep(state);
        newState.active_profile = action.payload;
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
                case "add_vehicle":
                    newState.active_profile.vehicles.push(_.cloneDeep(VEHICLE_TEMPLATE));
                    break;
                case "remove_vehicle":
                    newState.active_profile.vehicles.splice(action.payload.value, 1);
                    break;
                case "add_vol_hours":
                    newState.active_profile.volunteer_hours.push(_.cloneDeep(VOL_HOURS_TEMPLATE()));
                    break;
                case "remove_vol_hours":
                    newState.active_profile.volunteer_hours.splice(action.payload.value, 1);
                    break;
                default:
                    if (action.payload.type === "addresses") {
                        if (action.payload.id.split("|")[1] === "lng") {
                            newState.active_profile[action.payload.type][action.payload.id.split("|")[0]].geolocation[action.payload.id.split("|")[1]] = action.payload.value;
                        } else if (action.payload.id.split("|")[1] === "lat") {
                            newState.active_profile[action.payload.type][action.payload.id.split("|")[0]].geolocation[action.payload.id.split("|")[1]] = action.payload.value;
                        } else {
                            newState.active_profile[action.payload.type][action.payload.id.split("|")[0]][action.payload.id.split("|")[1]] = action.payload.value;
                        }
                    } else if (action.payload.type === "vehicles") {
                        newState.active_profile[action.payload.type][action.payload.id.split("|")[0]][action.payload.id.split("|")[1]] = action.payload.value;
                    } else if (action.payload.type === "volunteer_hours") {
                        newState.active_profile[action.payload.type][action.payload.id.split("|")[0]][action.payload.id.split("|")[1]] = action.payload.value;
                    } else {
                        newState.active_profile[action.payload.type][action.payload.id] = action.payload.value;
                    }
                    break;
            }
        return newState;
    }

    case "scheduler": {
        let newState = _.cloneDeep(state);
        if (action.payload.type === "date") {
            newState.active_ride.ride_data.date = action.payload.value;
        } else if (action.payload.type === "purpose") {
            newState.active_ride.ride_data.purpose = action.payload.value;
        } else if (action.payload.type === "samereturn") {
            newState.active_ride.ride_data.meta.samereturn = action.payload.value;
        } else if (action.payload.type === "givendropoff") {
            newState.active_ride.ride_data.meta.givendropoff = action.payload.value;
        } else if (action.payload.type === "vehicle") {
            let vehicle = newState.users[action.payload.field].vehicles.filter((car) => {
                return car.lp === action.payload.value;
            })[0];
            newState.active_ride.driver.vehicle = vehicle;
        } else if (action.payload.type === "common_address") {
            let mode = action.payload.field.split("|");
            if (mode[0] === "set") {
                if (mode[1] === "pickup") {
                    newState.active_ride.ride_data.meta.pickup_CA = false;
                } else if (mode[1] === "dropoff") {
                    newState.active_ride.ride_data.meta.dropoff_CA = false;
                }
            } else {
                let addr_id = action.payload.value.split("|");
                let address = state.users[addr_id[0]].addresses.filter((a) => {
                    return a.line_1 === addr_id[1];
                })[0];
                if (mode[0] === "pickup") {
                    newState.active_ride.locations[action.payload.field].address = address.line_1;
                    //GEOLOCATIONS ARE NOT BEING SAVED THIS NEEDS TO HAPPEN
                    //newState.active_ride.locations[action.payload.field].geolocation = address.geolocation;
                    newState.active_ride.ride_data.meta.pickup_CA = true;
                } else if (mode[0] === "dropoff") {
                    newState.active_ride.locations[action.payload.field].address = address.line_1;
                    //GEOLOCATIONS ARE NOT BEING SAVED THIS NEEDS TO HAPPEN
                    //newState.active_ride.locations[action.payload.field].geolocation = address.geolocation;
                    newState.active_ride.ride_data.meta.dropoff_CA = true;
                }
            }
        } else {
            newState.active_ride.locations[action.payload.type][action.payload.field] = action.payload.value;
        }
        return newState;
    }

    case "set_ride_participant": {
        let newState = _.cloneDeep(state);
        if (action.payload.type === "rider"){
            newState.active_ride.rider.first_name = action.payload.user.personal_info.first_name;
            newState.active_ride.rider.last_name = action.payload.user.personal_info.last_name;
            newState.active_ride.rider.id = action.payload.user.id;
            newState.active_ride.ride_data.village_id = action.payload.user.primary_village_id;
        } else if (action.payload.type === "driver") {
            newState.active_ride.driver.first_name = action.payload.user.personal_info.first_name;
            newState.active_ride.driver.last_name = action.payload.user.personal_info.last_name;
            newState.active_ride.driver.geolocation = action.payload.user.addresses[0].geolocation;
            newState.active_ride.driver.id = action.payload.user.id;
        }
        return newState;
    }

    case "user_update": {
        let newState = _.cloneDeep(state);

        let index = newState.active_profile.id;
        if (index) {
            newState.users[index] = newState.active_profile;
            axios.put(API_ROOT + "/database/users/user", {user: newState.active_profile}, {}).then(response => {
                cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
            })
        }

        return newState;
    }

    case "user_deactivate": {
        let newState = _.cloneDeep(state);
        axios.patch(API_ROOT + '/database/users/user/status', {
            user_id: newState.active_profile.id,
            status: "inactive"
        }, {
            headers: {
                "Authorization": "BEARER " + cookies.load('token')
            }
        }).then(response => {
            cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
        })
        newState.active_profile.status = "inactive";
        //Now edit the local copy, then update the DB:
        //Find the user in newState.users
        let index = newState.users.findIndex((i) => {
            return i.id === newState.active_profile.id
        });
        if (index >= 0) {
            newState.users[index].status = "inactive";
        }
        //Update Firestore
        return newState;
    }
    case "user_activate": {
        let newState = _.cloneDeep(state);
        axios.patch(API_ROOT + '/database/users/user/status', {user_id: newState.active_profile.id, status: "active"}, {
            headers: {
                "Authorization": "BEARER " + cookies.load('token')
            }
        }).then(response => {
            cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
        })
        newState.active_profile.status = "active";
        //Now edit the local copy, then update the DB:
        //Find the user in newState.users
        let index = newState.users.findIndex((i) => {
            return i.id === newState.active_profile.id
        });
        if (index >= 0) {
            newState.users[index].status = "active";
        }
        return newState;
    }
    case "user_perma_delete": {
        let newState = _.cloneDeep(state);
        axios.delete(API_ROOT + '/database/users/user', {
            data: {user_id: newState.active_profile.id},
            headers: {
                "Authorization": "BEARER " + cookies.load('token')
            }
        }).then(response => {
            cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
        });
        let index = newState.users.findIndex((i) => {
            return i.id === newState.active_profile.id
        });
        if (index >= 0) {
            delete newState.users[index];
        }
        newState.active_profile = _.cloneDeep(BLANK_PROFILE);
        return newState;
    }

        case "ride_cancel": {
            let newState = _.cloneDeep(state);
            axios.delete(API_ROOT + '/database/rides/ride', {
                data: {ride_id: action.payload},
                headers: {
                    "Authorization": "BEARER " + cookies.load('token')
                }
            }).then(response => {
                cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
            });
            delete newState.rides[action.payload];
            return newState;
        }

        case "ride_deactivate": {
            let newState = _.cloneDeep(state);
            let rideID = action.payload;
            axios.patch(API_ROOT + '/database/rides/ride/status', {
                ride_id: rideID,
                status: "inactive"
            }, {
                headers: {
                    "Authorization": "BEARER " + cookies.load('token')
                }
            }).then(response => {
                cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
            })
            newState.rides[rideID].status = "inactive";
            return newState;
        }

        case "ride_reactivate": {
            let newState = _.cloneDeep(state);
            let rideID = action.payload;
            axios.patch(API_ROOT + '/database/rides/ride/status', {
                ride_id: rideID,
                status: "active"
            }, {
                headers: {
                    "Authorization": "BEARER " + cookies.load('token')
                }
            }).then(response => {
                cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
            })
            newState.rides[rideID].status = "active";
            return newState;
        }

        case "add_ride": {
            let newState = _.cloneDeep(state);
            newState.rides[action.payload.id] = (action.payload);
            return newState;
        }

        case "update_active_ride": {
            let newState = _.cloneDeep(state);
            newState.active_ride = _.cloneDeep(action.payload);
            return newState;
        }

        case "setup_return_ride": {
            let newState = _.cloneDeep(state);
            newState.active_ride = _.cloneDeep(BLANK_RIDE);
            newState.active_ride.locations.dropoff.address = state.active_ride.locations.pickup.address;
            newState.active_ride.locations.pickup.address = state.active_ride.locations.dropoff.address;
            newState.active_ride.locations.dropoff.geolocation = state.active_ride.locations.pickup.geolocation;
            newState.active_ride.locations.pickup.geolocation = state.active_ride.locations.dropoff.geolocation;
            newState.active_ride.ride_data.date = state.active_ride.ride_data.date;
            newState.active_ride.ride_data.village_id = state.active_ride.ride_data.village_id;
            newState.active_ride.rider = state.active_ride.rider;
            newState.active_ride.ride_data.meta.return = true;
            return newState
        }

        case "active_ride": {
            let newState = _.cloneDeep(state);
            newState.active_ride = _.cloneDeep(action.payload);
            return newState;
        }

        case "clear_active_ride": {
            let newState = _.cloneDeep(state);
            newState.active_ride = _.cloneDeep(BLANK_RIDE);
            return newState;
        }

        default:
            return state;
    }
};

export default VillageReducer;
