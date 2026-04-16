<template>
    <header
        class="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark/80 backdrop-blur-md"
    >
        <div
            class="container mx-auto flex h-20 items-center justify-center px-6"
        >
            <router-link to="/" class="flex items-center gap-2 group">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-green to-emerald-600 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform"
                >
                    <Zap class="text-slate-900 w-6 h-6 fill-current" />
                </div>
                <span class="text-xl font-bold tracking-tight text-white">
                    Startup<span class="text-brand-green">Pulse</span>
                </span>
            </router-link>
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
