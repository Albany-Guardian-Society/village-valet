const {firestore} = require("../../server");

/**
 * @module Operators
 */

/**
 * Returns all operators in the database
 * @returns {Promise<Object[]>}
 */
exports.getOperators = async () => {
    const querySnapshot = await firestore.collection('operators').get();
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        delete data['password'];
        return {...data, id: doc.id}
    });
};

/**
 * Returns a specific operator by id in the database, without password
 * @param {string} operator_id - Document id of the operator
 * @returns {Promise<{}>}
 */
exports.getOperatorById = async (operator_id) => {
    const doc = await firestore.collection('operators').doc(operator_id).get();
    if (!doc) {
        return {}
    }
    const data = doc.data();
    delete data['password'];
    return {...data, id: doc.id}
};

/**
 * Returns a specific operator by id in the database, with password
 * @param {string} operator_id - Document id of the operator
 * @returns {Promise<{}>}
 */
exports.getOperatorByIdFull = async (operator_id) => {
    const doc = await firestore.collection('operators').doc(operator_id).get();
    if (!doc) {
        return {}
    }
    const data = doc.data();
    return {...data, id: doc.id}
};

/**
 * Returns a specific operator by username in the database, with password
 * @param operator_username - Username of the operator
 * @returns {Promise<Object[]>}
 */
exports.getOperatorByUsername = async (operator_username) => {
    const querySnapshot = await firestore.collection('operators').where('username', '==', operator_username).get();
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
};

/**
 * Returns all admins in the database. Currently not in use
 * @returns {Promise<Object[]>}
 */
exports.getAdmins = async () => {
    const querySnapshot = await firestore.collection('operators')
        .where('village_id', '==', 'admin').get();
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
};

/**
 * Adds user to the database. Returns the doc id if successful, returns false if not
 * @param {Object} operator - Operator object
 * @returns {Promise<string | boolean>}
 */
exports.addOperator = async (operator) => {
    return firestore.collection('operators').add(operator)
        .then((doc) => {
            return doc.id
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

/**
 * Removes operator from database based on document id
 * @param operator_id - Document Id of the operator
 * @returns {Promise<boolean>}
 */
exports.removeOperator = async (operator_id) => {
    return firestore.collection('operators').doc(operator_id).delete()
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

/**
 * Updates operator in the database
 * @param {Object} operator - Operator Object
 * @returns {Promise<boolean>}
 */
exports.updateOperator = async (operator) => {
    return firestore.collection('operators').doc(operator.id).update(operator)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};
