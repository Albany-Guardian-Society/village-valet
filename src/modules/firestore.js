import firebase from 'firebase/app';


var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
    authDomain: "village-valet.firebaseapp.com",
    databaseURL: "https://village-valet.firebaseio.com",
    projectId: "village-valet",
    storageBucket: "village-valet.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIRESTORE_SENDER_ID,
    appId: process.env.REACT_APP_FIRESTORE_APP_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
