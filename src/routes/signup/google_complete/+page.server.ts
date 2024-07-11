import { redirect } from "@sveltejs/kit";
import { firebase_auth } from "$lib/firebase/firebase_app";
import { onAuthStateChanged, type User } from "firebase/auth";
import { base } from "$app/paths";

export async function load() {
    const user: any = await new Promise((resolve, reject) => {
        onAuthStateChanged(firebase_auth, (user) => resolve(user), reject);
    });

    if (user?.providerId !== "google.com") {
        throw redirect(301, base + '/signup');
    }
}