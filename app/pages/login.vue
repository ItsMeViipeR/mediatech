<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <UButton
            to="/api/auth/github"
            icon="i-simple-icons-github"
            label="Login with GitHub"
            color="neutral"
            size="xl"
            class="w-full"
            external
          />
          <UButton
            to="/api/auth/discord"
            icon="i-simple-icons-discord"
            label="Login with Discord"
            size="xl"
            external
            class="w-full text-white bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C4D99]"
          />
          <!-- Google sign button -->
          <UButton
            to="/api/auth/google"
            icon="devicon:google"
            label="Login with Google"
            color="neutral"
            size="xl"
            class="w-full bg-black text-white hover:bg-black active:bg-black"
            external
          />
        </div>
      </div>
    </div>
  </section>
</template>
