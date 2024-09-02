import { firebase_admin_auth } from "$lib/firebase/firebase.admin";
import { doc, getDoc } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { firebase_firestore } from "$lib/firebase/firebase.app";
import type { Activity } from "$lib/types/database";
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const { uid } = params;

    try {
        const user = await firebase_admin_auth?.getUser(uid);

        const portfolio_doc_snapshot = await getDoc(doc(firebase_firestore, "Portfolios", uid));
        const activities: Activity[] = portfolio_doc_snapshot.exists() ? portfolio_doc_snapshot.data()["activities"] || [] : [];

        const user_doc_snapshot = await getDoc(doc(firebase_firestore, "Users", uid));
        const user_data = user_doc_snapshot.data();

        return {
            status: 200,
            user: structuredClone(user),
            activities,
            user_data,
            uid
        };
    } catch (_error) {
        error(404, {
			message: "User not found"
		});
    }
};
