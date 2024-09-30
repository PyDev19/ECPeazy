import { firebase_auth } from "./firebase.app";
import { signInWithEmailAndPassword, type AuthError, type User } from "firebase/auth";

export async function login(email: string, password: string): Promise<User | AuthError> {
    return signInWithEmailAndPassword(firebase_auth, email, password).then((user) => {
        return user.user;
    }).catch((error: AuthError) => {
        console.log(error.code, error.message)
        return error;
    });
}