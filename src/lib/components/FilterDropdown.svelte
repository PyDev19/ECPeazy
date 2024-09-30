<script lang="ts">
    export let title: string;
    export let is_open = false;
    export let options: string[] = [];
    export let use_checkboxes = false;
    export let selected: string = ""; // Selected value for the dropdown

    // Toggles the dropdown open or closed
    let toggle_dropdown = () => {
        is_open = !is_open;
    };

    // Update the selected option when a radio button is clicked
    let selectOption = (option: string) => {
        selected = option;
    };
</script>

<!-- Dropdown Button -->
<button 
    class="flex flex-row w-full border-2 rounded-lg border-black p-2 space-x-4"
    on:click={toggle_dropdown}
>
    {#if is_open}
        <img src="chevron-down.svg" alt="Filter" class="w-5 h-5 my-auto" />
    {:else}
        <img src="chevron-right.svg" alt="Filter" class="w-5 h-5 my-auto" />
    {/if}
    <h2 class="text-2xl my-auto">{title}</h2>
</button>

<!-- Dropdown Menu -->
{#if is_open}
    <div class="flex flex-col w-full border-2 border-black rounded-lg py-2 space-y-2">
        {#each options as option, index}
            <label class="flex items-center text-lg ml-2">
                {#if use_checkboxes}
                    <input type="checkbox" name="option" value="{option}" id="option-{index}">
                {:else}
                    <input 
                        type="radio" 
                        name="{title}" 
                        value="{option}" 
                        id="option-{option}-{index}" 
                        checked={selected === option}
                        on:change={() => selectOption(option)}
                    >
                {/if}
                <span class="ml-2">{option}</span>
            </label>
        {/each}
    </div>
{/if}
