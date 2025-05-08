<template>
  <div class="min-h-screen w-full">
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
  