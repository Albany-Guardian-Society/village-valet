import firestore from "../server";


const villages = async(village_id) => {
    let querySnapshot;
    if (village_id === 'admin') {
        querySnapshot = await firestore.collection('villages').get()
    }
    else {
        querySnapshot = await firestore.collection('villages').where('village_id', 'array-contains', village_id).get();
    }
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};


const village = async(village_id) => {
    let querySnapshot;
    querySnapshot = await firestore.collection('villages').where('id', '==', village_id).get()
    return querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    });
};

const addVillage = async(village) => {
    firestore.collection('villages').add(village)
        .then(() => {return true})
        .catch(() => {return false})
};

const removeVillage = async(village_id) => {
    firestore.collection('villages').doc(village_id).delete()
        .then(() => {return true})
        .catch(() => {return false})
};

const updateVillage = async(village) => {
    firestore.collection('villages').doc(village.id).update(village)
        .then(() => {return true})
        .catch(() => {return false})
};
