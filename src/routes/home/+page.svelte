<script lang="ts">
    import { firebase_auth } from "$lib/firebase/firebase_app";
    import { onAuthStateChanged } from "firebase/auth";
    import Carousel from "$lib/components/Carousel.svelte";
    import { onMount } from "svelte";

    let rec_div: HTMLElement | null = null;

    let username = "";
    onAuthStateChanged(firebase_auth, (user) => {
        if (user) {
            username = user.displayName || "";
        }
    });

    let recommendations = [
        {
            name: "USACO",
            difficulty: "Hard",
        },
        {
            name: "Google Code Jam",
            difficulty: "Medium",
        },
        {
            name: "Codeforces",
            difficulty: "Medium",
        },
        {
            name: "AtCoder",
            difficulty: "Medium",
        },
        {
            name: "LeetCode",
            difficulty: "Medium",
        },
        {
            name: "HackerRank",
            difficulty: "Easy",
        },
        {
            name: "CodeChef",
            difficulty: "Easy",
        },
        {
            name: "TopCoder",
            difficulty: "Medium",
        },
        {
            name: "Kick Start",
            difficulty: "Easy",
        },
        {
            name: "HackerEarth",
            difficulty: "Easy",
        },
    ];
    let carouselItems: string[] = [
        "<img src='image1.jpg' alt='Image 1' />",
        "<img src='image2.jpg' alt='Image 2' />",
        "<img src='image3.jpg' alt='Image 3' />",
    ];

    onMount(() => {
        onAuthStateChanged(firebase_auth, (user) => {
            if (!user) {
                window.location.href = "/login";
            }
        });
    });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h2 class="text-[3em] m-0">
            Welcome <span
                class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
                >{username}</span
            >
        </h2>
        <p class="text-gray-500 text-md mb-2">
            Welcome to your one stop spot for finding ECs
        </p>
        <Carousel interval={3000} items={carouselItems}></Carousel>
    </div>
</section>

