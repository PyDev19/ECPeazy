<script>
    export let is_open = false;
    export let show_spinner = false;
    export let activites;
    export let uid;

    let activity = "";
    let custom_activity = "";
    let description = "";
    let grade = "";

    function add_activity() {
        
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
                <div class="flex flex-col justify-center items-center space-y-2 mb-4">
                    <h2 class="text-[#5A655E] text-2xl font-bold justify-center items-center">
                        Add an Activity to Your Portfolio!
                    </h2>
                    <h3 class="text-[#5A655E] text-sm">
                        Fill in the information below to add an activity to your portfolio!
                    </h3>
                </div>

                <div class="relative h-auto overflow-hidden">
                    <form class="flex flex-col">
                        <select
                            class="border border-[#5A655E] rounded-md px-4 py-2 mb-4 bg-white"
                            name="activity"
                            bind:value={activity}
                        >
                            <option value="" disabled selected>
                                Select an activity
                            </option>
                            <option value="custom">Custom</option>
                            {#each activites.data as act}
                                <option value={act.name}>{act.name}</option>
                            {/each}
                        </select>
                        {#if activity === "custom"}
                            <input
                                type="text"
                                class="border border-[#5A655E] rounded-md px-4 py-2 mb-4 bg-white"
                                placeholder="Name of the activity"
                                bind:value={custom_activity}
                            />
                        {/if}
                        <input
                            type="text"
                            class="border border-[#5A655E] rounded-md px-4 py-2 mb-4 bg-white"
                            placeholder="Description"
                            bind:value={description}
                        />
                        <select
                            class="border border-[#5A655E] rounded-md px-4 py-2 mb-4 bg-white"
                            name="grade"
                            bind:value={grade}
                        >
                            <option value="" disabled selected>
                                Which grade did you do the activity in
                            </option>
                            <option value="9th Grade">9th Grade</option>
                            <option value="10th Grade">10th Grade</option>
                            <option value="11th Grade">11th Grade</option>
                            <option value="12th Grade">12th Grade</option>
                        </select>
                    </form>
                </div>
            </div>
        {/if}
    </div>
{/if}
