<script lang="ts">
    import { onAuthStateChanged, type User } from "firebase/auth";
    import { firebase_auth, firebase_firestore } from "$lib/firebase/firebase_app";
    import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import { get_all_ecs } from "$lib/firebase/get_all_ecs";
    import type { EC, Portfolio } from "$lib/types/database";
    import BusyIndicator from "$lib/components/BusyIndicator.svelte";

    let user: User | null = null;
    let first_name = "";
    let last_name = "";
    let middle_name = "";
    let show_modal = false;
    let show_recommendation = false;

    let selected_activity = "";
    let description = "";

    let cache_ecs: { data: EC[] } = { data: [] };
    let portfolio: any[] = [];

    let show_indicator = false;
    let modal_message = "Getting Recommendations...";

    let recommendation: EC[] = [];

    onMount(() => {
        onAuthStateChanged(firebase_auth, (_user) => {
            if (!_user) {
                window.location.href = "/login";
            } else {
                user = _user;

                getDoc(doc(firebase_firestore, "Users", user.uid))
                    .then((doc) => {
                        if (doc.exists()) {
                            const data = doc.data();
                            if (data) {
                                first_name = data.first_name;
                                last_name = data.last_name;
                                middle_name = data.middle_name;
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting document:", error);
                    });

                getDoc(doc(firebase_firestore, "Portfolios", user.uid)).then((doc) => {
                    if (doc.exists()) {
                        const activities = doc.data()["activities"] || [];
                        portfolio = [...activities];
                    } else {
                        console.log("No such document!");
                    }
                });
            }
        });

        let cache_ecs_string = localStorage.getItem("ECs");
        if (cache_ecs_string) {
            cache_ecs = JSON.parse(cache_ecs_string);
        } else {
            get_all_ecs().then((results) => {
                if (results instanceof Array && results.length > 0) {
                    cache_ecs = { data: results };
                    localStorage.setItem("ECs", JSON.stringify({ data: results }));
                } else {
                    cache_ecs = { data: [] };
                }
            });
        }
    });

    function close_modal() {
        show_modal = false;
        selected_activity = "";
        description = "";
    }

    function handle_submit() {
        console.log("Selected Activity:", selected_activity);
        console.log("Description:", description);

        const portfolio_doc = doc(firebase_firestore, "Portfolios", user?.uid);
        updateDoc(portfolio_doc, {
            activities: arrayUnion({
                activity: selected_activity,
                description: description,
            }),
        });

        portfolio = [
            ...portfolio,
            {
                activity: selected_activity,
                description: description,
            },
        ];

        close_modal();
    }

    function get_image_url(activityName: string) {
        const ec = cache_ecs.data.find((ec) => ec.name === activityName);
        return ec ? ec.image : "path/to/placeholder.jpg";
    }

    async function get_recommendations() {
        show_indicator = true;
        modal_message = "Getting Recommendations...";

        let url = "https://pydev19.pythonanywhere.com/recommend?user_id=" + user?.uid;
        console.log("URL:", url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                recommendation = data;
                show_indicator = false;
                modal_message = "";
                show_recommendation = true;
            })
            .catch(error => {
                console.error('Error:', error);
                show_indicator = false;
                modal_message = "";
            });
    }
</script>

<svelte:head>
    <title>Your Portfolio</title>
</svelte:head>

{#if show_modal}
    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <div class="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
            <div class="bg-gray-600 p-8 rounded shadow-lg max-w-md w-full z-50">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex flex-col">
                        <h2 class="text-lg font-semibold text-white">Add Activity</h2>
                        <h3 class="text-md text-gray-500">Add an activity and describe what it does</h3>
                    </div>
                    <button class="text-white hover:text-gray-700" on:click={close_modal}>
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
                <form on:submit|preventDefault={handle_submit}>
                    <div class="mb-4">
                        <label for="activity" class="block text-sm font-medium text-gray-300">Select Activity:</label>
                        <select
                            id="activity"
                            class="text-xl p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            bind:value={selected_activity}
                        >
                            {#each cache_ecs.data as ec}
                                <option value={ec.name}>{ec.name}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="description" class="block text-sm font-medium text-gray-300">Description:</label>
                        <textarea
                            id="description"
                            rows="5"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            bind:value={description}
                        ></textarea>
                    </div>

                    <div class="flex justify-end">
                        <button
                            type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
{/if}

{#if show_recommendation}
<div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
        <div class="bg-gray-600 p-8 rounded shadow-lg max-w-md w-full z-50">
            <div class="flex justify-between items-center mb-4">
                <div class="flex flex-col">
                    <h2 class="text-lg font-semibold text-white">Recommendations</h2>
                    <h3 class="text-md text-gray-500">Here are some activities you can add to your portfolio</h3>
                </div>
                <button class="text-white hover:text-gray-700" on:click={() => (show_recommendation = false)}>
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            <div class="flex flex-col space-y-5">
                {#each recommendation as activity}
                    <a href={activity.website}>
                        <div class="bg-white rounded-lg p-2 flex flex-row justify-between items-center rec-item">
                            <div class="flex flex-col">
                                <h3 class="text-lg font-semibold text-gray-800">{activity.name}</h3>
                            </div>
                            <img src={activity.image} alt={activity.name} class="w-20" />
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>
{/if}

<BusyIndicator show={show_indicator} message={modal_message} />

<div class="mt-5 flex flex-row items-start w-[90%] mx-auto p-5 rounded-lg">
    <div class="flex flex-col space-y-5">
        <div class="flex flex-col items-center bg-white shadow-lg p-5 rounded-lg">
            <img
                src={user?.photoURL || "blank-profile.png"}
                alt="Profile"
                class="w-40 h-40 object-cover rounded-lg mb-4 shadow-md"
            />
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
                {user?.displayName}
            </h2>
            <p class="text-lg text-gray-600">
                {first_name}
                {middle_name}
                {last_name}
            </p>
        </div>
        <button class='bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600' on:click={() => {
            get_recommendations();
        }}>
            Get ECs Recommendation
        </button>
    </div>
    
    <div class="flex flex-col flex-grow justify-center ml-8 text-xl space-y-5">
        {#each portfolio as activity}
            <div class="bg-white rounded-lg p-2 flex flex-row justify-between items-center">
                <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-800">{activity.activity}</h3>
                    <p class="text-gray-600">{activity.description}</p>
                </div>
                <img src={get_image_url(activity.activity)} alt={activity.activity} class="w-20" />
            </div>
        {/each}

        <button
            class="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none w-full"
            on:click={() => (show_modal = true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M10 2a1 1 0 00-1 1v6H3a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
            </svg>
            Add Activity
        </button>
    </div>
</div>

<style>
    .rec-item:hover {
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }
</style>