<script lang="ts">
    export let is_open = false;
    let show_spinner = true;
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
                        Here are some activites we recommend you do!
                    </h2>
                    <h3 class="text-[#5A655E] text-sm">To complete the sign up process just fill in the form below!</h3>
                </div>
            </div>
        {/if}
    </div>
{/if}
