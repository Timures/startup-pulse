import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    groqApiKey: process.env.GROQ_API_KEY,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  // В Nuxt 4 будущее уже здесь, включаем поддержку
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // Если ты используешь Lucide иконки, Nuxt иногда нужно подсказать их транспиляцию
  build: {
    transpile: ["lucide-vue-next"],
  },
});
