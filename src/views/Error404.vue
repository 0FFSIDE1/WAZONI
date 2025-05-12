<template>
  <div class="font-poppins flex items-center justify-center h-screen text-center px-4">
    <div>
      <h1 class="text-5xl font-bold mb-4 text-red-600">404</h1>
      <p class="text-xl mb-2">Oops! Page not found.</p>
      <p class="text-sm mb-6">Redirecting to homepage in <span class="text-primary text-3xl"><br>00:<span v-if="countdown < 10">0</span>{{ countdown }}</span></p>
      <router-link to="/" class="underline font-semibold">Back to home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(10)

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
})
</script>
