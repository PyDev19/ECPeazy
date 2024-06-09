<script lang="ts">
    import { type LoginUser } from "$lib/types/user";

    let user: LoginUser = {
        credential: "",
        password: ""
    };
</script>

<!--  dont forget to create an 'onclick' for login button + function -->

<section class="h-full flex flex-col justify-center items-center font-sans">
    <div class="opacity-bg p-5 rounded-lg text-center sm:w-[90%] md:w-[70%]">
        <h1 class="text-[3em] text-[#FFEB3B] m-0">Log In</h1>

        <form class="space-y-2 justify-center rounded-lg">
            <input
                bind:value={user.credential}
                placeholder="E-mail or Username"
                class="p-2 rounded-lg signup-input"
            />
            <input
                bind:value={user.password}
                placeholder="Password"
                class="p-2 rounded-lg signup-input"
            />
            <button
                type="button"
                class="p-2 rounded-lg bg-blue-500 text-white justify-center items-center"
            >Log In</button>
        </form>
</section>

<style>
    .signup-input {
        border: 1px solid #ccc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
    }
</style>