<script lang="ts">
    import { slide } from "svelte/transition";
    import type { SignUpUser } from "$lib/types/user";
    import { goto } from "$app/navigation";
    import { updateProfile } from "firebase/auth";
    import { firebase_auth, firebase_firestore } from "$lib/firebase/firebase.app";
    import { doc, setDoc } from "firebase/firestore";

    export let is_open: boolean;
    export let on_close: () => void;
    export let first_name: string;
    export let middle_name: string;
    export let last_name: string;
    export let email: string;

    let current_page = 1;

    let show_error = false;
    let show_spinner = false;
    let error_message = "";

    let sign_up_user: SignUpUser = {
        grade: "",
        email,
        first_name,
        last_name,
        middle_name,
        password: "",
        school: "",
        graduation_year: "",
        confirm_password: "",
        username: "",
        major_1: "",
        major_2: "",
    };

    async function handle_sign_up() {
        console.log(first_name, last_name, middle_name, email);
        const current_user = firebase_auth.currentUser;

        show_spinner = true;
        if (sign_up_user.school === "" || sign_up_user.grade === "" || sign_up_user.graduation_year === "") {
            show_error = true;
            show_spinner = false;
            error_message = "Please fill out all fields.";
            return;
        } else {
            show_error = false;
        }

        updateProfile(current_user!, {
            displayName: `${first_name} ${last_name}`,
        })
            .then(() => {
                console.log("User profile updated successfully");
            })
            .catch((error) => {
                console.log(error);
            });
        
        const portfolio_doc_ref = doc(firebase_firestore, "Portfolios", current_user!.uid);
        setDoc(portfolio_doc_ref, {
            activities: [],
        }).then(() => {
            console.log("Portfolio document created successfully");
        }).catch((error) => {
            console.log(error);
            show_spinner = false;
            show_error = true;
            error_message = error.message;
        });

        const user_doc_ref = doc(firebase_firestore, "Users", current_user!.uid);
        setDoc(user_doc_ref, {
            username: `${first_name} ${last_name}`,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            school: sign_up_user.school,
            grade: sign_up_user.grade,
            graduation_year: sign_up_user.graduation_year,
            major_1: sign_up_user.major_1,
            major_2: sign_up_user.major_2,
            email: email,
        }).then(() => {
            console.log("User document created successfully");
            show_spinner = false;
            goto("/portfolio/" + current_user!.uid);
        }).catch((error) => {
            console.log(error);
            show_spinner = false;
            show_error = true;
            error_message = error.message;
        });
    }

    function next() {
        current_page += 1;
    }

    function previous() {
        current_page -= 1;
    }

    function close() {
        current_page = 1;

        let sign_up_user: SignUpUser = {
            grade: "",
            email: "",
            first_name: "",
            last_name: "",
            middle_name: "",
            password: "",
            school: "",
            graduation_year: "",
            confirm_password: "",
            username: "",
            major_1: "",
            major_2: "",
        };
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
                <h2 class="text-[#5A655E] text-2xl font-bold mb-4 justify-center items-center">
                    Welcome, {first_name}
                    {last_name}!
                </h2>

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
                                on:click={next}
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
                                    on:click={previous}
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
