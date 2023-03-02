
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
//import { getAdmin } from "firebase-admin";


/* import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import 'firebase/storage';
import 'firebase/database'; */
console.log(process.env.REACT_APP_FIREBASE_API_KEY)

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, //"AIzaSyBKvNIQKpOThmINmnSROq6xiR8k0rkwTuo",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,//"vaku-dev.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,//"https://vaku-dev-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,//"vaku-dev",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,//"vaku-dev.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,//"539106730769",
    appId: process.env.REACT_APP_FIREBASE_APP_ID// "1:539106730769:web:68b82567c0b5e2140862b0"
});
export const auth = getAuth(app);


export const database = getDatabase(app);
export const storage = getStorage(app);
/* export const firestore = firebase.firestore();
export const database = firebase.database()
export const functions = firebase.functions();
export const storage = firebase.storage();
export const firestoreTimestamp = firebase.firestore.Timestamp;
export const auth = firebase.auth(); */

export default app;