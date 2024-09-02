<script lang="ts">
    import type { LoginUser } from "$lib/types/user";
    import { login } from "$lib/firebase/login";
    import { is_auth_error } from "$lib/type_checks";
    import { goto } from "$app/navigation";
    import SignUpModal from "$lib/components/SignUpModal.svelte";
    import GoogleSignUpModal from "$lib/components/GoogleSignUpModal.svelte";

    import "./style.css";
    import { onMount } from "svelte";
    import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
    import type { CredentialResponse } from "$lib/types/credentials";
    import { firebase_auth } from "$lib/firebase/firebase_app";

    let animation_active = false;
    let show_sign_in_error = false;
    let show_sign_up_error = false;
    let show_spinner = false;
    let show_sign_up_modal = false;
    let show_google_sign_up_modal = false;
    let is_signing_up = false;

    let sign_in_error_message = "";
    let sign_up_error_message = "";
    let spinner_title = "Loading...";
    let spinner_subtitle = "Please wait...";

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let login_user: LoginUser = {
        email: "",
        password: "",
    };

    let sign_up_user = {
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
    };

    function toggle_animation() {
        animation_active = !animation_active;
        is_signing_up = !is_signing_up;
    }

    function hande_login() {
        show_sign_in_error = false;

        if (!login_user.email || !login_user.password) {
            show_sign_in_error = true;
            sign_in_error_message = "Please fill in all fields.";
            return;
        }

        if (!email_regex.test(login_user.email)) {
            show_sign_in_error = true;
            sign_in_error_message = "Invalid Email Address";
            return;
        }

        if (login_user.password.length < 6) {
            show_sign_in_error = true;
            sign_in_error_message = "Password must be at least 6 characters";
            return;
        }

        show_spinner = true;
        spinner_title = "Signing You In...";
        spinner_subtitle = "Please wait while we sign you in.";

        login(login_user.email, login_user.password).then((response) => {
            if (is_auth_error(response)) {
                show_sign_in_error = true;
                show_spinner = false;
                sign_in_error_message = response.message;

                return;
            } else {
                show_spinner = false;
                goto("/");
            }
        });
    }

    function handle_google_auth(response: CredentialResponse) {
        const credential = GoogleAuthProvider.credential(response.credential);
        if (is_signing_up) {
            signInWithCredential(firebase_auth, credential)
                .then((result) => {
                    const user = result.user;

                    sign_up_user.email = user.email!;
                    sign_up_user.first_name = user.displayName!.split(" ")[0];
                    sign_up_user.last_name = user.displayName!.split(" ")[1];
                    show_google_sign_up_modal = true;
                })
                .catch((error) => {
                    show_sign_up_error = true;
                    sign_up_error_message = error.message;
                });
        } else {
            signInWithCredential(firebase_auth, credential)
                .then((result) => {
                    const user = result.user;
                    firebase_auth.updateCurrentUser(user).then(() => {
                        window.location.href = "/";
                    });
                })
                .catch((error) => {
                    show_sign_in_error = true;
                    sign_in_error_message = error.message;
                });
        }
    }

    function open_sign_up_modal() {
        show_sign_up_error = false;
        if (!sign_up_user.first_name || !sign_up_user.last_name || !sign_up_user.email) {
            show_sign_up_error = true;
            sign_up_error_message = "Please fill in all fields.";
            return;
        }

        show_sign_up_modal = true;
    }

    onMount(() => {
        (<any>window).google.accounts.id.initialize({
            client_id: "162926619471-rdurosn21b96ur002q4vqqmd8uuauqvd",
            callback: handle_google_auth,
        });
        (<any>window).google.accounts.id.renderButton(document.getElementById("google_login_button"), {
            theme: "outline",
            size: "large",
            text: "sign_up",
            shape: "pill",
            logo_alignment: "left",
            width: 200,
            height: 100,
            longtitle: true,
            use_fedcm_for_prompt: false,
        });
        (<any>window).google.accounts.id.renderButton(document.getElementById("google_signup_button"), {
            theme: "outline",
            size: "large",
            text: "sign_up",
            shape: "pill",
            logo_alignment: "left",
            width: 200,
            height: 100,
            longtitle: true,
            use_fedcm_for_prompt: false,
        });
        (<any>window).google.accounts.id.prompt();
    });
</script>

<svelte:head>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <title>ECPeazy Login</title>
</svelte:head>

<SignUpModal
    is_open={show_sign_up_modal}
    on_close={() => (show_sign_up_modal = false)}
    first_name={sign_up_user.first_name}
    middle_name={sign_up_user.middle_name}
    last_name={sign_up_user.last_name}
    email={sign_up_user.email}
/>

<GoogleSignUpModal 
    is_open={show_google_sign_up_modal}
    on_close={() => (show_google_sign_up_modal = false)}
    first_name={sign_up_user.first_name}
    middle_name={sign_up_user.middle_name}
    last_name={sign_up_user.last_name}
    email={sign_up_user.email}
/>

<main class="bg-[#FFFCF1] flex items-center justify-center flex-col h-screen">
    {#if show_spinner}
        <div class="flex-col gap-4 w-full flex items-center justify-center">
            <div
                class="w-28 h-28 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
            >
                <div
                    class="w-24 h-24 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
            </div>
            <h1 class="text-2xl font-bold text-[#5A655E]">{spinner_title}</h1>
            <p class="text-[#5A655E]">{spinner_subtitle}</p>
        </div>
    {:else}
        <div
            class="container bg-[#FFE8A3] rounded-3xl shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px]"
            class:active={animation_active}
        >
            <div
                class="form-container sign-up absolute top-0 left-0 h-full w-1/2 opacity-0 z-10 {animation_active
                    ? 'animate-move'
                    : ''}"
            >
                <form class="bg-[#FFE8A3] flex items-center justify-center flex-col px-10 h-full">
                    <h1 class="text-[#5A655E] text-2xl font-bold mb-4">Create Account</h1>
                    <span class="text-sm mb-4">Register with E-mail</span>
                    <input
                        type="text"
                        placeholder="First Name"
                        class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none"
                        bind:value={sign_up_user.first_name}
                    />
                    <input
                        type="text"
                        placeholder="Middle Name"
                        class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none"
                        bind:value={sign_up_user.middle_name}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none"
                        bind:value={sign_up_user.last_name}
                    />
                    <input
                        type="email"
                        placeholder="Enter E-mail"
                        class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none"
                        bind:value={sign_up_user.email}
                    />
                    {#if show_sign_up_error}
                        <p class="text-red-500 text-sm my-2">{sign_up_error_message}</p>
                    {/if}
                    <button
                        class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-2 uppercase"
                        on:click={open_sign_up_modal}>Sign Up</button
                    >
                    <button
                        id="google_signup_button"
                        class="text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-2 uppercase"
                    ></button>
                </form>
            </div>

            <div class="form-container sign-in absolute top-0 left-0 h-full w-1/2 z-20">
                <form class="bg-[#FFE8A3] flex items-center justify-center flex-col px-10 h-full">
                    <h1 class="text-[#5A655E] text-2xl font-bold mb-4">Sign In</h1>
                    <span class="text-sm mb-4">Login With Email & Password</span>
                    <input
                        type="email"
                        placeholder="Enter E-mail"
                        class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none"
                        bind:value={login_user.email}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none"
                        bind:value={login_user.password}
                    />
                    {#if show_sign_in_error}
                        <p class="text-red-500 text-sm my-2">{sign_in_error_message}</p>
                    {/if}
                    <button class="text-[#5A655E] text-sm my-4">Forget Password?</button>
                    <button
                        class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-2 uppercase"
                        on:click={hande_login}>Sign In</button
                    >
                    <button
                        id="google_login_button"
                        class="text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-2 uppercase"
                    >
                    </button>
                </form>
            </div>

            <div class="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden rounded-3xl z-20">
                <div class="toggle bg-[#5A655E] text-white h-full relative left-[-100%] w-[200%]">
                    <div
                        class="toggle-panel toggle-left absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 translate-x-[-200%]"
                    >
                        <h1 class="text-3xl font-bold mb-4">Welcome To <br />ECPeazy</h1>
                        <p class="text-sm mb-4">Already have an account?</p>
                        <button
                            on:click={toggle_animation}
                            class="bg-transparent border border-white text-white px-8 py-2 rounded-md uppercase"
                            >Sign In</button
                        >
                    </div>
                    <div
                        class="toggle-panel toggle-right absolute right-0 w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0"
                    >
                        <h1 class="text-3xl font-bold mb-4">Welcome to <br /> ECPeazy</h1>
                        <p class="text-sm mb-4">Don't have an account?</p>
                        <button
                            on:click={toggle_animation}
                            class="bg-transparent border border-white text-white px-8 py-2 rounded-md uppercase"
                            >Sign Up</button
                        >
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>
