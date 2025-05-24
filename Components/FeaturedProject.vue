<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">New Collection</h2>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard v-for="product in products" :key="product.slug" :imageUrl="product.image" :title="product.name"
          :price="product.price" :slug="product.slug" />
      </div>

      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Collection</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="relative h-80 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Summer Collection" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div>
                <h3 class="font-medium text-xl text-white">Summer Essentials</h3>
                <a href="#" class="mt-2 text-sm text-white/80 hover:text-white">Shop Collection →</a>
              </div>
            </div>
          </div>
          <div class="relative h-80 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Urban Style" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div>
                <h3 class="font-medium text-xl text-white">Urban style</h3>
                <a href="/Collection" class="mt-2 text-sm text-white/80 hover:text-white">Shop Collection</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard          from '../Components/ProductCard.vue'
import { computed }         from 'vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const products      = computed(() => productsStore.products)

</script>
