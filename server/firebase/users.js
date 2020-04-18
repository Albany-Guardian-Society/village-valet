import firestore from "../server";


export const getUsers = async(village_id) => {
    let querySnapshot = null;
    if (village_id === 'admin') {
         querySnapshot = await firestore.collection('users').get()
    }
    else {
         querySnapshot = await firestore.collection('users').where('villages', 'array-contains', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


export const getUser = async(village_id, user_id) => {
    const querySnapshot = await firestore.collection('users').doc(user_id).get();
    const data = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
    if (village_id === 'admin') return data;
    if (data) {
        if (data[user_id]['villages'].indexOf(village_id)  !== -1) {
            return data
        }
    }
    return []
};

export const addUser = async(user) => {
    firestore.collection('users').add(user)
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};

export const removeUser = async(user_id) => {
    firestore.collection('users').doc(user_id).delete()
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};

export const updateUser = async(user) => {
    firestore.collection('users').doc(user.id).update(user)
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};
