<script lang="ts">
    import { onMount } from "svelte";
    import { keyword_search, filter_ecs } from "$lib/search";
    import { writable } from "svelte/store";
    import type { EC } from "$lib/types/database";
    import { get_all_ecs } from "$lib/firebase/get_all_ecs";
    import NavBar from "$lib/components/NavBar.svelte";
    import FilterDropdown from "$lib/components/FilterDropdown.svelte";

    let grades_drop_down_open = false;
    let grade_options = ["9th Grade", "10th Grade", "11th Grade", "12th Grade", "All Grades"];

    let activity_format_drop_down_open = false;
    let activity_format_options = ["In-Person", "Remote", "Hybrid"];

    let activite_type_drop_down_open = false;
    let activity_type_options = [
        "Non-Profit",
        "Business",
        "Government Agency",
        "Educational Institution",
        "Academic Program",
    ];

    let time_commitment_drop_down_open = false;
    let time_commitment_options = ["Short Term", "Long Term"];

    let team_individual_drop_down_open = false;
    let team_individual_options = ["Team", "Individual"];

    let skill_level_drop_down_open = false;
    let skill_level_options = ["Beginner", "Intermediate", "Advanced", "All Skill Levels"];

    let activity_location_drop_down_open = false;
    let activity_location_options = ["Global", "USA East", "USA West", "USA Central", "All Over USA"];

    let activity_category_drop_down_open = false;
    let activity_category_options = [
        "Volunteering",
        "Academic Research",
        "Competitions",
        "Club",
        "Pre-College Program",
    ];

    const query = writable("");
    const keyword_search_results = writable<EC[]>([]);
    const no_results = writable(false);

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
                keyword_search(value, $keyword_search_results).then((results) => {
                    if (results instanceof Array && results.length > 0) {
                        keyword_search_results.set(results);
                        no_results.set(false);
                    } else if (results === false) {
                        no_results.set(true);
                    }
                });
            }
        });
    });
</script>

<svelte:head>
    <title>Find ECs</title>
</svelte:head>

<main class="w-full min-h-screen bg-[#FFFCF1]">
    <NavBar></NavBar>

    <div class="grid grid-cols-4 gap-4 h-screen justify-center items-center mx-5">
        <div class="col-span-1 flex flex-col">
            <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-lg mb-4 flex flex-row justify-between hover-effect">
                <h2 class="text-2xl font-bold my-auto">Filters</h2>
                <img src="gear.svg" alt="filters" class="w-5 h-5 my-auto" />
            </div>

            <div class="bg-[#FFE8A3] p-4 rounded-lg shadow-lg space-y-4 h-[500px] overflow-auto">
                <FilterDropdown
                    title="Grades"
                    is_open={grades_drop_down_open}
                    options={grade_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Activity Format"
                    is_open={activity_format_drop_down_open}
                    options={activity_format_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Activity Type"
                    is_open={activite_type_drop_down_open}
                    options={activity_type_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Time Commitment"
                    is_open={time_commitment_drop_down_open}
                    options={time_commitment_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Team/Individual"
                    is_open={team_individual_drop_down_open}
                    options={team_individual_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Skill Level"
                    is_open={skill_level_drop_down_open}
                    options={skill_level_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Activity Location"
                    is_open={activity_location_drop_down_open}
                    options={activity_location_options}
                    use_checkboxes={false}
                />
                <FilterDropdown
                    title="Activity Category"
                    is_open={activity_category_drop_down_open}
                    options={activity_category_options}
                    use_checkboxes={false}
                />
            </div>
        </div>

        <div class="col-span-3 flex flex-col">
            <div class="mb-4">
                <input type="text" placeholder="Search for EC" class="w-full p-3 border border-gray-300 rounded-lg" bind:value={$query} />
            </div>

            <div class="h-[500px] overflow-auto flex flex-col space-y-4">
                {#each $keyword_search_results as ec}
                    <a
                        class="p-10 bg-[#E6E6E6] text-left rounded-lg flex flex-row space-x-3 hover-effect mx-7"
                        href={ec.website}
                    >
                        <img src={ec.image} alt="{ec.name} image" class="w-52 my-auto" />
                        <div class="flex flex-col space-y-5">
                            <h2 class="text-4xl my-auto">{ec.name}</h2>
                            <p class="text-lg">
                                {ec.description}
                            </p>
                        </div>
                    </a>
                {/each}
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
