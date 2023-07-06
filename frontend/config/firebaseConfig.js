import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "massenergize-auth.firebaseapp.com",
    databaseURL: "https://massenergize-auth.firebaseio.com",
    projectId: "massenergize-auth",
    storageBucket: "massenergize-auth.appspot.com",
    messagingSenderId: "72842344535",
    appId: "1:72842344535:web:9b1517b1b3d2e818",
    measurementId: "G-G4YG94EJ8D",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const emailProvider = new firebase.auth.EmailAuthProvider();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();
