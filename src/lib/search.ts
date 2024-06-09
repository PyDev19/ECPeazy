import { getDocs, collection, query, where, type FirestoreError } from 'firebase/firestore';
import { firebase_firestore } from './firebase/firebase_app';
import { type EC } from '$lib/types/database';
import {TfIdf} from 'natural/lib/natural/tfidf';

function find_ec(subject: string, difficulty: string) {
    console.log("Finding ECs...");

    const ecs_collection = collection(firebase_firestore, "ECs");
    const search_query = query(ecs_collection, where("fields", "array-contains", subject), where("difficulty", "==", difficulty));

    console.log("Querying...");
    console.log();

    getDocs(search_query).then(docs => {
        console.log("Results:");
        docs.forEach((doc) => {
            const doc_data: EC = doc.data() as EC;
            console.log(doc.data().name);
        });
    }).catch(err => {
        console.error(err);
        console.log(typeof err);
    });
}

function calculate_relevance(ec: EC, query: String): number {
    let score = 0;
    const query_lower = query.toLowerCase();
    
    // Check if the EC name contains the query
    if (ec.name.toLowerCase().includes(query_lower)) {
        score += 2; // Higher weight for name match
    }

    // Check if any of the keywords contain the query
    for (const keyword of ec.keywords) {
        if (keyword.toLowerCase().includes(query_lower)) {
            score += 1; // Lower weight for keyword match
        }
    }

    return score;
}

export async function keyword_search(query: string): Promise<EC[] | boolean | FirestoreError> {
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

        // Calculate relevance scores
        const results: { [key: string]: number } = {};
        ecs.forEach((ec) => {
            results[ec.name] = calculate_relevance(ec, query);
        });

        // Check if all relevance scores are 0
        const allScoresZero = Object.values(results).every(score => score === 0);
        if (allScoresZero) {
            return false; // Return false if all scores are 0
        }

        // Sort the ECs by relevance
        ecs.sort((a, b) => results[b.name] - results[a.name]);

        // Return the sorted ECs
        return ecs;
    }).catch((err: FirestoreError) => {
        return err;
    });
}