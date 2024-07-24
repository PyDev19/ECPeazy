<script lang="ts">
    import { onMount } from "svelte";
    import { firebase_auth } from "$lib/firebase/firebase_app";
    import type { User } from "firebase/auth";
    import { onAuthStateChanged } from "firebase/auth";
    import "../app.css";


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

<div
    class="bg-gradient-135 from-[#FFEB3B] from-50% to-[#8BC34A] to-50% h-full w-full fixed top-0 left-0 z-0 background flex justify-center items-center"
>
    <img src="lemon_slice.svg" alt="" width="600" />
</div>
<div class="relative h-full overflow-y-scroll overflow-x-hidden z-10 font-sans">
    <!-- Nav Bar -->
    <div class="font-sans flex justify-center items-center mt-0 md:mt-2">
        <div
            class="bg-white p-1 rounded-full text-center opacity-80 w-[90%] flex items-center"
        >
            <a href="/"
                ><img
                    src="favicon.jpg"
                    alt=""
                    class="rounded-full"
                    width="40"
                /></a
            >
            <h1 class="font-semibold text-lg mx-auto">
                <a href="/">EC Peazy</a>
            </h1>
            <div class="flex space-x-4 mr-1 justify-center items-center">
                <a href="/home" class="mx-2">Home</a>
                <a href="/about" class="mx-2">About Us</a>
                <a href="/search" class="mx-2">Find ECs</a>
                {#if show_profile}
                    {#if profile_image}
                        <button on:click={() => (show_menu = !show_menu)}>
                            <img
                                src={profile_image}
                                alt=""
                                class="rounded-full"
                                width="40"
                            />
                        </button>
                        {#if show_menu}
                            <div
                                class="flex flex-col absolute top-16 right-14 bg-white rounded-lg"
                            >
                                <a
                                    href="/portfolio"
                                    class="flex flex-row space-x-2 p-4 hover:bg-gray-200 rounded-t-lg"
                                >
                                    <img src="portfolio.svg" alt="portfolio" />
                                    <p>Porfolio</p>
                                </a>
                                <!-- <a
                                    href="/settings"
                                    class="flex flex-row space-x-2 p-4 hover:bg-gray-200"
                                >
                                    <img src="gear.svg" alt="settings" />
                                    <p>Settings</p>
                                </a> -->
                                <button
                                    on:click={logout}
                                    class="flex flex-row space-x-2 p-4 hover:bg-gray-200 rounded-b-lg"
                                >
                                    <img src="logout.svg" alt="logout" />
                                    <p>Logout</p>
                                </button>
                            </div>
                        {/if}
                    {/if}
                    {#if !profile_image}
                        <button on:click={() => (show_menu = !show_menu)}
                            ><img
                                src="blank-profile.png"
                                alt=""
                                class="rounded-full"
                                width="40"
                            /></button
                        >
                    {/if}
                {/if}
                {#if !show_profile}
                    <a
                        href="/signup"
                        class="bg-[#9ecd67] rounded-full p-2 flex"
                    >
                        Sign Up <img src="chevron-right.svg" alt="" />
                    </a>
                {/if}
            </div>
        </div>
    </div>

    <slot></slot>
</div>

<style>
    .background::before,
    .background::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

    .background::before {
        width: 300px;
        height: 300px;
        top: -100px;
        left: -100px;
        background: #8bc34a;
    }

    .background::after {
        width: 400px;
        height: 400px;
        bottom: -150px;
        right: -150px;
        background: #ffeb3b;
    }
</style>
