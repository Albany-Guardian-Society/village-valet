const {firestore} = require("../../server");


exports.getUsers = async (village_id) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('users').get()
    } else {
        querySnapshot = await firestore.collection('users').where('villages', 'array-contains', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


exports.getUser = async (village_id, user_id) => {
    const querySnapshot = await firestore.collection('users').doc(user_id).get();
    const data = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
    if (village_id === 'admin') return data;
    if (data) {
        if (data[user_id]['villages'].indexOf(village_id) !== -1) {
            return data
        }
    }
    return []
};

exports.getDrivers = async () => {
    const querySnapshot = await firestore.collection('users').where("user_type", "==", "driver").get();
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
}

exports.addUser = async (user) => {
    firestore.collection('users').add(user)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

exports.removeUser = async (user_id) => {
    firestore.collection('users').doc(user_id).delete()
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};

exports.updateUser = async (user) => {
    firestore.collection('users').doc(user.id).update(user)
        .then(() => {
            return true
        })
        .catch((e) => {
            console.log(e);
            return false
        })
};
