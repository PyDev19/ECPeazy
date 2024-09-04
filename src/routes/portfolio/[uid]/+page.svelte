<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import PortfolioModal from "$lib/components/PortfolioModal.svelte";
    import { get_all_ecs } from "$lib/firebase/get_all_ecs";
    import { onMount } from "svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
    let user = data.user;
    let user_data = data.user_data!;
    let activities = data.activities;
    let uid = data.uid;

    let cache_ecs = { data: [] };

    let modal_open = false;
    let recommendation_modal_open = false;

    const recommendation_url = "https://pydev19.pythonanywhere.com/recommend?user_id=" + uid;

    onMount(() => {
        let cache_ecs_string = localStorage.getItem("ECs");
        if (cache_ecs_string) {
            cache_ecs = JSON.parse(cache_ecs_string);
        } else {
            get_all_ecs().then((results) => {
                if (results instanceof Array && results.length > 0) {
                    localStorage.setItem("ECs", JSON.stringify({ data: results }));
                }
            });
        }
    });

    function activity_added(event: CustomEvent) {
        activities.push(event.detail);
        activities = activities;
    }

    function get_recommendations() {
        recommendation_modal_open = true;
    }

    console.log(user?.photoURL);
</script>

<svelte:head>
    <title>Your Portfolio</title>
</svelte:head>

<PortfolioModal 
    bind:is_open={modal_open}
    activites={cache_ecs}
    uid={user?.uid}
    on:activity_added={activity_added}
/>

<main class="w-full min-h-screen bg-[#FFFCF1]">
    <NavBar />

    <div class="grid grid-cols-4 gap-4 h-screen justify-center items-center mx-5">
        <div class="col-span-1 flex flex-col items-center">
            <div class="bg-white p-4 rounded-full shadow-xl mb-4 flex justify-between hover-effect">
                {#if user?.photoURL === undefined}
                    <img src="/blank-profile.png" alt="Profile Pic" class="rounded-full" width="175" />
                {:else}
                    <img src={user?.photoURL} alt="Profile Pic" class="rounded-full" width="175" />
                {/if}
            </div>
            <div class="space-y-3 w-full">
                <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full hover-effect">
                    <h1 class="text-xl font-bold text-center">
                        {user_data.first_name}
                        {user_data.middle_name}
                        {user_data.last_name}
                    </h1>
                </div>
                <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full hover-effect">
                    <h1 class="text-xl font-bold text-center">{user_data.grade} Grade</h1>
                </div>
                <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full hover-effect">
                    <h1 class="text-xl font-bold text-center">First major:<br />{user_data.major_1}</h1>
                </div>
                <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full hover-effect">
                    <h1 class="text-xl font-bold text-center">Second major:<br />{user_data.major_2}</h1>
                </div>
                {#if activities.length > 0}
                    <button class="bg-[#0D99FF] cursor-pointer p-4 rounded-lg shadow-xl w-full mt-4 hover-effect">
                        <h1 class="text-xl font-bold text-center text-white">Get Recommendations</h1>
                    </button>
                {/if}
            </div>
        </div>
        <div class="col-span-3 flex flex-col items-center">
            <div class="grid grid-cols-3 gap-4 w-full mt-4">
                {#if activities.length === 0}
                    <div class="col-span-3 flex flex-col gap-4 w-full">
                        <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full">
                            <h1 class="text-xl font-bold text-center">No activities found</h1>
                        </div>
                        <button
                            class="bg-[#0D99FF] cursor-pointer p-4 rounded-lg shadow-xl w-full hover-effect"
                            on:click={() => (modal_open = true)}
                        >
                            <h1 class="text-xl font-bold text-center text-white">Add Activity</h1>
                        </button>
                    </div>
                {:else}
                    <div class="col-span-3 flex flex-col gap-4 w-full">
                        <div class="overflow-y-auto space-y-2 max-h-[500px]">
                            {#each activities as activity, index (index)}
                                <div
                                    class="p-5 bg-[#E6E6E6] text-left rounded-lg flex flex-row space-x-3 hover-effect mx-7"
                                >
                                    <img src={activity.image} alt="{activity.activity} image" class="w-40 my-auto" />
                                    <div class="flex flex-col space-y-3 my-auto">
                                        <h2 class="text-4xl">{activity.activity}</h2>
                                        <p class="text-lg">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <button
                            class="bg-[#0D99FF] cursor-pointer p-4 rounded-lg shadow-xl w-full hover-effect"
                            on:click={() => (modal_open = true)}
                        >
                            <h1 class="text-xl font-bold text-center text-white">Add Activity</h1>
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .hover-effect:hover {
        transform: scale(1.05);
        transition: transform 0.2s;
    }
</style>
