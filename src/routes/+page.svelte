<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="w-full h-full bg-[#FFFCF1]">
    <NavBar></NavBar>

    <div class="h-screen flex justify-center items-center">
        <div class="bg-[#FFE8A3] w-full flex flex-row p-10 space-x-10">
            <h1 class="text-[#5A655E] text-8xl font-bold">Your Gateway to Exciting Extracurricular Opportunities.</h1>
            <div class="flex flex-col my-auto space-y-5">
                <h2 class="text-[#4C5A4C] text-4xl">
                    Discover activities made just for you using our extensive database and our AI assistant.
                </h2>
                <a
                    href="/login"
                    class="bg-[#0D99FF] inline-block self-start p-5 rounded-3xl text-2xl text-white text-center mx-auto font-bold getstarted"
                >
                    Get Started &#8594;
                </a>
            </div>
        </div>
    </div>

    <div class="h-screen flex justify-center items-center">
        <div class="bg-[#FFEEBA] w-full p-10 flex flex-col space-y-8">
            <h1 class="text-[#5A655E] font-bold mx-auto text-6xl">Features</h1>
            <div class="flex flex-row space-x-10">
                {#each data.features as feature}
                    <div class="feature-card flex flex-col flex-1 bg-[#FFE8A3] rounded-full p-5 space-y-3">
                        <img src={feature.image} alt={feature.title} class="mx-auto svg-icon" width="75" height="75" />
                        <div class="flex flex-col space-y-2">
                            <h2 class="text-[#5A655E] text-2xl font-bold mx-auto">{feature.title}</h2>
                            <p class="text-wrap mx-auto text-center">{feature.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="h-screen flex justify-center items-center">
        <div class="flex flex-row w-full space-x-96">
            <div class="bg-[#FFEEBA] flex flex-col space-y-8 ml-2 team-panel my-auto py-3 px-4 rounded-3xl">
                <h1 class="text-[#5A655E] font-bold mx-auto text-2xl">The Team</h1>
                <div class="flex flex-col space-y-5 relative">
                    {#each data.team as member}
                        <div class="relative group">
                            <img
                                src={member.image}
                                alt={member.name}
                                class="rounded-full mx-auto"
                                width="100"
                                data-tooltip={member.name}
                            />
                            <div class="tooltip flex flex-col justify-center items-center">
                                <h1 class="text-md">{member.name}</h1>
                                <h2 class="text-sm">{member.role}</h2>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="bg-[#FFEEBA] p-10 flex flex-col space-y-8 rounded-3xl about-panel">
                <h1 class="text-[#5A655E] font-bold mx-auto text-6xl">About Us</h1>
                <p class="text-[#5A655E] text-2xl mx-auto text-center">
                    High school can be a whirlwind of excitement and challenges, especially with the pressure of
                    preparing for college and making new friends. That's why we created this project—to turn that stress
                    into an exciting adventure! Imagine having all the information you need about clubs, competitions,
                    and new opportunities right at your fingertips, without having to rely on friends or spend hours
                    searching. Our platform is designed to give you free and easy access to a world of extracurricular
                    activities, helping you discover your passions, build new friendships, and make the most of your
                    high school years. Say goodbye to the anxiety of missing out and hello to a vibrant, dynamic high
                    school experience. Dive in, explore, and let us help you turn your high school journey into an
                    unforgettable adventure!
                </p>
            </div>
        </div>
    </div>

    <footer class="flex flex-col bg-[#E6E6E6] justify-center text-center">
        <div class="flex flex-row justify-center text-center">
            <img src="favicon_transparent.png" alt="ECPeazy Logo" width="100" height="100" />
            <h1 class="my-auto text-[#52554C] font-bold text-2xl">
                <span class="text-[#7B9150]">EC</span>Peazy
            </h1>
        </div>
        <div class="flex flex-row justify-center items-center space-x-5 mb-2">
            {#each data.socials as social}
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                    <img src={social.image} alt={social.name} class="svg-icon" width="25" height="25" />
                </a>
            {/each}
        </div>
    </footer>
</div>

<style>
    .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        border: 2px solid #ffd700;
    }
    .feature-card {
        padding: 20px;
    }
    .svg-icon {
        filter: invert(39%) sepia(55%) saturate(187%) hue-rotate(195deg) brightness(95%) contrast(95%);
    }
    .getstarted {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        transition: background 0.3s ease-in-out;
    }

    .getstarted:hover {
        background-color: #007acc;
    }
    .feature-card h2 {
        margin-bottom: 0.5rem;
    }
    .feature-card p {
        margin-top: 0.5rem;
        margin-bottom: 0;
    }
    .about-panel {
        margin-right: 30px !important;
    }
    .team-panel {
        height: fit-content;
    }
    .team-panel .relative {
        position: relative;
    }

    .tooltip {
        position: absolute;
        top: 50%;
        left: 110%; /* Position to the right of the image */
        transform: translateY(-50%);
        background-color: #333;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.3s ease,
            visibility 0.3s ease;
        z-index: 10; /* Ensure the tooltip is on top */
    }

    .group:hover .tooltip {
        opacity: 1;
        visibility: visible;
    }
</style>
