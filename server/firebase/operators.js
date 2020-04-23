import firestore from "../server";


export const getOperators = async() => {
    const querySnapshot = await firestore.collection('operators').get();
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        delete data['password'];
        return {...data, id: doc.id}
    });
};


export const getOperatorById = async(operator_id) => {
    const querySnapshot = await firestore.collection('operators').doc(operator_id).get();
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        delete data['password'];
        return {...data, id: doc.id}
    })
};

export const getOperatorByUsername = async(operator_username) => {
    const querySnapshot = await firestore.collection('operators').where('username', '==', operator_username).get();
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
};



export const addOperator = async(operator) => {
    firestore.collection('operators').add(operator)
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};

export const removeOperator = async(operator_id) => {
    firestore.collection('operators').doc(operator_id).delete()
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};

export const updateOperator = async(operator) => {
    firestore.collection('operators').doc(operator.id).update(operator)
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};
