<template>
    <footer
        class="w-full border-t border-white/10 bg-brand-dark/80 backdrop-blur-md"
    >
        <div class="flex justify-center items-center gap-3 py-3">
            <p>© {{ new Date().getFullYear() }}</p>

            <a href="https://timures.me" class="flex items-center gap-2 group">
                <SunIcon class="text-orange-200 w-6 h-6 fill-current" />

                <span class="text-xl font-bold tracking-tight text-white">
                    Timures.me
                </span>
            </a>
        </div>
    </footer>
</template>

<script setup>
import { SunIcon } from "lucide-vue-next";
</script>
