<script lang="ts">
    import { onMount } from "svelte";
    import { keyword_search, filter_ecs } from "$lib/search";
    import { writable } from "svelte/store";
    import type { EC } from "$lib/types/database";
    import { get_all_ecs } from "$lib/firebase/get_all_ecs";
    import Drawer from "svelte-drawer-component";

    let open = false;
    let grades_drop_down_open = false;
    let org_drop_down_open = false;
    let category_drop_down_open = false;

    const query = writable("");
    const keyword_search_results = writable<EC[]>([]);
    const no_results = writable(false);

    let grades: string[] = [];
    let organization_type: string[] = [];
    let categories: string[] = [];
    let locations: string[] = [];
    let skill_levels: string[] = [];
    let subjects: string[] = [];
    let team_individual: string = "";
    let time_commitment: string = "";

    let cache_ecs: { data: EC[] } = { data: [] };

    onMount(() => {
        let cache_ecs_string = localStorage.getItem("ECs");
        if (cache_ecs_string) {
            cache_ecs = JSON.parse(cache_ecs_string);
            keyword_search_results.set(cache_ecs.data);
        } else {
            get_all_ecs().then((results) => {
                if (results instanceof Array && results.length > 0) {
                    keyword_search_results.set(results);
                    localStorage.setItem(
                        "ECs",
                        JSON.stringify({ data: results }),
                    );
                } else {
                    keyword_search_results.set([]);
                }
            });
        }

        $keyword_search_results.sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
                sensitivity: "base",
            }),
        );

        query.subscribe((value) => {
            console.log(value);
            if (value == "") {
                keyword_search_results.update((value) => {
                    return value.sort((a, b) =>
                        a.name.localeCompare(b.name, undefined, {
                            sensitivity: "base",
                        }),
                    );
                });
            } else {
                keyword_search(value, $keyword_search_results).then(
                    (results) => {
                        if (results instanceof Array && results.length > 0) {
                            keyword_search_results.set(results);
                            no_results.set(false);
                        } else if (results === false) {
                            no_results.set(true);
                        }
                    },
                );
            }
        });
    });

    function toggle_dropdown(name: string) {
        if (name.toLowerCase() == "grades") {
            grades_drop_down_open = !grades_drop_down_open;
        } else if (name.toLowerCase() == "org") {
            org_drop_down_open = !org_drop_down_open;
        } else if (name.toLowerCase() == "category") {
            category_drop_down_open = !category_drop_down_open;
        }
    }

    function add_item(value: string, arr: string[]) {
        if (arr.includes(value)) {
            arr = arr.filter((g) => g !== value);
        } else {
            arr.push(value);
        }
        keyword_search_results.set(
            filter_ecs(
                cache_ecs.data,
                grades,
                categories,
                locations,
                organization_type,
                skill_levels,
                subjects,
                team_individual,
                time_commitment,
            ),
        );
    }
</script>

<svelte:head>
    <title>Find ECs</title>
</svelte:head>

<div class="filters">
    <Drawer {open} size="600px" on:clickAway={() => (open = false)}>
        <div class="flex flex-col items-center mt-5">
            <h1 class="text-3xl font-bold">Filters</h1>
            <h2 class="text-lg text-gray-500">
                Use these to search ECs faster!
            </h2>

            <div class="mt-2 flex flex-col w-[90%]">
                <div
                    class="relative flex items-center justify-center flex-col mt-5"
                >
                    <button
                        class="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
                        on:click={() => toggle_dropdown("grades")}
                        >Grades</button
                    >
                    {#if grades_drop_down_open}
                        <div
                            class="mt-2 w-full bg-white border border-gray-300 rounded shadow-lg flex-col flex text-black"
                        >
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() => add_item("9", grades)}
                                />
                                9th Grade
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() => add_item("10", grades)}
                                />
                                10th Grade
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() => add_item("11", grades)}
                                />
                                11th Grade
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() => add_item("12", grades)}
                                />
                                12th Grade
                            </label>
                        </div>
                    {/if}

                    <button
                        class="mt-5 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
                        on:click={() => toggle_dropdown("org")}
                        >Organization Type</button
                    >
                    {#if org_drop_down_open}
                        <div
                            class="mt-2 w-full bg-white border border-gray-300 rounded shadow-lg flex-col flex text-black"
                        >
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Nonprofit Organization",
                                            organization_type,
                                        )}
                                />
                                Nonprofit Organization
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Business Enterprise",
                                            organization_type,
                                        )}
                                />
                                Business Enterprise
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Government Agency",
                                            organization_type,
                                        )}
                                />
                                Government Agency
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Educational Institution",
                                            organization_type,
                                        )}
                                />
                                Educational Institution
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Academic Program",
                                            organization_type,
                                        )}
                                />
                                Academic Program
                            </label>
                        </div>
                    {/if}

                    <button
                        class="mt-5 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
                        on:click={() => toggle_dropdown("category")}
                        >Categories</button
                    >
                    {#if category_drop_down_open}
                        <div
                            class="mt-2 w-full bg-white border border-gray-300 rounded shadow-lg flex-col flex text-black"
                        >
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Community Service",
                                            categories,
                                        )}
                                />
                                Community Service
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Academic Research",
                                            categories,
                                        )}
                                />
                                Academic Research
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item("Competition", categories)}
                                />
                                Competition
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item("Club", categories)}
                                />
                                Club
                            </label>
                            <label
                                class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() =>
                                        add_item(
                                            "Pre-College Program",
                                            categories,
                                        )}
                                />
                                Pre-College Program
                            </label>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </Drawer>
</div>

<main class="h-full flex flex-col justify-center items-center font-sans m-0">
    <button class="left-wall-button" on:click={() => (open = true)}>
        <div class="arrow flex flex-row space-x-5">
            Filters <img
                src="chevron-right.svg"
                alt="Arrow right"
                class="text-white"
            />
        </div>
    </button>
    <div
        class="p-5 rounded-lg justify-center items-center text-center w-[90%] flex flex-col"
    >
        <input
            bind:value={$query}
            placeholder="Start Typing to Search!"
            class="w-[90%] p-4 text-center rounded-lg text-2xl"
        />
        <div
            class="opacity-bg w-[90%] mt-5 p-5 rounded-lg flex flex-col space-y-2 overflow-y-auto max-h-[500px]"
        >
            {#each $keyword_search_results as result}
                <a
                    class="p-3 border-gray-200 text-left bg-white rounded-lg flex flex-row space-x-3"
                    href={result.website}
                >
                    <img
                        src={result.image}
                        alt="{result.name} image"
                        class="w-40 my-auto"
                    />
                    <div class="flex flex-row">
                        <div class="flex flex-col">
                            <h2 class="text-2xl my-auto">{result.name}</h2>
                            <p>
                                {result.description}
                            </p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</main>

<style>
    .left-wall-button {
        position: absolute;
        left: 0;
        transform: translateY(-50%);
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .left-wall-button .arrow {
        font-size: 20px;
    }

    .left-wall-button:hover {
        background-color: #0056b3;
    }

    .filters :global(.drawer .overlay) {
        background: rgba(100, 100, 100, 0.5);
    }

    .filters :global(.drawer .panel) {
        background: hsl(100, 20%, 10%);
        color: white;
    }
</style>
