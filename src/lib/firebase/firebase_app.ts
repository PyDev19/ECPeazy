import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { initializeAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { browserLocalPersistence, type AuthError } from 'firebase/auth';

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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