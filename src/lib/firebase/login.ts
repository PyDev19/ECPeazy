import { firebase_auth } from "./firebase_app";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export async function login(email: string, password: string): Promise<boolean | AuthError> {
    return signInWithEmailAndPassword(firebase_auth, email, password).then(() => {
        return true;
    }).catch((error: AuthError) => {
        console.log(error.code, error.message)
        return error;
    });
}