import { firebase_auth, firebase_firestore } from '$lib/firebase/firebase_app';
import { createUserWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { GoogleUser, SignUpUser } from '$lib/types/user';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { type CredentialResponse } from "$lib/types/credentials";
import { base } from '$app/paths';

export async function sign_up(user: SignUpUser): Promise<boolean | AuthError> {
    return createUserWithEmailAndPassword(firebase_auth, user.email, user.password).then(async (user_credential) => {
        const current_user = user_credential.user;

        updateProfile(current_user, {
            displayName: user.username
        }).then(() => {
            console.log('User profile updated successfully');
        }).catch((error) => { console.log(error); });

        console.log(current_user);

        const user_doc_ref = doc(firebase_firestore, 'Users', current_user.uid);
        await setDoc(user_doc_ref, {
            sign_up_complete: false,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            school: user.school,
            age: user.age,
            graduation_year: user.graduation_year
        });

        return true;
    }).catch((error: AuthError) => {
        console.log(error.code, error.message);

        return error;
    });
}

export async function google_sign_up(response: CredentialResponse) {
    const credential = GoogleAuthProvider.credential(response.credential);

    signInWithCredential(firebase_auth, credential).then((result) => {
        const user = result.user;

        const user_doc_ref = doc(firebase_firestore, 'Users', user.uid);
        setDoc(user_doc_ref, {
            email: user.email,
        });

        window.location.href = base + "/signup/google_complete";
    }).catch((error) => {
        console.log(error);
    });
}

export async function google_sign_up_complete(user: GoogleUser) {
    const current_user = firebase_auth.currentUser;

    updateProfile(current_user!, {
        displayName: user.username
    }).then(() => {
        console.log('User profile updated successfully');
    }).catch((error) => { console.log(error); });

    const user_doc_ref = doc(firebase_firestore, 'Users', current_user!.uid);
    await setDoc(user_doc_ref, {
        username: user.username,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        school: user.school,
        age: user.age,
        graduation_year: user.graduation_year,
    });

    firebase_auth.signOut()
    window.location.href = base + "/login";
}