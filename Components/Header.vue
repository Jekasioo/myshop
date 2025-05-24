<template>
  <header class="w-full fixed top-0 left-0 bg-white border-b border-gray-200 z-50">
    <div class="container mx-auto flex items-center justify-between h-20 px-1 relative z-10">
      <nav class="hidden md:flex space-x-8">
        <a href="#" class="text-sm hover:underline py-5">URBAN STYLE</a>
        <a href="#" class="text-sm hover:underline py-5"> SUMMER STYLE</a>
        <div class="relative group" @mouseenter="openDropdown = true" @mouseleave="openDropdown = false">
          <a href="#" class="text-sm py-5 inline-block cursor-pointer select-none">
              NEW
          </a>
        </div>
      </nav>
      <a href="/" class="absolute left-1/2 transform -translate-x-1/2 text-xl font-light tracking-widest">
        TEST SHOP
      </a>

      <div class="relative ml-auto" @click.stop="toggleLangDropdown" @mouseleave="langDropdownOpen = false"
        ref="dropdownRef">

      </div>

      <!-- icons right position -->
      <div class="flex items-center space-x-3 relative">
        <button aria-label="Search" @click="toggleSearch" ref="searchBtn">
          <SearchIcon :size="21" class="text-gray-800 hover:text-black transition" />
        </button>

        <button aria-label="Cart" @click="toggleCart">
          <ShoppingBagIcon :size="21" class="text-gray-800 hover:text-black transition" />
          <span v-if="cartStore.items.length"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {{ cartStore.items.length }}
          </span>
        </button>
        <button aria-label="Menu" class="md:hidden">
          <MenuIcon :size="21" class="text-gray-800 hover:text-black transition" />
        </button>

        <!-- search bar -->
        <transition name="fade">
          <div v-if="showCart" @click="toggleCart" class=" fixed inset-0 z-40 bg-black/50"></div>
        </transition>

        <transition name="slide">
          <aside v-if="showCart" class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col p-5">
            <header class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Your Cart</h2>
              <button @click="toggleCart" class="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X />
              </button>
            </header>

            <div class="flex-1 overflow-y-auto">
              <div v-if="cartStore.items.length === 0"
                class="flex items-center justify-center h-full text-gray-900 text-center px-4 text-3xl">
                Your cart is empty.
              </div>

              <ul v-else class="space-y-4">
                <li v-for="item in cartStore.items" :key="item.slug" class="flex items-center gap-4">
                  <img :src="item.image" alt="Product image" class="w-14 h-14 object-cover rounded border" />
                  <div class="flex-1">
                    <router-link :to="`/product/${item.slug}`" class="font-medium text-gray-800 hover:underline">
                      {{ item.name }}
                    </router-link>
                    <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                  </div>
                  <X @click="cartStore.removeFromCart(item.slug)"
                    class="text-gray-500 hover:text-red-700 text-xl leading-none transition-colors duration-200" />

                </li>
              </ul>
            </div>

            <footer class="mt-4">

              <div class="space-y-3 mb-6">

                <div class="flex justify-between text-gray-600">
                  <span>Shipping</span>

                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Tax</span>

                </div>
                <div class="pt-3 border-t border-gray-200 flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>
                    $
                    {{
                      cartStore.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
                    }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <button
                  class="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors">
                  Checkout
                </button>
                <button @click="cartStore.clearCart" 
                  class="w-full py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">
                  Clear Cart
                </button>
              </div>

            </footer>
          </aside>
        </transition>



        <transition name="fade-slide">
          <div v-if="showSearch"
            class="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-300 rounded shadow-md p-4 z-20"
            ref="searchPanel" @click.stop>
            <input type="text" v-model="searchQuery" placeholder="Search..."
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out"
              autofocus @keydown.escape="closeSearch" />

            <ul v-if="searchQuery && filteredResults.length" class="mt-2 max-h-60 overflow-auto">
              <li v-for="item in filteredResults" :key="item"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-black transition-colors duration-200 ease-in-out">
                <a :href="`/product/${slugify(item.slug)}`" class="block w-full">{{ item.slug }}</a>
              </li>
            </ul>

            <div v-else-if="searchQuery && filteredResults.length === 0" class="mt-2 text-gray-500 text-sm">
              No results found. Try searching for:
              <ul class="mt-1 flex flex-wrap gap-2">
                <li v-for="suggestion in suggestions" :key="suggestion"
                  class="cursor-pointer text-black underline hover:text-gray-700" @click="selectSuggestion(suggestion)">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
          </div>
        </transition>

      </div>

    </div>

    <!-- dropdown menu -->
    <transition name="fade">
      <div v-if="openDropdown" class="absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-md py-10"
        @mouseenter="openDropdown = true" @mouseleave="openDropdown = false">
        <div class="container mx-auto px-4 max-w-[1400px] grid grid-cols-3 gap-10">
          <div>
            <h3 class="font-semibold text-lg mb-4">New Collection Arivvial</h3>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li><a href="#" class="hover:underline">All new arrivals</a></li>
              <li><a href="#" class="hover:underline">Clean luxury better for you</a></li>
              <li><a href="#" class="hover:underline">New to everlane</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-4">FEATURED COLLECTION</h3>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li><a href="#" class="hover:underline">SUMMER </a></li>
              <li><a href="#" class="hover:underline">THE LINEN SHOP</a></li>
              <li><a href="#" class="hover:underline">THE DRESS HOP</a></li>
            </ul>
          </div>

        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '../stores/cart'



import { MenuIcon, SearchIcon, ShoppingBagIcon, X, GlobeIcon, ChevronDownIcon, CheckIcon } from 'lucide-vue-next'
import { useProductsStore } from '../stores/products'

const openDropdown = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const searchPanel = ref(null)
const searchBtn = ref(null)

const langDropdownOpen = ref(false)
const productStore = useProductsStore()
const cartStore = useCartStore()
const showCart = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }
]

function toggleLangDropdown() {
  langDropdownOpen.value = !langDropdownOpen.value
}

function selectLanguage(langCode) {
 
  langDropdownOpen.value = false
}

function toggleCart() {
  showCart.value = !showCart.value
  if (showCart.value) {
    showSearch.value = false
  }
}
const filteredResults = computed(() => {
  if (!searchQuery.value) return []
  return productStore.products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .map(product => ({
      name: product.name,
      slug: product.slug
    }))
})


const suggestions = computed(() =>
  productStore.products.slice(0, 3).map(p => p.name)
)

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    showCart.value = false
  }
}

function closeSearch() {
  showSearch.value = false
  searchQuery.value = ''
}

function selectSuggestion(suggestion) {
  searchQuery.value = suggestion
}

function onClickOutside(event) {
  if (
    showSearch.value &&
    searchPanel.value &&
    !searchPanel.value.contains(event.target) &&
    searchBtn.value &&
    !searchBtn.value.contains(event.target)
  ) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>


<style scoped>
.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up-enter-to,
.fade-slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
