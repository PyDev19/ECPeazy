import { firebase_auth, firebase_firestore } from '$lib/firebase/firebase_app';
import { createUserWithEmailAndPassword, updateProfile, type AuthError, type User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { GoogleUser, SignUpUser } from '$lib/types/user';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { type CredentialResponse } from "$lib/types/credentials";

export async function sign_up(user: SignUpUser): Promise<User | AuthError> {
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
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            school: user.school,
            grade: user.grade,
            graduation_year: user.graduation_year,
            major_1: user.major_1,
            major_2: user.major_2,
        });

        return user_credential.user;
    }).catch((error: AuthError) => {
        console.log(error.code, error.message);

        return error;
    });
}
