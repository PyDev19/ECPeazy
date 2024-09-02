<script lang="ts">
    import { slide } from "svelte/transition";
    import type { SignUpUser } from "$lib/types/user";
    import { sign_up } from "$lib/firebase/sign_up";
    import { is_auth_error } from "$lib/type_checks";
    import { goto } from "$app/navigation";

    export let is_open: boolean;
    export let on_close: () => void;
    export let first_name: string;
    export let middle_name: string;
    export let last_name: string;
    export let email: string;

    let show_spinner = false;

    let current_page = 1;

    let show_error = false;
    let error_message = "";
    
    let sign_up_user: SignUpUser = {
        grade: "",
        email: email,
        first_name: first_name,
        last_name: last_name,
        middle_name: middle_name,
        password: "",
        school: "",
        graduation_year: "",
        confirm_password: "",
        username: "",
        major_1: "",
        major_2: "",
    };

    function handle_sign_up() {
        if (sign_up_user.username === "" || sign_up_user.password === "" || sign_up_user.confirm_password === "") {
            show_error = true;
            error_message = "Please fill out all fields.";
            return;
        } else {
            show_error = false;
        }

        if (sign_up_user.password.length < 8) {
            show_error = true;
            error_message = "Password must be at least 8 characters long.";
            return;
        } else {
            show_error = false;
        }

        if (sign_up_user.password !== sign_up_user.confirm_password) {
            show_error = true;
            error_message = "Passwords do not match.";
            return;
        } else {
            show_error = false;
        }

        show_spinner = true;
        sign_up(sign_up_user).then((result) => {
            show_spinner = false;

            if (is_auth_error(result)) {
                show_error = true;
                error_message = result.message;
            } else {
                goto("/portfolio/" + result.uid);
            }
        });
    }

    function next_page() {
        if (sign_up_user.school === "" || sign_up_user.grade === "" || sign_up_user.graduation_year === "") {
            show_error = true;
            error_message = "Please fill out all fields.";
            return;
        } else {
            show_error = false;
        }

        if (current_page < 3) {
            current_page++;
        }
    }

    function previous_page() {
        if (current_page > 1) {
            current_page--;
        }
    }

    function close() {
        current_page = 1;
        on_close();
    }
</script>

{#if is_open}
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {#if show_spinner}
            <div
                class="modal-content bg-[#FFE8A3] rounded-lg shadow-lg p-8 w-[500px] max-w-full relative overflow-hidden"
            >
                <div class="flex-col gap-4 w-full flex items-center justify-center">
                    <div
                        class="w-28 h-28 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                    >
                        <div
                            class="w-24 h-24 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                        ></div>
                    </div>
                    <h1 class="text-2xl font-bold text-[#5A655E]">Signing you up...</h1>
                    <p class="text-[#5A655E]">Please wait until we complete your sign up process</p>
                </div>
            </div>
        {:else}
            <div
                class="modal-content bg-[#FFE8A3] rounded-lg shadow-lg p-8 w-[500px] max-w-full relative overflow-hidden"
            >
                <button class="absolute top-2 right-2 text-[#5A655E] text-xl" on:click={close}> &CircleTimes; </button>
                <div class="flex flex-col justify-center items-center space-y-2 mb-4">
                    <h2 class="text-[#5A655E] text-2xl font-bold justify-center items-center">
                        Welcome, {first_name}
                        {last_name}!
                    </h2>
                    <h3 class="text-[#5A655E] text-sm">To complete the sign up process just fill in the form below!</h3>
                </div>

                <div class="relative h-auto overflow-hidden">
                    {#if current_page === 1}
                        <form class="flex flex-col" transition:slide={{ duration: 300, axis: "y" }}>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="School"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                bind:value={sign_up_user.school}
                            />
                            <select
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4 bg-white"
                                name="grade"
                                bind:value={sign_up_user.grade}
                            >
                                <option value="">Select Grade</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                            </select>
                            <input
                                type="date"
                                name="graduation_year"
                                placeholder="Graduation Date"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                bind:value={sign_up_user.graduation_year}
                            />
                            {#if show_error}
                                <div class="flex justify-center">
                                    <p class="text-red-500 text-sm text-center">{error_message}</p>
                                </div>
                            {/if}
                            <button
                                class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-4 uppercase w-full"
                                type="button"
                                on:click={next_page}
                            >
                                Next
                            </button>
                        </form>
                    {/if}

                    {#if current_page === 2}
                        <form
                            class="flex flex-col"
                            transition:slide={{ duration: 300, axis: "y" }}
                            id="sign-up-form"
                            name="sign-up"
                        >
                            <input
                                type="text"
                                name="major 1"
                                placeholder="First major of interest"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                bind:value={sign_up_user.major_1}
                            />
                            <input
                                type="text"
                                name="major 2"
                                placeholder="Second major of interest"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                bind:value={sign_up_user.major_2}
                            />
                            {#if show_error}
                                <div class="flex justify-center">
                                    <p class="text-red-500 text-sm text-center">{error_message}</p>
                                </div>
                            {/if}
                            <div class="flex justify-between mt-4">
                                <button
                                    class="bg-[#5A655E] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider uppercase w-[48%]"
                                    type="button"
                                    on:click={previous_page}
                                >
                                    Previous
                                </button>
                                <button
                                    class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider uppercase w-[48%]"
                                    type="submit"
                                    on:click={next_page}
                                >
                                    Next Page
                                </button>
                            </div>
                        </form>
                    {/if}

                    {#if current_page === 3}
                        <form
                            class="flex flex-col"
                            transition:slide={{ duration: 300, axis: "y" }}
                            id="sign-up-form"
                            name="sign-up"
                        >
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                autocomplete="username"
                                bind:value={sign_up_user.username}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                autocomplete="new-password"
                                bind:value={sign_up_user.password}
                            />
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4"
                                autocomplete="new-password"
                                bind:value={sign_up_user.confirm_password}
                            />
                            {#if show_error}
                                <div class="flex justify-center">
                                    <p class="text-red-500 text-sm text-center">{error_message}</p>
                                </div>
                            {/if}
                            <div class="flex justify-between mt-4">
                                <button
                                    class="bg-[#5A655E] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider uppercase w-[48%]"
                                    type="button"
                                    on:click={previous_page}
                                >
                                    Previous
                                </button>
                                <button
                                    class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider uppercase w-[48%]"
                                    type="submit"
                                    on:click={handle_sign_up}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
{/if}

<style>
    .modal-overlay {
        backdrop-filter: blur(4px);
    }

    .modal-content {
        overflow: hidden;
    }
</style>
