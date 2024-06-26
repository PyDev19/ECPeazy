<script lang="ts">
    import type { GoogleUser } from "$lib/types/user";
    import { google_sign_up_complete } from "$lib/firebase/sign_up";
    import { onAuthStateChanged } from "firebase/auth";
    import { firebase_auth } from "$lib/firebase/firebase_app";

    let user: GoogleUser = {
        first_name: "",
        middle_name: "",
        last_name: "",
        username: "",
        school: "",
        age: "",
        graduation_year: "",
    };

    onAuthStateChanged(firebase_auth, (result) => {
        if (!result) {
            // window.location.href = "/signup";
            console.log("No user")
        } else {
            console.log("User exists")
            user.username = result.displayName || "";
        }
    });

    let first_name_input: HTMLInputElement;
    let last_name_input: HTMLInputElement;
    let username_input: HTMLInputElement;
    let school_input: HTMLInputElement;
    let age_input: HTMLInputElement;
    let graduation_year_input: HTMLInputElement;

    let show_error = false;
    let message = "";

    function finish() {
        const inputs = [
            first_name_input,
            last_name_input,
            school_input,
            username_input,
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
            message = "Please fill out all the required fields.";
            return;
        }

        google_sign_up_complete(user);
    }
</script>

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h1 class="text-[3em] text-[#FFEB3B] m-0">Finish Signing Up with Google</h1>
        <p class="text-md text-gray-500 mb-2">You're almost there! Just a few more details to complete your account.</p>

        <div class="transition-container">
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
                        bind:value={user.username}
                        bind:this={username_input}
                        placeholder="Username"
                        class="p-2 rounded-lg signup-input flex-1"
                        name="username"
                    />
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
                        <p class="text-red-500">Please fill out all the required fields.</p>
                    {/if}
                    <button
                        type="button"
                        class="p-2 rounded-lg bg-blue-500 text-white max-w-[200px] mx-auto"
                        on:click={finish}>Finish</button
                    >
                </form>
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

    .form-slide {
        flex: 1;
        min-width: 100%;
        box-sizing: border-box;
    }
</style>
