import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { initializeAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { browserLocalPersistence, type AuthError } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyBTWXwvJYNjNp1RGbC0-3tDZG3nhWtlPQg",
    authDomain: "ecpeazy.firebaseapp.com",
    projectId: "ecpeazy",
    storageBucket: "ecpeazy.appspot.com",
    messagingSenderId: "162926619471",
    appId: "1:162926619471:web:e86570c6bca947e27ab33a",
    measurementId: "G-ZRQ18PHNJ7"
};

let firebase_app: FirebaseApp | undefined;

if (!getApps().length) {
    firebase_app = initializeApp(config);
}
else {
    firebase_app = getApps()[0]
}

let firebase_auth: Auth = initializeAuth(firebase_app, {
    persistence: browserLocalPersistence
});
firebase_auth.useDeviceLanguage();
let firebase_firestore: Firestore = getFirestore(firebase_app);

export { firebase_app, firebase_auth, firebase_firestore }