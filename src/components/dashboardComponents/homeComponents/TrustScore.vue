<script setup>
import { ref, watch, computed } from 'vue'
import { StarIcon as SolidStar } from '@heroicons/vue/24/solid'
import { StarIcon as OutlineStar } from '@heroicons/vue/24/outline'
import { StarIcon as HalfStar } from '@heroicons/vue/24/solid' // optional custom or use svg

const trustScore = ref(9.5)
const animatedScore = ref(0)

// Animate score on change
watch(trustScore, (newScore) => {
  const startTime = performance.now()
  const duration = 1000
  const startVal = animatedScore.value

  const animate = (time) => {
    const progress = Math.min((time - startTime) / duration, 1)
    animatedScore.value = +(startVal + (newScore - startVal) * progress).toFixed(1)
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}, { immediate: true })

// For progress bar
const progress = computed(() => (trustScore.value / 10) * 100)

// For star rating (e.g. 4.3 stars)
const starRating = computed(() => trustScore.value / 2)
</script>

<template>
    
  <div class="flex flex-col bg-neutral shadow-xl card justify-center items-center w-64 py-4 h-[300px] md:w-76">
    <!-- Circle Progress -->
    <div class="relative w-36 h-36 rounded-full">
      <svg class="w-full h-full transform -rotate-90">
        <circle
          class="text-gray-200"
          stroke-width="10"
          stroke="currentColor"
          fill="transparent"
          r="80"
          cx="92"
          cy="92"
        />
        <circle
          class="text-green-500"
          :stroke-dasharray="2 * Math.PI * 80"
          :stroke-dashoffset="2 * Math.PI * 80 * (1 - progress / 100)"
          stroke-width="10"
          stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r="80"
          cx="92"
          cy="92"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-2xl font-bold text-green-600">{{ animatedScore }}</span>
        <span class="text-sm text-white">Trust Score</span>
      </div>
    </div>

    <!-- Star Rating (Heroicons) -->
    <div class="flex justify-center items-center space-x-1 text-yellow-400">
      <template v-for="i in 5" :key="i">
        <component
          :is="i <= Math.floor(starRating) ? SolidStar : (i - starRating < 1 && i - starRating > 0 ? HalfStar : OutlineStar)"
          class="w-6 h-6"
        />
      </template>
    </div>
  </div>
</template>
