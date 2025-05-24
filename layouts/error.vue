<template>
    <div class="flex w-full min-h-screen justify-center items-center bg-white">
        <div class="text-center px-4">
            <h1 class="text-3xl font-bold mb-2">404 PAGE NOT FOUND</h1>
            <p class="text-gray-600 mb-4">
                The page you were looking for does not exist.
            </p>
            <button @click="$router.push('/')"
                class="px-8 py-3 bg-black text-white text-sm hover:bg-gray-900 transition-colors">
                CONTINUE SHOPPING
            </button>
        </div>
    </div>
</template>

<script setup>
</script>
