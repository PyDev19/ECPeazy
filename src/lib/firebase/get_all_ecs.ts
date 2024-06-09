import type { EC } from "$lib/types/database";
import { FirestoreError, collection, getDocs } from "firebase/firestore";
import { firebase_firestore } from "./firebase_app";

export async function get_all_ecs(): Promise<EC[] | FirestoreError> {
    // Get the collection of ECs
    const ecs_collection = collection(firebase_firestore, "ECs");

    // Retrieve all the documents in the collection
    return getDocs(ecs_collection).then(docs => {
        const ecs: EC[] = [];

        // Iterate through each document
        docs.forEach((doc) => {
            const doc_data: EC = doc.data() as EC;
            ecs.push(doc_data);
        });

        // Return the ECs
        return ecs;
    }).catch((err: FirestoreError) => {
        return err;
    });
}