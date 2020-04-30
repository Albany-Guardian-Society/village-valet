const {firestore} = require("../../server");


/**
 * @module Villages
 */

/**
 * Return all villages accessible
 * @param {string } village_id - Requesting village document id
 * @returns {Promise<Object[]>}
 */
exports.getVillages = async (village_id) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('villages').get()
    } else {
        querySnapshot = await firestore.collection('villages').where('id', '==', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};

/**
 * Return a village based on document id
 * @param {string } village_id - Village document id
 * @returns {Promise<Object[]>}
 */
exports.getVillage = async (village_id) => {
    const querySnapshot = await firestore.collection('villages').where('id', '==', village_id).get()
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
}

/**
 * Adds village to database
 * @param {Object} village - Village Object
 * @returns {Promise<string | boolean>}
 */
exports.addVillage = async (village) => {
    return firestore.collection('villages').add(village)
        .then((doc) => {
            return doc.id
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

/**
 * Removes village from database
 * @param {string} village_id - Village document id
 * @returns {Promise<boolean>}
 */
exports.removeVillage = async (village_id) => {
    return firestore.collection('villages').doc(village_id).delete()
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

/**
 * Updates village in database
 * @param {Object} village - Village Object
 * @returns {Promise<boolean>}
 */
exports.updateVillage = async (village) => {
    return firestore.collection('villages').doc(village.id).update(village)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};
