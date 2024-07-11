import { redirect } from "@sveltejs/kit";
import { firebase_auth } from "$lib/firebase/firebase_app";
import { onAuthStateChanged } from "firebase/auth";

export async function load() {
    const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(firebase_auth, (user) => resolve(user), reject);
    });

    if (user) {
        throw redirect(301, '/profile');
    }
}