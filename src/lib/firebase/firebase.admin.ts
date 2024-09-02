import { PUBLIC_FIREBASE_ADMIN_KEY } from '$env/static/public'
import { type App, initializeApp, cert } from 'firebase-admin/app'
import { getAuth, type Auth } from 'firebase-admin/auth'

let firebase_admin: App | undefined = undefined;
let firebase_admin_auth: Auth | undefined = undefined;

if (!firebase_admin) {
    firebase_admin = initializeApp({
        credential: cert(JSON.parse(PUBLIC_FIREBASE_ADMIN_KEY)),
    });
    firebase_admin_auth = getAuth(firebase_admin);
}

export { firebase_admin, firebase_admin_auth }