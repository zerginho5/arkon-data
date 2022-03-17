import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCbooOJoWM90nu3SNiErQX38Xw2LtNbBpU",
    authDomain: "arkon-data-firebase.firebaseapp.com",
    projectId: "arkon-data-firebase",
    storageBucket: "arkon-data-firebase.appspot.com",
    messagingSenderId: "268588059487",
    appId: "1:268588059487:web:2890f3182964b28a4904ea"
};

firebase.initializeApp(firebaseConfig);


const storageRef = firebase.storage().ref()
const db = firebase.firestore();
const auth = firebase.auth()
const realtime = firebase.database();
db.enablePersistence({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    synchronizeTabs: true
})
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
var offsetRef = firebase.database().ref(".info/serverTimeOffset");
offsetRef.on("value", (snap) => {
    var offset = snap.val();
    var estimatedServerTimeMs = new Date().getTime() + offset;
});

export {
    db,
    googleAuthProvider,
    firebase,
    storageRef,
    realtime,
    auth
}