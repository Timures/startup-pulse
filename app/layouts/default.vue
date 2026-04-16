<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />

        <main class="grow">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>
