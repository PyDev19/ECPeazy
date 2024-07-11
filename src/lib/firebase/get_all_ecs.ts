import type { EC } from "$lib/types/database";
import { FirestoreError, collection, getDocs } from "firebase/firestore";
import { firebase_firestore } from "./firebase_app";

export async function get_all_ecs() {
    const ecs_collection = collection(firebase_firestore, "ECs");

    return getDocs(ecs_collection).then(async docs => {
        const ecs: EC[] = [];

        docs.forEach((doc) => {
            const doc_data: EC = doc.data() as EC;
            ecs.push(doc_data);
        });

        return ecs;
    }).catch((err: FirestoreError) => {
        return err;
    });
}
