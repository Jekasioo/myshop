import { defineStore } from 'pinia'


export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        slug: 'haven-coat',
        name: 'HAVEN Coat',
        price: 480,
        description: 'Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience.',
        image: 'https://blackwhitedenim.com/wp-content/uploads/2025/03/Samsoe-Samsoe-Safallon-Coat-in-Black-4.jpg',
      },
      {
         slug: 'nova-beret',
        name: 'NOVA Beret',
        price: 260,
        description: 'A bold reinterpretation of classic headwear. Texture, contrast, and avant-garde presence.',
        image: 'https://blackwhitedenim.com/wp-content/uploads/nc/2023/01/HAVEN-BLAZER-IN-BLACK-2.png',
      },
      {
        slug: 'obscura-coat',
        name: 'OBSCURA Coat',
        price: 540,
        description: 'A sculptural statement. Precision tailoring meets bold architectural form.',
        image: '/images/obscura-coat.jpg',
      },
      {
        slug: 'oversized-hoodie',
        name: 'OVERSIZED Hoodie',
        price: 541,
        description: 'A sculptural statement. Precision tailoring meets bold architectural form.',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      {
        slug: 'cargo-pants',
        name: 'CARGO PANTS',
        price: 24,
        description: 'A sculptural statement. Precision tailoring meets bold architectural form.',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      {
        slug: 'basic-tee',
        name: 'BASIC TREE',
        price: 24,
        description: 'A sculptural statement. Precision tailoring meets bold architectural form.',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
      {
        slug: 'denim-jacket',
        name: 'DENIM JACKET',
        price: 80,
        description: 'A sculptural statement. Precision tailoring meets bold architectural form.',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      },
    ],
    currentProduct: null
  }),
   actions: {
    setCurrentProduct(product) {
      this.currentProduct = product
    }
  }
})
