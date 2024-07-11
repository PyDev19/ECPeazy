<script>
    import { base } from "$app/paths";
</script>

<svelte:head>
    <title>ECPeazy</title>
</svelte:head>

<!-- Tag Line -->
<section class="h-full flex flex-col justify-center items-center">
    <div class="opacity-bg p-5 rounded-lg text-center w-[90%]">
        <h1 class="text-[3em] text-[#FFEB3B] m-0 tagline">Discover Your Passion, Shape Your Future</h1>
        <p class="text-[1.5em] text-[#8BC34A] mt-[10px]">Your Gateway to Exciting Extracurricular Opportunities</p>
        <a
            href="{base}/search"
            class="bg-[#FFEB3B] py-2.5 px-3 rounded-md hover:bg-yellow-400 mt-2 text-[1em] shadow-md text-[#8BC34A] font-semibold opacity-100"
            >Explore Extracurricular Activities"</a
        >
    </div>
</section>

<!-- Features -->
<section class="flex justify-center items-center md:h-full">
    <div class="opacity-bg p-5 rounded-lg text-center flex flex-col items-center w-[90%]">
        <h1 class="text-lg md:text-xl mb-4 font-semibold text-center">Features</h1>
        <h2 class="text-2xl md:text-4xl font-bold text-center">Finding Extracurricular Activites</h2>
        <h2 class="text-2xl md:text-4xl font-bold text-center mb-5">
            Has Been Made <span
                class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
                >EC Peazy</span
            >
        </h2>
        <p class="text-gray-700 text-center mb-5 text-sm md:text-base">
            EC Peazy makes it easier to search for Extracurriculars, Research labs, and Internships by allowing you to
            search for activities based of your own portfolio!
        </p>
        <div
            class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-5 w-[80%] items-center justify-center mb-5"
        >
            <div class="flex p-3 rounded-lg bg-white feature">
                <div class="mr-5 flex items-center justify-center">
                    <img src="database.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">Large Database</h3>
                    <p class="text-xs md:text-base">
                        Our site includes a large database full of extracurriculars, research opportunities, and
                        internships which you can use to find the activity that fits you.
                    </p>
                </div>
            </div>
            <div class="flex p-3 rounded-lg bg-white feature">
                <div class="mr-5 flex items-center justify-center">
                    <img src="search.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">Specified Search</h3>
                    <p class="text-xs md:text-base">
                        Search through our large database has been made easy through the use of specified tags and
                        categories to narrow your search results down to what you want.
                    </p>
                </div>
            </div>
            <div class="flex p-3 rounded-lg bg-white feature">
                <div class="mr-5 flex items-center justify-center">
                    <img src="journal-bookmark-fill.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">Portfolios</h3>
                    <p class="text-xs md:text-base">
                        Through our site you can create portfolios where you can add all the activities you have done so
                        far to keep track of all the activites you have done.
                    </p>
                </div>
            </div>
            <div class="flex p-3 rounded-lg bg-white feature">
                <div class="mr-5 flex items-center justify-center">
                    <img src="robot.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">AI Recommendations</h3>
                    <p class="text-xs md:text-base">
                        Using your portoflio our site will use AI to give you recommendations for which extracurriculars
                        you should do to further enchance your portfolio and further your career.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<section class="h-full flex justify-center items-center">
    <div class="opacity-bg p-5 rounded-lg text-center flex flex-col items-center w-[90%]">
        <h1 class="text-lg md:text-xl mb-4 font-semibold text-center">Contact Us</h1>
        <h2 class="text-2xl md:text-4xl font-bold text-center">We Keep In Touch</h2>
        <h2 class="text-2xl md:text-4xl font-bold text-center mb-5">
            With Our <span
                class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
                >Community</span
            >
        </h2>
        <p class="text-gray-700 text-center mb-5 text-sm md:text-base">
            We like to keep in touch with our community to ensure that we are kept upto date on the latest activites
            available to highschoolers and provide support on demand.
        </p>
        <div
            class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-5 w-[80%] items-center justify-center"
        >
            <div class="flex p-3 rounded-lg bg-white socials" id="insta">
                <div class="mr-5 flex items-center justify-center">
                    <img src="instagram.svg" width="40" height="40" alt="" id="insta-icon" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">Instagram</h3>
                    <p class="text-xs md:text-base">
                        Wanna see our latests posts and developments about the site? Check out our Insta!
                    </p>
                </div>
            </div>
            <div class="flex p-3 rounded-lg bg-white socials">
                <div class="mr-5 flex items-center justify-center">
                    <img src="discord.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">Discord</h3>
                    <p class="text-xs md:text-base">
                        Wanna hangout with other highschoolers and see what ECs they are doing? Join our Discord Sever!
                    </p>
                </div>
            </div>
            <div class="flex p-3 rounded-lg bg-white socials">
                <div class="mr-5 flex items-center justify-center">
                    <img src="envelope-at.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">Email</h3>
                    <p class="text-xs md:text-base">
                        Having any problems with the website or want to directly ask us a question? Email Us!
                    </p>
                </div>
            </div>
            <div class="flex p-3 rounded-lg bg-white socials">
                <div class="mr-5 flex items-center justify-center">
                    <img src="tiktok.svg" width="40" height="40" alt="" />
                </div>
                <div class="max-w-[calc(100%-60px)] text-left flex flex-col justify-center">
                    <h3 class="mb-[10px] text-lg">TikTok</h3>
                    <p class="text-xs md:text-base">
                        Wanna see our short videos giving tips on what activites you should take part in? Follow our
                        TikTok!
                    </p>
                </div>
            </div>
        </div>
        <p class="text-gray-700 text-center mb-5 text-sm md:text-base mt-5">
            &copy;EC Peazy&trade;. All Rights Reserved
        </p>
    </div>
</section>

<style>
    .feature,
    .socials {
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .feature {
        height: 200px;
    }

    .socials:hover {
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }

    .socials {
        height: 150px;
    }

    .tagline {
        text-shadow: 2px 2px black;
        color: #5a5a5a;
    }
</style>
