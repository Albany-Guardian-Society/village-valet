const {firestore} = require("../../server");

console.log(firestore)

exports.getOperators = async () => {
    const querySnapshot = await firestore.collection('operators').get();
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        delete data['password'];
        return {...data, id: doc.id}
    });
};


exports.getOperatorById = async (operator_id) => {
    const querySnapshot = await firestore.collection('operators').doc(operator_id).get();
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        delete data['password'];
        return {...data, id: doc.id}
    })
};

exports.getOperatorByIdFull = async (operator_id) => {
    const querySnapshot = await firestore.collection('operators').doc(operator_id).get();
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {...data, id: doc.id}
    })
};


exports.getOperatorByUsername = async (operator_username) => {
    const querySnapshot = await firestore.collection('operators').where('username', '==', operator_username).get();
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
};


exports.addOperator = async (operator) => {
    firestore.collection('operators').add(operator)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

exports.removeOperator = async (operator_id) => {
    firestore.collection('operators').doc(operator_id).delete()
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

exports.updateOperator = async (operator) => {
    firestore.collection('operators').doc(operator.id).update(operator)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};
