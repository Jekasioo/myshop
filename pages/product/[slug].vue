<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const slug = ref(route.params.slug)

const product = computed(() =>
  productsStore.products.find(p => p.slug === slug.value)
)


const relatedProducts = computed(() =>
  productsStore.products.filter(p => p.slug !== slug.value)
)

const isInCart = computed(() => cartStore.isInCart(product.value.slug))
const quantity = ref(1)
function toggleCart() {
  if (isInCart.value) {
    cartStore.removeFromCart(product.value.slug)
  } else {
    cartStore.addToCart(product.value, quantity.value)
  }
}
watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug
  }
)


function onClick(newSlug) {
  window.location.href = `/product/${newSlug}`
}


const openFAQs = ref({})

const toggleFAQ = (question) => {
  openFAQs.value[question] = !openFAQs.value[question]
}

const faqs = [
  {
    question: "What's your return policy?",
    answer:
      'You can return your item within 14 days of delivery. Items must be unworn, in original condition and packaging.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination.',
  },
]
</script>


<template>
  <main class="w-full min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="product" class="flex flex-col lg:flex-row-reverse gap-10 mb-20">
        <!-- Product Image -->
        <div class="lg:w-1/2">
          <img :src="product.image" :alt="product.name" class="w-full h-auto object-cover bg-gray-100" />
        </div>

        <!-- Product Details -->
        <div class="lg:w-1/2 space-y-6 pt-12">
          <div class="space-y-1">
            <p class="text-sm uppercase tracking-wider text-orange-600">Collection</p>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
            <p class="mt-2 text-sm text-gray-600">{{ product.description }}</p>
          </div>
          <p class="text-xl font-medium text-gray-900">{{ product.price }} USD</p>
          <button
            class="w-full py-3 px-4 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors text-sm font-medium"
            @click="toggleCart">
            {{ isInCart ? 'Remove from cart' : 'Add to cart' }}

          </button>
          <div v-if="!isInCart" class="mt-3">
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input id="quantity" type="number" min="1" v-model.number="quantity"
              class="w-20 border border-gray-300 rounded px-2 py-1 text-sm" />
          </div>
          <!-- FAQs -->
          <div class="space-y-4 pt-6 border-t border-gray-200">
            <div v-for="faq in faqs" :key="faq.question" class="border-b border-gray-200 pb-4">
              <button @click="toggleFAQ(faq.question)"
                class="flex justify-between items-center w-full text-left focus:outline-none">
                <span class="text-sm font-medium text-gray-900">{{ faq.question }}</span>
                <span class="text-gray-500 text-sm">
                  {{ openFAQs[faq.question] ? '-' : '+' }}
                </span>
              </button>
              <div v-if="openFAQs[faq.question]" class="mt-2">
                <p class="text-sm text-gray-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="pt-1 min-h-[calc(50vh-4rem)] flex items-center justify-center">
        <div class="min-h-screen bg-white flex items-center justify-center px-4 relative">
          <div class="text-center max-w-lg">
            <h1 class="text-4xl font-light mb-4">Product Not Found</h1>
            <p class="text-lg text-gray-600 mb-8">
              The item you're looking for is currently unavailable
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="$router.push('/')"
                class="px-8 py-3 bg-black text-white text-sm hover:bg-gray-900 transition-colors">
                CONTINUE SHOPPING
              </button>

            </div>
          </div>
        </div>


      </div>
      <div v-if="relatedProducts.length">
        <h2 class="text-center text-xl font-medium text-gray-900 mb-10">
          YOU MIGHT ALSO LIKE
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="related in relatedProducts" :key="related.id" class="group cursor-pointer">
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 mb-4" @click="onClick(related.slug)">
              <img :src="related.image" :alt="related.name"
                class="w-full h-[400px] object-cover object-center group-hover:opacity-90 transition-opacity" />
            </div>

            <div class="flex justify-between items-start mb-1">

              <h3 class="text-sm font-medium text-gray-900">{{ related.name }}</h3>
              <p class="text-sm text-gray-900">{{ related.price }}</p>
            </div>
            <p class="text-xs text-gray-600">{{ related.description }}</p>
          </div>
        </div>
      </div>
      <!-- Related Products -->
    </div>
  </main>
</template>
