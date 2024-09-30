<script lang="ts">
    import type { EC } from "$lib/types/database";
    import { onMount } from 'svelte';

    export let is_open = false;
    export let uid = "";
    let show_spinner = false;
    let recommendations: EC[] = [];

    const recommendation_url = "https://pydev19.pythonanywhere.com/recommend?user_id=" + uid;

    function close() {
        is_open = false;
    }

    async function get_recommendations() {
        show_spinner = true;
        try {
            const response = await fetch(recommendation_url);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            const data = await response.json();
            console.log(data);
            recommendations = data;
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            show_spinner = false;
        }
    }

    $: if (is_open) {
        get_recommendations();
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
                    <h1 class="text-2xl font-bold text-[#5A655E]">Getting Recommendations</h1>
                    <p class="text-[#5A655E]">Please wait until our AI recommends some activites for you to do!</p>
                </div>
            </div>
        {:else}
            <div
                class="modal-content bg-[#FFE8A3] rounded-lg shadow-lg p-8 w-[500px] max-w-full relative overflow-hidden"
            >
                <button class="absolute top-2 right-2 text-[#5A655E] text-xl" on:click={close}> &CircleTimes; </button>
                <div class="flex flex-col justify-center items-center space-y-2 mb-4">
                    <h2 class="text-[#5A655E] text-2xl font-bold justify-center items-center">
                        Here are some activites we recommend you do!
                    </h2>
                    <p class="text-[#5A655E] text-lg text-center">
                        These activities are based on your interests and the activities you have already done.
                    </p>
                    <div class="flex flex-col space-y-4">
                        {#each recommendations as rec}
                            <a href={rec.website}>
                                <div class="bg-[#E6E6E6] p-4 rounded-lg shadow-xl hover-effect mx-auto flex-grow w-full hover-effect">
                                    <h1 class="text-xl font-bold text-center">{rec.name}</h1>
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </div>
{/if}


<style>
    .hover-effect:hover {
        transform: scale(1.05);
        transition: transform 0.2s;
    }
</style>
