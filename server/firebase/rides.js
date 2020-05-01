const {firestore} = require("../../server");

/**
 * @module Rides
 */

/**
 * Returns all riles belonging to a village
 *
 * @param {string} village_id - Village Document Id
 * @returns {Promise<Object[]>}
 */
exports.getRides = async (village_id) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('rides').get()
    } else {
        querySnapshot = await firestore.collection('rides').where('village_id', '==', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};

/**
 * Returns ride by id if the village id matches the ride or is an admin
 * @param {string} village_id - Village Document Id
 * @param {string} ride_id - Ride Document Id
 * @returns {Promise<{}>}
 */
exports.getRide = async (village_id, ride_id) => {
    const doc = await firestore.collection('rides').doc(ride_id).get();
    if (!doc) {
        return {}
    }
    let data = doc.data();
    data = {...data, id: doc.id}
    if (village_id === 'admin') return data;
    if (data) {
        if (data.ride_data.village_id === village_id) {
            return data
        }
    }
    return {}
};

/**
 * Returns all rides by date if the village id matches the ride or is an admin
 * @param {string } village_id - Village Document Id
 * @param {string} date - Date of the rides
 * @returns {Promise<{}>}
 */
exports.getRidesByDate = async (village_id, date) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('rides').where('date', '==', date).get();
    } else {
        querySnapshot = await firestore.collection('rides').where('village_id', '==', village_id).where('date', '==', date).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


/**
 *  Adds a ride to the database
 * @param {Object} ride - Ride Object
 * @returns {Promise<string | boolean>}
 */
exports.addRide = async (ride) => {
    return firestore.collection('rides').add(ride)
        .then(ref => {
            return ref.id
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

/**
 *  Removes ride from database
 * @param {string} ride_id - Ride Document Id
 * @returns {Promise<boolean>}
 */
exports.removeRide = async (ride_id) => {
    return firestore.collection('rides').doc(ride_id).delete()
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

/**
 * Updates ride in the database
 * @param {Object} ride - Ride Object
 * @returns {Promise<boolean>}
 */
exports.updateRide = async (ride) => {
    return firestore.collection('rides').doc(ride.id).update(ride)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};
