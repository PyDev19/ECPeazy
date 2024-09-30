<script lang="ts">
    import { onMount } from "svelte";
    import { keyword_search } from "$lib/search";
    import { writable, derived } from "svelte/store";
    import type { EC } from "$lib/types/database";
    import { get_all_ecs } from "$lib/firebase/get_all_ecs";
    import NavBar from "$lib/components/NavBar.svelte";
    import FilterDropdown from "$lib/components/FilterDropdown.svelte";

    // Filter dropdown options
    let grade_options = ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "All Grades"];
    let activity_type_options = [
        "Nonprofit Organization",
        "Business Corporation",
        "Government Agency",
        "Educational Institution",
        "Academic Program",
    ];
    let time_commitment_options = ["Short-Term", "Long-Term"];
    let team_individual_options = ["Team", "Individual", "Both Individual + Team"];
    let skill_level_options = ["Beginner", "Intermediate", "Advanced", "All Skill Levels"];
    let activity_location_options = ["Global/Worldwide", "East Coast (USA)", "Mid West (USA)", "West Coast (USA)", "Only USA"];
    let activity_category_options = [
        "Community Service",
        "Academic Research",
        "Competition",
        "Club",
        "Pre-College Program",
    ];

    // Stores to track the selected filter options
    const selected_grade = writable("");
    const selected_type = writable("");
    const selected_time_commitment = writable("");
    const selected_team_individual = writable("");
    const selected_skill_level = writable("");
    const selected_location = writable("");
    const selected_category = writable("");

    const query = writable("");
    const keyword_search_results = writable<EC[]>([]);
    const no_results = writable(false);

    const filtered_ecs = derived(
        [
            keyword_search_results,
            selected_grade,
            selected_type,
            selected_time_commitment,
            selected_team_individual,
            selected_skill_level,
            selected_location,
            selected_category,
        ],
        ([
            $keyword_search_results,
            $selected_grade,
            $selected_type,
            $selected_time_commitment,
            $selected_team_individual,
            $selected_skill_level,
            $selected_location,
            $selected_category,
        ]) => {
            return $keyword_search_results.filter((ec) => {
                return (
                    (!$selected_grade || $selected_grade === "All Grades" || ec.grades.includes($selected_grade.split('t')[0])) &&
                    (!$selected_type || ec.org_types.includes($selected_type)) &&
                    (!$selected_time_commitment || ec.time_commitment === $selected_time_commitment) &&
                    (!$selected_team_individual || ec.team_individual === $selected_team_individual) &&
                    (!$selected_skill_level ||
                        $selected_skill_level === "All Skill Levels" ||
                        ec.skill_levels.includes($selected_skill_level)) &&
                    (!$selected_location || ec.locations.includes($selected_location)) &&
                    (!$selected_category || ec.categories.includes($selected_category))
                );
            });
        },
    );

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
                    localStorage.setItem("ECs", JSON.stringify({ data: results }));
                } else {
                    keyword_search_results.set([]);
                }
            });
        }

        query.subscribe((value) => {
            if (value === "") {
                keyword_search_results.update((results) =>
                    results.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" })),
                );
            } else {
                keyword_search(value, cache_ecs.data).then((results) => {
                    if (results instanceof Array && results.length > 0) {
                        keyword_search_results.set(results);
                        no_results.set(false);
                    } else if (results === false) {
                        no_results.set(true);
                    }
                });
            }
        });

        console.log($keyword_search_results);
        console.log($filtered_ecs);
    });

    filtered_ecs.subscribe((value) => {
        console.log(value);
    });
</script>

<main class="w-full min-h-screen bg-[#FFFCF1]">
    <NavBar></NavBar>

    <div class="grid grid-cols-4 gap-4 h-screen justify-center items-center mx-5">
        <!-- Filters Column -->
        <div class="col-span-1 flex flex-col">
            <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-lg mb-4 flex flex-row justify-between hover-effect">
                <h2 class="text-2xl font-bold my-auto">Filters</h2>
            </div>

            <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-lg space-y-4 h-[500px] overflow-auto">
                <FilterDropdown title="Grades" options={grade_options} bind:selected={$selected_grade} />
                <FilterDropdown title="Activity Type" options={activity_type_options} bind:selected={$selected_type} />
                <FilterDropdown
                    title="Time Commitment"
                    options={time_commitment_options}
                    bind:selected={$selected_time_commitment}
                />
                <FilterDropdown
                    title="Team/Individual"
                    options={team_individual_options}
                    bind:selected={$selected_team_individual}
                />
                <FilterDropdown
                    title="Skill Level"
                    options={skill_level_options}
                    bind:selected={$selected_skill_level}
                />
                <FilterDropdown
                    title="Activity Location"
                    options={activity_location_options}
                    bind:selected={$selected_location}
                />
                <FilterDropdown
                    title="Activity Category"
                    options={activity_category_options}
                    bind:selected={$selected_category}
                />
            </div>
        </div>

        <!-- Search Results Column -->
        <div class="col-span-3 flex flex-col">
            <div class="mb-4">
                <input
                    type="text"
                    placeholder="Search for EC"
                    class="w-full p-3 border border-gray-300 rounded-lg"
                    bind:value={$query}
                />
            </div>

            <div class="h-[500px] overflow-auto flex flex-col space-y-4">
                {#if $filtered_ecs.length === 0}
                    <p class="text-center text-xl">No results found</p>
                {:else}
                    {#each $filtered_ecs as ec}
                        <a
                            class="p-10 bg-[#E6E6E6] text-left rounded-lg flex flex-row space-x-3 hover-effect mx-7"
                            href={ec.website}
                        >
                            <img src={ec.image} alt="{ec.name} image" class="w-52 my-auto" />
                            <div class="flex flex-col space-y-5">
                                <h2 class="text-4xl my-auto">{ec.name}</h2>
                                <p class="text-lg">{ec.description}</p>
                            </div>
                        </a>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .hover-effect:hover {
        transform: scale(1.025);
        transition: transform 0.2s;
    }

    .hover-effect:not(:hover) {
        transform: scale(1);
        transition: transform 0.2s;
    }
</style>
