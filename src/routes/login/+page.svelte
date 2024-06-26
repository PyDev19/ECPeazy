<script lang="ts">
    import { type LoginUser } from "$lib/types/user";
    import BusyIndicator from "$lib/components/BusyIndicator.svelte";
    import { login } from "$lib/firebase/login"
    import {is_auth_error} from "$lib/type_checks";
    import { onMount } from "svelte";
    import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
    import { firebase_auth } from "$lib/firebase/firebase_app";
    import { type CredentialResponse } from "$lib/types/credentials";

    let user: LoginUser = {
        credential: "",
        password: ""
    };

    let show_error = false;
    let show_modal = false;

    let message = "";
    let modal_message = "Logging in...";

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function activate_login() {
        if (!user.credential || !user.password) {
            show_error = true;
            message = "Please fill in all fields.";
            return;
        } else if (!email_regex.test(user.credential))  {
            show_error = true;
            message = "Please enter a valid e-mail address.";
            return;
        }

        show_modal = true;
        show_error = false;
        message = "";

        login(user.credential, user.password).then((result) => {
            if (is_auth_error(result)) {
                show_error = true;
                message = result.message;
                show_modal = false;

                return;
            } else {
                show_modal = false;
                window.location.href = "/";
            }
        }).catch((error) => {
            console.log("Unknow error occured")
        });
    }

    function handle_google_auth(response: CredentialResponse) {
        const credential = GoogleAuthProvider.credential(response.credential);

        signInWithCredential(firebase_auth, credential).then((result) => {
            const user = result.user;
            firebase_auth.updateCurrentUser(user);
            window.location.href = "/home";
        }).catch((error) => {
            console.log(error);
        });
    }

    onMount(() => {
        (<any>window).google.accounts.id.initialize({
            client_id: "162926619471-rdurosn21b96ur002q4vqqmd8uuauqvd",
            callback: handle_google_auth,
        });
        (<any>window).google.accounts.id.renderButton(
            document.getElementById("google_button"),
            {
                theme: "outline",
                size: "large",
                text: "sign_up",
                shape: "pill",
                logo_alignment: "left",
                width: 200,
                height: 100,
                longtitle: true,
                use_fedcm_for_prompt: false,
            }
        );
        (<any>window).google.accounts.id.prompt();
    });
</script>

<BusyIndicator show={show_modal} message={modal_message} />

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h1 class="text-[3em] text-[#FFEB3B] m-0">Log In</h1>

        <form class="flex flex-col space-y-2 justify-center rounded-lg">
            <input
                bind:value={user.credential}
                placeholder="E-mail"
                class="p-2 rounded-lg signup-input"
                autocomplete="email"
                type="email"
            />
            <input
                bind:value={user.password}
                placeholder="Password"
                class="p-2 rounded-lg signup-input"
                autocomplete="current-password"
                type="password"
            />
            {#if show_error}
                <p class="text-red-500">{message}</p>
            {/if}
            <button
                type="button"
                class="p-2 rounded-lg bg-blue-500 text-white justify-center items-center max-w-[50%] mx-auto"
                on:click={activate_login}>Log In</button
            >
            <div id="google_button" class="mx-auto"></div>
            <p class="text-gray-500 font-bold">
                Don't have an account?
            </p>
            <a
                href="/signup"
                class="p-2 rounded-lg bg-blue-500 text-white max-w-[200px] mx-auto"
                >Sign Up</a
            >
        </form>
    </div>
</section>

<style>
    .signup-input {
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
    }
</style>
