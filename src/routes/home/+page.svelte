<script lang="ts">
    import { firebase_auth } from "$lib/firebase/firebase_app";

    const current_user = firebase_auth.currentUser;
</script>

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h2 class="text-[3em] m-0">Welcome <span class="bg-gradient-to-b from-green-600 via-green-400 to-green-300 text-transparent bg-clip-text">{current_user?.displayName}</span></h2>
    </div>
</section>