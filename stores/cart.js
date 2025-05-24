import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(product, quantity = 1) {
      const existing = this.items.find(item => item.slug === product.slug)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity})
      }
      this.saveToLocalStorage()
    },
    removeFromCart(slug) {
      this.items = this.items.filter(item => item.slug !== slug)
      this.saveToLocalStorage()
    },
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    isInCart(slug) {
  return this.items.some(item => item.slug === slug)
},
    loadFromLocalStorage() {
      const saved = localStorage.getItem('cart')
      if (saved) {
        this.items = JSON.parse(saved)
      }
    }
  }
})
