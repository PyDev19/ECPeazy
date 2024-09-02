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

    let cache_ecs = { data: [] };

    let modal_open = false;

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
        activities = [...activities, event.detail];
    }
</script>

<svelte:head>
    <title>Your Portfolio</title>
</svelte:head>

<PortfolioModal is_open={modal_open} activites={cache_ecs} uid={user?.uid} on:activity_added={activity_added} />

<main class="w-full min-h-screen bg-[#FFFCF1]">
    <NavBar />

    <div class="grid grid-cols-4 gap-4 h-screen justify-center items-center mx-5">
        <div class="col-span-1 flex flex-col items-center">
            <div class="bg-white p-4 rounded-full shadow-xl mb-4 flex justify-between hover-effect">
                {#if user?.photoURL === ""}
                    <img src="blank-profile.png" alt="Profile Pic" class="rounded-full" width="175" />
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
                <button class="bg-[#0D99FF] cursor-pointer p-4 rounded-lg shadow-xl w-full mt-4 hover-effect">
                    <h1 class="text-xl font-bold text-center text-white">Get Recommendations</h1>
                </button>
            </div>
        </div>
        <div class="col-span-3 flex flex-col items-center">
            <div class="grid grid-cols-3 gap-4 w-full mt-4">
                {#if activities.length === 0}
                    <div class="col-span-3 flex flex-col gap-4 w-full">
                        <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full">
                            <h1 class="text-xl font-bold text-center">No activities found</h1>
                        </div>
                        <button class="bg-[#0D99FF] cursor-pointer p-4 rounded-lg shadow-xl w-full hover-effect" on:click={() => modal_open = true}>
                            <h1 class="text-xl font-bold text-center text-white">Add Activity</h1>
                        </button>
                    </div>
                {:else}
                    {#each activities as activity}
                        <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-xl w-full hover-effect col-span-3">
                            <h1 class="text-xl font-bold text-center">{activity.activity}</h1>
                            <h2 class="text-lg font-bold text-center">{activity.description}</h2>
                        </div>
                    {/each}
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
