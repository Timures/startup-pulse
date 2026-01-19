<template>
    <div class="container mx-auto px-6 py-12 max-w-4xl">
        <section v-if="!showResults" class="text-center space-y-8 py-20">
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tighter">
                Is your startup <span class="text-brand-green">famous</span>?
            </h1>
            <p class="text-slate-400 text-lg max-w-xl mx-auto">
                Мой AI-агент проанализирует узнаваемость вашего бренда и даст
                пару непрошеных советов.
            </p>

            <div
                class="flex flex-col md:flex-row gap-4 justify-center items-center mt-12"
            >
                <input
                    v-model="startupName"
                    @keyup.enter="startAnalysis"
                    type="text"
                    placeholder="Название проекта или URL"
                    class="w-full md:w-96 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-green outline-none transition-all text-xl"
                />
                <button
                    @click="startAnalysis"
                    :disabled="!startupName || isAnalyzing"
                    class="w-full md:w-auto bg-brand-green hover:bg-emerald-500 disabled:opacity-50 text-slate-900 font-bold px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                    <Search v-if="!isAnalyzing" size="20" />
                    <Loader2 v-else class="animate-spin" size="20" />
                    {{ isAnalyzing ? "Анализирую..." : "Узнать правду" }}
                </button>
            </div>
        </section>

        <section
            v-else
            class="animate-in fade-in slide-in-from-bottom-10 duration-700"
        >
            <div class="flex items-center gap-4 mb-8">
                <button
                    @click="reset"
                    class="text-slate-500 hover:text-white transition"
                >
                    <ArrowLeft size="24" />
                </button>
                <h2 class="text-2xl font-bold italic">
                    Анализ проекта: {{ startupName }}
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                    v-for="card in reportCards"
                    :key="card.label"
                    class="bg-white/5 border border-white/10 p-6 rounded-3xl"
                >
                    <div
                        class="text-slate-500 text-xs uppercase font-bold mb-2"
                    >
                        {{ card.label }}
                    </div>
                    <div class="text-3xl font-bold" :class="card.color">
                        {{ card.value }}
                    </div>
                    <p
                        class="text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-3 mt-3 italic"
                    >
                        {{ card.aiExplanation }}
                    </p>
                </div>
            </div>

            <div class="relative py-12">
                <div
                    class="absolute inset-0 flex items-center"
                    aria-hidden="true"
                >
                    <div class="w-full border-t border-white/10"></div>
                </div>
                <div class="relative flex justify-center">
                    <span
                        class="bg-brand-dark px-4 text-xs font-mono text-slate-500 uppercase tracking-widest"
                    >
                        Expert Recommendation
                    </span>
                </div>
            </div>

            <div
                class="relative p-1 bg-gradient-to-r from-brand-green/30 to-cyan-500/30 rounded-[2.5rem]"
            >
                <div class="bg-brand-dark rounded-[2.4rem] p-8 md:p-12">
                    <div class="flex items-start justify-between mb-8">
                        <div
                            class="flex items-center gap-2 text-brand-green font-mono uppercase tracking-widest text-xs"
                        >
                            <Bot size="16" /> AI Unsolicited Advice
                        </div>
                        <div class="text-[10px] text-slate-600 font-mono">
                            Ver. 2.0.26
                        </div>
                    </div>

                    <div class="min-h-[100px]">
                        <p
                            class="text-xl md:text-2xl leading-relaxed text-slate-200 italic font-medium"
                        >
                            "{{ currentAdvice.text }}"
                        </p>
                    </div>

                    <div
                        class="mt-10 flex flex-col md:flex-row items-center gap-6"
                    >
                        <button
                            @click="shuffleAdvice"
                            class="flex items-center gap-2 text-slate-500 hover:text-brand-green transition text-sm font-medium"
                        >
                            <RefreshCw
                                size="16"
                                :class="{ 'animate-spin': isShuffling }"
                            />
                            Сгенерировать другой совет
                        </button>
                        <router-link
                            to="/portfolio"
                            class="w-full md:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-brand-green hover:text-white transition-all text-center"
                        >
                            {{ currentAdvice.cta }}
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search, Loader2, ArrowLeft, Bot, RefreshCw } from "lucide-vue-next";

const startupName = ref("");
const isAnalyzing = ref(false);
const showResults = ref(false);
const isShuffling = ref(false);

const reportCards = ref([
    {
        label: "Awareness Score",
        value: "0/100",
        color: "text-brand-green",
        desc: "Уровень шума в X и LinkedIn.",
    },
    {
        label: "Sentiment",
        value: "Neutral",
        color: "text-white",
        desc: "Общий эмоциональный окрас бренда.",
    },
    {
        label: "Tech Verdict",
        value: "Legacy?",
        color: "text-cyan-400",
        desc: "Мнение AI о вашем фронтенде.",
    },
]);

const advices = [
    {
        text: "Пока вы ищете инвестиции, этот парень (автор сайта) может сделать вам дашборд мечты на Vue. Его ставка — честный рынок для Senior-уровня. Это всё равно выгоднее, чем годовая подписка на софт, который вы забыли отменить.",
        cta: "Нанять, пока он не ушел в Google",
    },
    {
        text: "AI анализ подтверждает: ваш интерфейс просит пощады. 8 лет опыта во Vue — это именно то, что нужно вашему стартапу, чтобы не выглядеть как поделка первокурсника. Минимум для входа — $1500/мес.",
        cta: "Забронировать Senior-юнита",
    },
    {
        text: "Ваш проект на 12% сексуальнее, если у него есть локализация. У автора есть свой i18n сервис, и он может внедрить его вам за пару вечеров. Ставка адекватная, результат — мгновенный.",
        cta: "Посмотреть портфолио",
    },
];

const currentAdvice = ref(advices[0]);

const startAnalysis = async () => {
    if (!startupName.value) return;

    isAnalyzing.value = true;
    showResults.value = false; // Сбрасываем старые результаты, если были

    try {
        // Вызов нашего Nuxt API
        const data = await $fetch("/api/analyze", {
            method: "POST",
            body: { name: startupName.value },
        });

        // Мапим данные из ответа AI (data) в массив reportCards
        // Важно: порядок в массиве должен совпадать с тем, как ты их рендеришь
        reportCards.value = [
            {
                label: "Awareness Score",
                value: `${data.awareness.score}/100`,
                aiExplanation: data.awareness.explanation,
                color: "text-brand-green",
            },
            {
                label: "Sentiment",
                value: data.sentiment.status,
                aiExplanation: data.sentiment.explanation,
                color: "text-white",
            },
            {
                label: "Tech Verdict",
                value: data.tech_verdict.status,
                aiExplanation: data.tech_verdict.explanation,
                color: "text-cyan-400",
            },
        ];

        // Вставляем "роаст" от AI в начало первого совета, чтобы сделать его уникальным
        // Либо создаем временный объект совета
        currentAdvice.value = {
            text: `${data.roast}. ${data.advice}`,
            cta: "Посмотреть опыт разработчика",
        };

        showResults.value = true;
    } catch (error) {
        console.error("Analysis failed:", error);
        // Тут можно вывести уведомление об ошибке
    } finally {
        isAnalyzing.value = false;
    }
};

const shuffleAdvice = () => {
    isShuffling.value = true;
    const otherAdvices = advices.filter(
        (a) => a.text !== currentAdvice.value.text,
    );
    currentAdvice.value =
        otherAdvices[Math.floor(Math.random() * otherAdvices.length)];
    setTimeout(() => (isShuffling.value = false), 500);
};

const reset = () => {
    showResults.value = false;
    startupName.value = "";
};
</script>
