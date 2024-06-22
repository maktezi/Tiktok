// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    srcDir: "client/",
    devtools: { enabled: true },
    modules: [
        "nuxt-icon",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxt/eslint",
        "@nuxtjs/tailwindcss",
    ],
    css: ["~/assets/css/main.css"],
    tailwindcss: {
        exposeConfig: true,
        viewer: true,
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});
