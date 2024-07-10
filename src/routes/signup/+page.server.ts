import { redirect } from "@sveltejs/kit";
import { firebase_auth } from "$lib/firebase/firebase_app";
import { onAuthStateChanged } from "firebase/auth";

export function load() {
    onAuthStateChanged(firebase_auth, (user) => {
        if (user) {
            redirect(301, '/profile')   
        }
    });
}