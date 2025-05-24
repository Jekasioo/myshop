<template>
  <div class="group relative">
    <div
      class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none   cursor-default custom-cursor">
      <img :src="imageUrl" :alt="title" loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <button @click="onClick(slug)"
        class="absolute inset-0 m-auto w-32 h-10 bg-white text-black font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 cursor-default custom-cursor cursor-default custom-cursor">Просмотр</button>
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          {{ title }}
        </h3>
      </div>
      <p class="text-sm font-medium text-gray-900">
        {{ price }} USD
      </p>
    </div>

  </div>
</template>

<script setup>

function onClick(slug) {
  window.location.href = `/product/${slug}`
}

defineProps({
  imageUrl: String,
  title:    String,
  price:    Number,
  slug:     String
})
</script>

<style>
.product {
  cursor: default;
}


.custom-cursor:hover {
  cursor: url('/shopCursor.png'), auto;
}
</style>
