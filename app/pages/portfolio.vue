<template>
    <div class="container mx-auto px-6 py-12 max-w-5xl animate-fade-in">
        <section class="mb-16">
            <div
                class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
                <div>
                    <h1
                        class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                    >
                        Senior
                        <span class="text-brand-green">Vue.js</span> Developer
                    </h1>
                    <p class="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        8 лет опыта в создании сложных интерфейсов.
                        Специализируюсь на дашбордах, Telegram Mini Apps и
                        внедрении AI в бизнес-процессы.
                    </p>
                </div>
                <div
                    class="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl text-center min-w-[240px]"
                >
                    <div
                        class="text-sm text-emerald-500 font-bold uppercase tracking-wider mb-1"
                    >
                        Availability
                    </div>
                    <div class="text-2xl font-bold mb-1">Part-time</div>
                    <div class="text-slate-400 text-sm italic">
                        15-20 hours / week
                    </div>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div
                v-for="stat in stats"
                :key="stat.label"
                class="bg-white/5 border border-white/10 p-4 rounded-2xl"
            >
                <div class="text-2xl font-bold text-brand-green">
                    {{ stat.value }}
                </div>
                <div class="text-xs text-slate-500 uppercase font-bold">
                    {{ stat.label }}
                </div>
            </div>
        </div>

        <section class="mb-16">
            <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
                <Layout class="text-brand-green" /> Selected Projects
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                    v-for="project in projects"
                    :key="project.title"
                    class="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-green/50 transition-all"
                >
                    <div
                        class="aspect-video bg-slate-800 relative overflow-hidden"
                    >
                        <div
                            class="absolute inset-0 flex items-center justify-center text-slate-600 font-mono italic"
                        >
                            [ {{ project.title }} image ]
                        </div>
                    </div>
                    <div class="p-6">
                        <h3
                            class="text-xl font-bold mb-2 group-hover:text-brand-green transition-colors"
                        >
                            {{ project.title }}
                        </h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            {{ project.description }}
                        </p>
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span
                                v-for="tag in project.tags"
                                :key="tag"
                                class="text-[10px] px-2 py-1 bg-white/10 rounded-md text-slate-300 font-bold"
                            >
                                {{ tag }}
                            </span>
                        </div>
                        <a
                            :href="project.link"
                            class="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:underline"
                        >
                            View Project <ExternalLink size="14" />
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/20 rounded-3xl p-8 md:p-12"
        >
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-6">
                    Ready to scale your startup?
                </h2>
                <p class="text-slate-400 mb-10">
                    Ищу долгосрочное сотрудничество. Предлагаю экспертизу Senior
                    уровня без костов на штатного сотрудника.
                </p>

                <div
                    class="flex flex-col md:flex-row justify-center items-center gap-12 mb-10"
                >
                    <div class="text-center">
                        <div
                            class="text-slate-500 text-sm mb-1 uppercase font-bold"
                        >
                            Hourly Rate
                        </div>
                        <div class="text-3xl font-bold">Market Senior</div>
                    </div>
                    <div class="h-12 w-px bg-white/10 hidden md:block"></div>
                    <div class="text-center">
                        <div
                            class="text-slate-500 text-sm mb-1 uppercase font-bold"
                        >
                            Min. Monthly Engagement
                        </div>
                        <div class="text-4xl font-bold text-brand-green">
                            $1,500
                        </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#"
                        class="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-brand-green hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        Hire me on Upwork <ArrowRight size="18" />
                    </a>
                    <a
                        href="#"
                        class="bg-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                        Telegram
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { Layout, ExternalLink, ArrowRight } from "lucide-vue-next";

const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Core Stack", value: "Vue / TS" },
    { label: "Main Focus", value: "SaaS / AI" },
    { label: "TMA Experience", value: "Built 5+" },
];

const projects = [
    {
        title: "i18n AI Manager",
        description:
            "SaaS для автоматической локализации JSON-файлов с помощью LLM. Сокращает время перевода на 80%.",
        tags: ["Vue 3", "OpenAI", "Node.js", "Tailwind"],
        link: "#",
    },
    {
        title: "Startup Pulse Analyzer",
        description:
            "Тот самый инструмент, который вы видели на главной. Интеграция AI для анализа рынка в реальном времени.",
        tags: ["Vue 3", "Pinia", "AI API"],
        link: "/",
    },
];
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
