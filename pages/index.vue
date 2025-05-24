<template>
  <div class="font-raleway">
    <section class="w-full h-screen pt-16 bg-contain bg-center bg-no-repeat transition-transform duration-500" :style="{
      backgroundImage: `url('/time.jpg')`,
      transform: `scale(${scale})`
    }">
      <div class="absolute inset-0 flex flex-col items-start justify-center max-w-4xl p-8 text-black z-10">
        <h1 class="text-5xl font-medium mb-4">
        Reshaping the Future.
        </h1>

        <p class="text-xl max-w-2xl leading-relaxed mb-8">Challenging conventions, breaking limits, and setting new standards through bold ideas and visionary design.</p>

        <div class="flex space-x-4">
          <button
           @click="onClickCollection"
            class="bg-black text-white px-8 py-3 font-medium transition duration-300 ease-in-out hover:bg-white hover:text-black border border-black">
            Shop collection
          </button>
          <button
            class="border border-black px-8 py-3 font-medium transition duration-300 ease-in-out hover:bg-black hover:text-white">
            Explore
          </button>
        </div>
      </div>
    </section>
    <!-- <router-view />  -->

    <section data-aos="fade-up">
      <div class="w-full min-h-screen bg-white text-black">
        <div class="max-w-3xl mx-auto px-8 py-2">
          <header class="mb-8">
            <h1 style="font-size: 25px;" class="font-medium">GENESIS // DROP 001</h1>
          </header>
          <div class="flex flex-wrap justify-between gap-y-6 mb-16">
            <div v-for="(product, index) in products.slice(0, 3)" :key="product.slug"
              class="w-full md:w-[48%] product group cursor-default custom-cursor">


              <div class="relative w-full aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img :src="product.image" :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" />
                <button @click="onClick(product.slug)"
                  class="absolute inset-0 m-auto w-32 h-10 bg-white text-black font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 cursor-default custom-cursor">
                  View
                </button>
              </div>
              <h2 class="font-medium">
                {{ product.name }}
                <span class="float-right">{{ product.price }} USD</span>
              </h2>
              <p class="text-sm mt-1">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProject />
    </section>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useProductsStore } from '../stores/products'
import FeaturedProject from '../components/FeaturedProject.vue'

const router = useRouter()
const productsStore = useProductsStore()
const products = computed(() => productsStore.products)

const scale = ref(1)
let ticking = false

function onClick(slug) {
  router.push(`/product/${slug}`)
}
function onClickCollection() {
  router.push(`/Collection`)
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY
      const newScale = 1 - scrollY / 1000
      scale.value = Math.max(newScale, 0.8)
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  AOS.init({
    duration: 800,
    once: false,
  })

  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})


</script>


<style>
html {
  scroll-behavior: smooth;
}


.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-down-enter-from,
.fade-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-down-enter-to,
.fade-slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.product {
  cursor: default;
}


.custom-cursor:hover {
  cursor: url('/shopCursor.png'), auto;
}
</style>
