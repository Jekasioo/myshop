<template>
  <div class="max-w-7xl mx-auto px-4 py-8 pt-[125px]">
    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.slug"
        :imageUrl="product.image"
        :title="product.name"
        :price="product.price"
        :slug="product.slug"
      />
    </transition-group>

    <div class="mt-8 text-center">
      <button
        v-if="visibleProducts.length < products.length"
        @click="loadMore"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { storeToRefs } from 'pinia'
import ProductCard from '../Components/ProductCard.vue'

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

const batchSize = 8
const visibleCount = ref(batchSize)

const visibleProducts = computed(() => products.value.slice(0, visibleCount.value))

function loadMore() {
  visibleCount.value = Math.min(visibleCount.value + batchSize, products.value.length)
}
</script>

<style scoped>


.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
