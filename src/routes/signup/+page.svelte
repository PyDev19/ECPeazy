<script lang="ts">
    import { type SignUpUser } from "$lib/types/user";
    import { sign_up } from "$lib/firebase/sign_up";
    import BusyIndicator from "$lib/components/BusyIndicator.svelte";
    import { is_auth_error } from "$lib/type_checks";
    import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
    import { firebase_auth } from "$lib/firebase/firebase_app";
    import { type CredentialResponse } from "$lib/types/credentials";
    import { onMount } from "svelte";

    let user: SignUpUser = {
        first_name: "",
        middle_name: "",
        last_name: "",
        school: "",
        age: "",
        graduation_year: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    let first_name_input: HTMLInputElement;
    let last_name_input: HTMLInputElement;
    let school_input: HTMLInputElement;
    let age_input: HTMLInputElement;
    let graduation_year_input: HTMLInputElement;

    let username_input: HTMLInputElement;
    let email_input: HTMLInputElement;
    let password_input: HTMLInputElement;
    let confirm_password_input: HTMLInputElement;

    let step = 0;
    let show_error = false;
    let show_indicator = false;

    let message = "";
    let modal_message = "Signing up...";

    function next() {
        if (step < 1) {
            const inputs = [
                first_name_input,
                last_name_input,
                school_input,
                age_input,
                graduation_year_input,
            ];
            let has_error = false;
            show_error = false;

            inputs.forEach((input) => {
                if (!input.value) {
                    input.style.border = "1px solid red";
                    has_error = true;
                } else {
                    input.style.border = "1px solid #ccc";
                }
            });

            if (has_error) {
                show_error = true;
                return;
            }

            step++;
        }
    }

    function previous() {
        if (step > 0) {
            step--;
        }
    }

    function submit() {
        show_indicator = true;
        const inputs = [
            username_input,
            email_input,
            password_input,
            confirm_password_input,
        ];
        let has_error = false;
        show_error = false;

        inputs.forEach((input) => {
            if (!input.value) {
                input.style.border = "1px solid red";
                has_error = true;
            } else {
                input.style.border = "1px solid #ccc";
            }
        });

        if (has_error) {
            show_error = true;
            return;
        }

        // Password validation
        const password_regex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!password_regex.test(user.password)) {
            message =
                "Password must contain at least 8 characters, including uppercase, lowercase, and numbers.";
            show_error = true;
            return;
        }

        // Email validation
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_regex.test(user.email)) {
            message = "Invalid email address.";
            show_error = true;
            return;
        }

        // Confirm password validation
        if (user.password !== user.confirm_password) {
            message = "Passwords do not match.";
            show_error = true;
            return;
        }

        // Submit form
        sign_up(user).then((result) => {
            show_indicator = false;
            if (is_auth_error(result)) {
                show_error = true;
                message = result.message;
            } else {
                firebase_auth.signOut();
                window.location.href = "/login";
            }
        });
    }

    function handle_google_auth(response: CredentialResponse) {
        const credential = GoogleAuthProvider.credential(response.credential);

        signInWithCredential(firebase_auth, credential).then((result) => {
            firebase_auth.signOut();
            window.location.href = "/login";
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

<BusyIndicator show={show_indicator} message={modal_message} />

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h1 class="text-[3em] text-[#FFEB3B] m-0">Sign Up</h1>

        <div class="transition-container">
            <div
                class="form-content"
                style="transform: translateX(-{step * 100}%);"
            >
                <div class="form-slide">
                    <form class="space-y-2">
                        <div class="flex flex-row space-x-2">
                            <input
                                bind:value={user.first_name}
                                bind:this={first_name_input}
                                placeholder="First Name"
                                class="p-2 rounded-lg signup-input flex-1"
                                name="first_name"
                            />
                            <input
                                bind:value={user.middle_name}
                                placeholder="Middle Name (Optional)"
                                class="p-2 rounded-lg signup-input flex-1"
                                name="middle_name"
                            />
                            <input
                                bind:value={user.last_name}
                                bind:this={last_name_input}
                                placeholder="Last Name"
                                class="p-2 rounded-lg signup-input flex-1"
                                name="last_name"
                            />
                        </div>
                        <input
                            bind:value={user.school}
                            bind:this={school_input}
                            placeholder="School Name"
                            class="p-2 rounded-lg signup-input"
                            name="school"
                        />
                        <input
                            type="number"
                            bind:value={user.age}
                            bind:this={age_input}
                            placeholder="Your Age"
                            class="p-2 rounded-lg signup-input"
                            min="0"
                            name="age"
                        />
                        <input
                            type="number"
                            bind:value={user.graduation_year}
                            bind:this={graduation_year_input}
                            placeholder="Expected Graduation Year"
                            class="p-2 rounded-lg signup-input"
                            min="0"
                            name="graduation_year"
                        />
                        {#if show_error}
                            <p class="text-red-500">
                                Please fill out all the required fields.
                            </p>
                        {/if}
                        <div class="flex flex-col space-y-2">
                            <button
                                type="button"
                                class="p-2 rounded-lg bg-blue-500 text-white max-w-[200px] mx-auto"
                                on:click={next}>Next</button
                            >
                            <div id="google_button" class="mx-auto"></div>
                            <p class="text-gray-500 font-bold">
                                Already have an account?
                            </p>
                            <a
                                href="/login"
                                class="p-2 rounded-lg bg-blue-500 text-white max-w-[200px] mx-auto"
                                >Login</a
                            >
                        </div>
                    </form>
                </div>
                <div class="form-slide">
                    <form class="space-y-2">
                        <input
                            bind:value={user.username}
                            bind:this={username_input}
                            placeholder="Username"
                            class="p-2 rounded-lg signup-input"
                            autocomplete="username"
                        />
                        <input
                            type="email"
                            name="email"
                            autocomplete="email"
                            bind:value={user.email}
                            bind:this={email_input}
                            placeholder="Email"
                            class="p-2 rounded-lg signup-input"
                            min="0"
                        />
                        <input
                            type="password"
                            name="password"
                            autocomplete="new-password"
                            bind:value={user.password}
                            bind:this={password_input}
                            placeholder="Password"
                            class="p-2 rounded-lg signup-input"
                        />
                        <input
                            type="password"
                            name="confirm_password"
                            autocomplete="new-password"
                            bind:value={user.confirm_password}
                            bind:this={confirm_password_input}
                            placeholder="Confirm Password"
                            class="p-2 rounded-lg signup-input"
                        />
                        {#if show_error}
                            <p class="text-red-500">{message}</p>
                        {/if}
                        <div
                            class="flex flex-row space-x-2 justify-center items-center"
                        >
                            <button
                                type="button"
                                class="p-2 rounded-lg bg-blue-500 text-white"
                                on:click={previous}>Previous</button
                            >
                            <button
                                type="button"
                                class="p-2 rounded-lg bg-blue-500 text-white"
                                on:click={submit}>Submit</button
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .signup-input {
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
    }

    .transition-container {
        position: relative;
        overflow: hidden;
        height: auto;
    }

    .form-content {
        display: flex;
        transition: transform 0.5s ease-in-out;
    }

    .form-slide {
        flex: 1;
        min-width: 100%;
        box-sizing: border-box;
    }
</style>
