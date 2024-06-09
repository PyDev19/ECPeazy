import { firebase_auth, firebase_firestore } from '$lib/firebase/firebase_app';
import { createUserWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { SignUpUser } from '$lib/types/user';

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
        await setDoc(user_doc_ref, { questionnaire_filled: false });

        return true;
    }).catch((error: AuthError) => {
        console.log(error.code, error.message);

        return error;
    });
}