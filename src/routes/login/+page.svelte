<script lang="ts">
    import './style.css';
    let animation_active = false;

    function toggle_animation() {
        animation_active = !animation_active;
    }
</script>

<svelte:head>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <title>ECPeazy Login</title>
</svelte:head>

<main class="bg-[#FFFCF1] flex items-center justify-center flex-col h-screen">
    <div class="container bg-[#FFE8A3] rounded-3xl shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px]" class:active={animation_active}>
        <div class="form-container sign-up absolute top-0 left-0 h-full w-1/2 opacity-0 z-10 {animation_active ? 'animate-move' : ''}">
            <form class="bg-[#FFE8A3] flex items-center justify-center flex-col px-10 h-full">
                <h1 class="text-[#5A655E] text-2xl font-bold mb-4">Create Account</h1>
                <div class="social-icons flex my-5">
                    <button class="icon-button">
                        <i class="bx bxl-google"></i>
                    </button>
                    <button class="icon-button">
                        <i class="bx bxl-facebook"></i>
                    </button>
                    <button class="icon-button">
                        <i class="bx bxl-github"></i>
                    </button>
                    <button class="icon-button">
                        <i class="bx bxl-linkedin"></i>
                    </button>
                </div>
                <span class="text-sm mb-4">Register with E-mail</span>
                <input type="text" placeholder="Name" class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none" />
                <input type="email" placeholder="Enter E-mail" class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none" />
                <input type="password" placeholder="Enter Password" class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none" />
                <button class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-2 uppercase">Sign Up</button>
            </form>
        </div>

        <div class="form-container sign-in absolute top-0 left-0 h-full w-1/2 z-20">
            <form class="bg-[#FFE8A3] flex items-center justify-center flex-col px-10 h-full">
                <h1 class="text-[#5A655E] text-2xl font-bold mb-4">Sign In</h1>
                <div class="social-icons flex my-5">
                    <button class="icon-button">
                        <i class="bx bxl-google"></i>
                    </button>
                    <button class="icon-button">
                        <i class="bx bxl-facebook"></i>
                    </button>
                    <button class="icon-button">
                        <i class="bx bxl-github"></i>
                    </button>
                    <button class="icon-button">
                        <i class="bx bxl-linkedin"></i>
                    </button>
                </div>
                <span class="text-sm mb-4">Login With Email & Password</span>
                <input type="email" placeholder="Enter E-mail" class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none" />
                <input type="password" placeholder="Enter Password" class="bg-white border-none my-2 px-4 py-2 text-sm rounded-md w-full outline-none" />
                <button class="text-[#5A655E] text-sm my-4">Forget Password?</button>
                <button class="bg-[#0D99FF] text-white text-sm px-8 py-2 border border-transparent rounded-md font-semibold tracking-wider mt-2 uppercase">Sign In</button>
            </form>
        </div>

        <div class="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden rounded-3xl z-50">
            <div class="toggle bg-[#5A655E] text-white h-full relative left-[-100%] w-[200%]">
                <div class="toggle-panel toggle-left absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 translate-x-[-200%]">
                    <h1 class="text-3xl font-bold mb-4">Welcome To <br />ECPeazy</h1>
                    <p class="text-sm mb-4">Already have an account?</p>
                    <button on:click={toggle_animation} class="bg-transparent border border-white text-white px-8 py-2 rounded-md uppercase">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right absolute right-0 w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0">
                    <h1 class="text-3xl font-bold mb-4">Welcome to <br/> ECPeazy</h1>
                    <p class="text-sm mb-4">Don't have an account?</p>
                    <button on:click={toggle_animation} class="bg-transparent border border-white text-white px-8 py-2 rounded-md uppercase">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</main>
