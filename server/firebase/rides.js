import firestore from "../server";


export const getRides = async(village_id) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('rides').get()
    }
    else {
        querySnapshot = await firestore.collection('rides').where('village_id', '==', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


export const getRide = async(village_id, ride_id) => {
    const querySnapshot = await firestore.collection('rides').doc(ride_id).get();
    const data = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
    if (village_id === 'admin') return data;
    if (data) {
        if (data[ride_id]['village_id'].indexOf(village_id)  !== -1) {
            return data
        }
    }
    return []
};

export const getRidesByDate = async(village_id, date) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('rides').where('date', '==', date).get();
    }
    else {
        querySnapshot = await firestore.collection('rides').where('village_id', '==', village_id).where('date', '==', date).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


export const addRide = async(ride) => {
    firestore.collection('rides').add(ride)
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};

export const removeRide = async(ride_id) => {
    firestore.collection('rides').doc(ride_id).delete()
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};

export const updateRide = async(ride) => {
    firestore.collection('rides').doc(ride.id).update(ride)
        .then(() => {return true})
        .catch((e) => {
            console.log(e);
            return false
        })
};
