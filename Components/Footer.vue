<template>
  <footer class="bg-white text-gray-800 w-full">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Shop Section -->
        <div>
          <h2 class="text-xs tracking-widest mb-6">Shop</h2>
          <ul class="space-y-3 text-sm">
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">New arrivials</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Best sellers</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Collections</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">sustainable </router-link></li>
          </ul>
        </div>
        <!-- Help Section -->
        <div>
          <h2 class="text-xs tracking-widest mb-6">Help</h2>
          <ul class="space-y-3 text-sm">
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Customer Service</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Shipping Returns</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Size guide</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Contact us</router-link></li>
          </ul>
        </div>
        <!-- About Section -->
        <div>
          <h2 class="text-xs tracking-widest mb-6">About</h2>
          <ul class="space-y-3 text-sm">
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Our story</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Sustainability</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Careers</router-link></li>
            <li><router-link to="#" class="hover:text-gray-500 transition-colors">Store locator</router-link></li>
          </ul>
        </div>
        <!-- Newsletter Section -->
        <div>
          <h2 class="text-xs tracking-widest mb-6">New Sletter</h2>
          <p class="text-sm mb-4">New Sletter</p>
          <form @submit.prevent="subscribe" class="mb-6">
            <input
              v-model="email"
              type="email"
              :placeholder="'enter your email'"
              class="w-full p-3 border border-gray-200 text-sm mb-3"
              required
            />
            <button
              type="submit"
              class="w-full bg-black text-white p-3 text-sm hover:bg-gray-900 transition-colors"
            >
              Subcribe
            </button>
          </form>
        </div>
      </div>
      <!-- Bottom Links -->
      <div class="mt-16 pt-8 border-t border-gray-100">
        <div class="flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
          <div class="mb-4 md:mb-0 space-x-6">
            <router-link to="#" class="hover:text-gray-500 transition-colors">Privacy Police</router-link>
            <router-link to="#" class="hover:text-gray-500 transition-colors">Terms of Service</router-link>
            <router-link to="#" class="hover:text-gray-500 transition-colors">Accessibility</router-link>
          </div>
          <div>Copyright</div>
        </div>
      </div>
    </div>
    <ScrollingText />
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import ScrollingText from '../components/ScrollingText.vue'

const email = ref('')

const subscribe = () => {
  
  alert(`Subscribed with email: ${email.value}`)
  email.value = ''
}
</script>
