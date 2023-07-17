import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const AUTH = firebase.auth();
