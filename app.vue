<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <Header />
     <NuxtPage /> 
    <Footer />

  </div>
</template>
<script setup>
import Header from '../Components/Header.vue'
import Footer from '../Components/Footer.vue'

useHead({
  title: 'Shop test',
})

</script>