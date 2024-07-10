import { redirect } from "@sveltejs/kit";
import { firebase_auth } from "$lib/firebase/firebase_app";
import { onAuthStateChanged } from "firebase/auth";

export function load() {
    onAuthStateChanged(firebase_auth, (user) => {
        console.log(user)
        if (user?.providerId !== "google.com") {
            redirect(301, '/signup')
        }
    });
}