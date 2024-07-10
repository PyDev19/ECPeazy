<script lang="ts">
    import { onMount } from "svelte";
    import {
        firebase_auth,
        firebase_firestore,
    } from "$lib/firebase/firebase_app";
    import { onAuthStateChanged, type User } from "firebase/auth";
    import { getDoc, doc } from "firebase/firestore";

    let profile_image: string | null = "";
    let username = "";
    let email = "";
    let name = { first: "", middle: "", last: "" };

    onAuthStateChanged(firebase_auth, (user: User | null) => {
        if (user) {
            firebase_auth.updateCurrentUser(user);
            console.log("User, " + user.displayName + " is logged in");

            profile_image = user.photoURL;

            if (user.displayName) {
                username = user.displayName;
            }

            if (user.email) {
                email = user.email;
            }

            getDoc(doc(firebase_firestore, "users", user.uid)).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    if (data) {
                        name["first"] = data.first_name;
                        name["middle"] = data.middle_name;
                        name["last"] = data.last_name;
                    }
                }
            });
        } else {
            console.log("User is not logged in");
        }
    });
</script>

<svelte:head>
    <title>User Settings</title>
</svelte:head>

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h1 class="text-[3em] text-gray-500 m-0">Settings</h1>
        {#if profile_image}
            <img
                src={profile_image}
                alt="profile"
                class="rounded-full mx-auto"
            />
            <button class="bg-[#FFEB3B] text-black p-2 rounded-lg mt-2"
                >Change Profile Picture</button
            >
        {:else}
            <img src="blank-profile.png" alt="profile" />
        {/if}
        <div class="flex flex-col text-left mx-10">
            <div class="flex flex-row">
                <p>Username: {username}</p>
            </div>
            <div class="flex flex-row">
                <p>Email: {email}</p>
            </div>
            <div class="flex flex-row">
                <p>Name: {name.first} {name.middle} {name.last}</p>
            </div>
        </div>
    </div>
</section>
