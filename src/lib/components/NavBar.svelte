<script lang="ts">
    import { onMount } from "svelte";
    import { firebase_auth } from "$lib/firebase/firebase_app";
    import type { User } from "firebase/auth";
    import { onAuthStateChanged } from "firebase/auth";

    let show_profile = false;
    let profile_image: string | null = "";
    let show_menu = false;

    function logout() {
        firebase_auth.signOut();
        show_profile = false;
        window.location.href = "/login";
    }

    onMount(() => {
        onAuthStateChanged(firebase_auth, (user: User | null) => {
            if (user) {
                firebase_auth.updateCurrentUser(user);
                console.log("User, " + user.displayName + " is logged in");

                show_profile = true;
                profile_image = user.photoURL;
            } else {
                console.log("User is not logged in");
            }
        });
    });
</script>

<div class="flex flex-row justify-between z-50 absolute w-full">
    <div class="bg-[#FFE8A3] inline-flex flex-row space-x-20 mt-3 ml-3 p-1 rounded-lg">
        <div class="flex flex-row space-x-2 my-auto">
            <img src="favicon_transparent.png" alt="ECPeazy Logo" width="50" height="50" />
            <h1 class="my-auto text-[#52554C] font-bold text-2xl">
                <span class="text-[#7B9150]">EC</span>Peazy
            </h1>
        </div>
        <div class="flex flex-row space-x-5 my-auto text-lg font-bold text-[#627368]">
            <a href="/search">Find ECs</a>
            <a href="/portfolio" class="pr-3">My Portfolio</a>
        </div>
    </div>
    {#if show_profile}
        <div class="inline-flex rounded-full bg-[#FFE8A3] my-auto p-1 mr-5 w-12">
            <img src={profile_image} alt="Profile Pic" class="rounded-full" width="40" />
        </div>
    {:else}
        <a href="/login" class="login-button mr-2 flex items-center justify-center w-24 h-10 my-auto">
            Login
        </a>
    {/if}
</div>

<style>
    .login-button {
        background-color: #3B82F6;
        color: white;
        
        padding-left: 1rem;
        padding-right: 1rem;

        border-radius: 9999px;
        text-align: center;
        font-weight: bold;

        transition: background-color 0.3s ease-in-out;
    }

    .login-button:hover {
        background-color: #2563EB;
    }
</style>
