const {firestore} = require("../../server");


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


exports.getVillage = async (village_id) => {
    const doc = await firestore.collection('villages').where('id', '==', village_id).get()
    if (!doc) {
        return {}
    }
    const data = doc.data();
    return {...data, id: doc.id}
};


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
