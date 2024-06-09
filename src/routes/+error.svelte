<script lang="ts">
    import { page } from "$app/stores";
    $: status = $page.status || "Default Status";
    $: message = $page.error?.message || "Default Message";
</script>

<section class="h-full flex flex-col justify-center items-center">
    <div
        class="bg-white p-5 rounded-lg text-center opacity-80 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]"
    >
        <h1 class="text-[3em] m-0 tagline">{status}</h1>
        <h2 class="text-lg m-0">{message}</h2>
    </div>
</section>

<style>
    .tagline {
        background-image: linear-gradient(
            to bottom,
            rgb(185 28 28),
            rgb(248 113 113)
        );
        background-clip: text;
        color: transparent;
        -webkit-background-clip: text;
    }
</style>
