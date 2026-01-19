<template>
    <header
        class="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark/80 backdrop-blur-md"
    >
        <div
            class="container mx-auto flex h-20 items-center justify-between px-6"
        >
            <router-link to="/" class="flex items-center gap-2 group">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-emerald-600 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform"
                >
                    <Zap class="text-slate-900 w-6 h-6 fill-current" />
                </div>
                <span class="text-xl font-bold tracking-tight text-white">
                    Startup<span class="text-brand-green">Pulse</span>
                </span>
            </router-link>

            <nav class="hidden md:flex items-center gap-8">
                <router-link
                    to="/"
                    class="text-sm font-medium transition-colors hover:text-brand-green"
                    active-class="text-brand-green"
                >
                    Analyzer
                </router-link>
                <router-link
                    to="/portfolio"
                    class="text-sm font-medium transition-colors hover:text-brand-green text-slate-400"
                    active-class="text-brand-green"
                >
                    Portfolio & Contact
                </router-link>
            </nav>

            <div class="flex items-center gap-4">
                <div
                    class="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                >
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                        ></span>
                        <span
                            class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
                        ></span>
                    </span>
                    <span
                        class="text-[10px] font-bold uppercase tracking-wider text-emerald-500"
                        >Available for hire</span
                    >
                </div>

                <a
                    href="https://www.upwork.com/your-profile"
                    target="_blank"
                    class="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-brand-green hover:text-white"
                >
                    Upwork
                </a>
            </div>
        </div>
    </header>
</template>

<script setup>
import { Zap } from "lucide-vue-next";
</script>

<style scoped>
.router-link-active {
    position: relative;
}
.router-link-active::after {
    content: "";
    position: absolute;
    bottom: -28px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #42b883;
    box-shadow: 0 0 10px #42b883;
}
</style>
