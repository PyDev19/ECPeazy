<script lang="ts">
    export let show_spinner = false;
</script>

{#if show_spinner}
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="modal-content bg-[#FFE8A3] rounded-lg shadow-lg p-8 w-[500px] max-w-full relative overflow-hidden">
            <div class="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    class="w-28 h-28 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                >
                    <div
                        class="w-24 h-24 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                    ></div>
                </div>
            </div>
        </div>
    </div>
{/if}
