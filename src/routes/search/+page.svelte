<script lang="ts">
    import { onMount } from 'svelte';
    import { keyword_search } from '$lib/search';
    import { writable } from 'svelte/store';
    import type { EC } from '$lib/types/database';
    import { get_all_ecs } from '$lib/firebase/get_all_ecs';
    import { FirestoreError } from 'firebase/firestore';
    
    const query = writable('');
    const keyword_search_results = writable<EC[]>([]);
    const no_results = writable(false);
    let error: FirestoreError;

    get_all_ecs().then(results => {
        if (results instanceof Array && results.length > 0) {
            keyword_search_results.set(results);
        } else {
            keyword_search_results.set([]);
        }
    });
    
    onMount(() => {
        query.subscribe(value => {
            keyword_search(value).then(results => {
                if (results instanceof Array && results.length > 0) {
                    keyword_search_results.set(results);
                    no_results.set(false);
                } else if (results === false) {
                    no_results.set(true);
                } else {
                    keyword_search_results.set([]);
                    no_results.set(false);
                    error = results as FirestoreError;
                }
            })
        });
    });
</script>

<main class="h-full flex flex-col justify-center items-center font-sans">
    <div class="p-5 rounded-lg justify-center items-center text-center w-[90%] flex flex-col">
        <input bind:value={$query} placeholder="Start Typing to Search!" class="w-[90%] p-4 text-center rounded-lg text-2xl"/>
        <div class="opacity-bg w-[90%] mt-5 p-5 rounded-lg flex flex-col space-y-2 overflow-y-auto">
            {#each $keyword_search_results as result}
                <div class="p-3 border-gray-200 text-left bg-white rounded-lg flex flex-row space-x-3">
                    <img src={result.image} alt="{result.name} image" class="w-12 my-auto"/>
                    <h2 class="text-2xl my-auto">{result.name}</h2>
                </div>
            {/each}
        </div>
    </div>
</main>