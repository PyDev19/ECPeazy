<!-- Carousel.svelte -->

<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { writable, type Writable, type Readable  } from "svelte/store";

    interface CarouselProps {
        items: string[];
        interval?: number;
    }

    let currentIndex: Writable<number>;
    let intervalId: ReturnType<typeof setInterval>;

    export let items: string[];
    export let interval: number = 5000;

    function startCarousel() {
        intervalId = setInterval(() => {
            currentIndex.update((index) => (index + 1) % items.length);
        }, interval);
    }

    function goToSlide(index: number) {
        clearInterval(intervalId);
        currentIndex.set(index);
        startCarousel();
    }

    function nextSlide() {
        currentIndex.update((index) => (index + 1) % items.length);
    }

    function prevSlide() {
        currentIndex.update((index) => (index - 1 + items.length) % items.length);
    }

    onMount(() => {
        currentIndex = writable(0);
        startCarousel();

        return () => {
            clearInterval(intervalId);
        };
    });
</script>

<div class="carousel">
    {#each items as item, index}
        <div class="slide" style="transform: translateX({(index - $currentIndex) * 100}%)">
            {item}
        </div>
    {/each}

    <button on:click={prevSlide}>Previous</button>
    <button on:click={nextSlide}>Next</button>
</div>

<style>
    .carousel {
        display: flex;
        overflow: hidden;
        position: relative;
    }

    .slide {
        flex: 0 0 100%;
        transition: transform 0.5s ease;
    }
</style>
