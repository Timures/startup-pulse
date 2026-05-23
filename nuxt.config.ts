import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    groqApiKey: process.env.NUXT_GROQ_API_KEY,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  app: {
    head: {
      title: "Startup Pulse",
      titleTemplate: "%s - Главная", // Динамический шаблон
      meta: [
        { name: "description", content: "Узнай насколько знаменит твой бренд" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // Если используете SVG:
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },
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
