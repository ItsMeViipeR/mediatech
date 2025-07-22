import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    session: {
      password: process.env.NUXT_SESSION_PASSWORD || "",
    },
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID || "",
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET || "",
      },
      discord: {
        clientId: process.env.NUXT_OAUTH_DISCORD_CLIENT_ID || "",
        clientSecret: process.env.NUXT_OAUTH_DISCORD_CLIENT_SECRET || "",
      },
    },
  },
});
