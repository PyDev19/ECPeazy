<script lang="ts">
    import { accordion } from "$lib/accordion";

    let member_name = "Atharva Mishra";
    let member_position = "Full Stack Developer";
    let member_story = "";
    let story_visible = false;
    let prev_story = "";
    let current_story = "";

    async function show_story(name: string) {
        prev_story = current_story;
        current_story = name;

        if (story_visible) {
            story_visible = false;
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        member_name = name;
        switch (name) {
            case "Tharun Sevvel":
                member_position = "Lead AI Developer / Co-Founder";
                break;
            case "Yafi Rahman":
                member_position = "Head of Design / Co-Founder";
                break;
            case "Atharva Mishra":
                member_position = "Full Stack Developer / Head Developer";
                break;
            case "Sai Sasank Achanta":
                member_position = "Media Lead / Marketer";
                break;
        }

        if (prev_story === current_story) {
            story_visible = false;
            return;
        }

        story_visible = true;
    }
</script>

<svelte:head>
    <title>About Us</title>
</svelte:head>

<section class="h-full flex flex-col justify-center items-center">
    <div class="opacity-bg p-5 rounded-lg text-center w-[90%]">
        <h2 class="text-2xl md:text-4xl font-bold text-center mb-5">
            Our <span
                class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
                >Story</span
            >
        </h2>
        <p class="text-gray-700 text-center mb-3 text-sm md:text-base">
            Highschool often comes with a lot of worry, especially about college
            and making friends. This project came about as a possible solution
            to this stress. Clubs, competitions, and new oppurtinies are all
            things that we had to ask friends for, but now, anyone can find this
            information for free! We hope you can save yourself some stress and
            find from EC's easily!
        </p>
    </div>
</section>
<section class="h-full flex flex-col justify-center items-center">
    <div class="opacity-bg p-5 rounded-lg text-center w-[90%]">
        <h2 class="text-2xl md:text-4xl font-bold text-center mb-5">
            Meet the <span
                class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
                >Team</span
            >
        </h2>
        <div
            class="flex flex-col md:flex-row justify-center items-center gap-6 mb-5"
        >
            <button
                class="flex flex-col items-center hover-effect-btn"
                on:click={() => show_story("Tharun Sevvel")}
            >
                <img
                    src="tharun_lost.jpg"
                    alt="Tharun's Profile"
                    class="w-32 h-32 rounded-full mb-5 hover-effect"
                />
                <h3 class="text-lg font-bold">Tharun Sevvel</h3>
            </button>
            <button
                class="flex flex-col items-center hover-effect-btn"
                on:click={() => show_story("Yafi Rahman")}
            >
                <img
                    src="yafizest1.jpg"
                    alt="Yafis Profile"
                    class="w-32 h-32 rounded-full mb-5 hover-effect"
                />
                <h3 class="text-lg font-bold">Yafi Rahman</h3>
            </button>
            <button
                class="flex flex-col items-center hover-effect-btn"
                on:click={() => show_story("Atharva Mishra")}
            >
                <img
                    src="AtharvaMishra.jpg"
                    alt="Atharva's Profile"
                    class="w-32 h-32 rounded-full mb-5 hover-effect"
                />
                <h3 class="text-lg font-bold">Atharva Mishra</h3>
            </button>
            <button
                class="flex flex-col items-center hover-effect-btn"
                on:click={() => show_story("Sai Achanta")}
            >
                <img
                    src="saiFreaky.jpg"
                    alt="Sai's Profile"
                    class="w-32 h-32 rounded-full mb-5 hover-effect"
                />
                <h3 class="text-lg font-bold">Sai Achanta</h3>
            </button>
        </div>

        <div
            use:accordion={story_visible}
            class="w-4/5 flex flex-col items-center mx-auto rounded-lg bg-white feature story animate-story"
        >
            <h1
                class="text-[2em] font-semibold bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
            >
                {member_name}
            </h1>
            <h2 class="text-base md:text-xl font-bold text-center">
                {member_position}
            </h2>
            <p class="text-gray-700 text-center mb-5 text-sm md:text-base">
                {member_story}
            </p>
        </div>
    </div>
</section>

<style>
    .story {
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .hover-effect-btn:hover .hover-effect {
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }
</style>
