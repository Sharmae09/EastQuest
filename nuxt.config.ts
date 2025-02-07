// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nitro: {
  //   preset: "static", // Ensures Nuxt outputs static files
  // },
  // app: {
  //   baseURL: "./", // Ensures correct routing in Android WebView
  // },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  css: [
    "@/assets/styles/main.scss", // Add the global SCSS file
  ],
  plugins: ["~/plugins/sqlite.ts"],
});
