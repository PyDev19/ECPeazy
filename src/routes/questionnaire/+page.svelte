<script lang="ts">
    const favorite_subjects = [
        "Math",
        "Biology",
        "English",
        "History",
        "Art",
        "Music",
        "Computer Science",
        "Chemistry",
        "Engineering",
    ];
    const favorite_extracurricular = [
        "Arts (e.g., painting, drawing)",
        "Music (e.g., band, choir)",
        "Drama/Theater",
        "Academic Clubs (e.g., math club, science club)",
        "Technology/Programming",
        "Community Service/Volunteering",
        "Leadership (e.g., student council)",
    ];
    const difficulty_scale = [
        "Mostly easy projects",
        "Mix of both",
        "Mostly hard projects",
    ];
</script>

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div
        class="opacity-bg p-5 rounded-lg text-center flex flex-col items-center w-[90%]"
    >
        <h1 class="text-2xl md:text-4xl font-bold text-center mb-5">
            Let's Get To Know You A Little <span
                class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text"
                >Better</span
            >
        </h1>
        <div
            class="grid grid-cols-3 grid-rows-1 space-y-2 gap-5 items-center justify-center"
        >
            <div class="flex flex-col space-y-2 border-red-500 border-8 h-full">
                <h2>Interests</h2>
                <h3 class="mb-8">What fields are you into?</h3>
                {#each favorite_subjects as subject}
                    <div class="flex flex-row space-x-2">
                        <input
                            type="checkbox"
                            id={subject}
                            name={subject}
                            value={subject}
                        />
                        <label for={subject}>{subject}</label>
                    </div>
                {/each}
            </div>
            <div class="flex flex-col space-y-2 border-red-500 border-8 h-full">
                <h2>Extracurriculars</h2>
                <h3 class="mb-8">What kind of activies are you looking f?</h3>
                {#each favorite_extracurricular as extracurricular}
                    <div class="flex flex-row space-x-2">
                        <input
                            type="checkbox"
                            id={extracurricular}
                            name={extracurricular}
                            value={extracurricular}
                        />
                        <label for={extracurricular}>{extracurricular}</label>
                    </div>
                {/each}
            </div>
            <div class="flex flex-col space-y-2 border-red-500 border-8 h-full">
                <h2>Difficulty</h2>
                <h3 class="mb-8">
                    Are you looking for harder or simpler projects?
                </h3>

                <div class="flex flex-row space-x-4">
                    {#each difficulty_scale as diff}
                        <div class="flex flex-col">
                            <input
                                type="radio"
                                id={diff}
                                name="difficulty"
                                value={diff}
                            />
                            <label for={diff} class="text-sm">{diff}</label>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>