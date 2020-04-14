import firestore from "../server";


const users = async(village_id) => {
    let querySnapshot = null;
    if (village_id === 'admin') {
         querySnapshot = await firestore.collection('users').get()
    }
    else {
         querySnapshot = await firestore.collection('users').where('village_id', 'array-contains', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


const user = async(village_id, user_id) => {
    let querySnapshot = null;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('users').where('id', '==', user_id).get()
    }
    else {
        querySnapshot = await firestore.collection('users').where('village_id', 'array-contains', village_id).where('id', '==', user_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};

const adduser = async(user) => {
    firestore.collection('users').add(user)
        .then(() => {return true})
        .catch(() => {return false})
};

const removeuser = async(user_id) => {
    firestore.collection('users').doc(user_id).delete()
        .then(() => {return true})
        .catch(() => {return false})
};

const updateuser = async(user) => {
    firestore.collection('users').doc(user.id).update(user)
        .then(() => {return true})
        .catch(() => {return false})
};
