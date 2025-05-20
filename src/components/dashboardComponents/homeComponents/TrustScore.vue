<script setup>
import { ref, watch, computed } from 'vue'
import { StarIcon as SolidStar } from '@heroicons/vue/24/solid'
import { StarIcon as OutlineStar } from '@heroicons/vue/24/outline'
// Replace HalfStar with a custom icon if needed

const trustScore = ref(9.5)
const animatedScore = ref(0)

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

const progress = computed(() => (trustScore.value / 10) * 100)
const starRating = computed(() => trustScore.value / 2)
</script>

<template>
  <div class="bg-neutral rounded-xl shadow-xl w-[90%] max-w-sm mx-auto p-6 flex flex-col justify-center items-center space-y-4">
    
    <!-- Circle Progress -->
    <div class="relative w-32 h-32 sm:w-36 sm:h-36">
      <svg viewBox="0 0 180 180" class="w-full h-full transform -rotate-90">
        <circle
          class="text-gray-300"
          stroke-width="10"
          stroke="currentColor"
          fill="transparent"
          r="80"
          cx="90"
          cy="90"
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
          cx="90"
          cy="90"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-xl sm:text-2xl font-bold text-green-600">{{ animatedScore }}</span>
        <span class="text-xs sm:text-sm text-white">Trust Score</span>
      </div>
    </div>

    <!-- Star Rating -->
    <div class="flex justify-center items-center space-x-1 text-yellow-400">
      <template v-for="i in 5" :key="i">
        <component
          :is="i <= Math.floor(starRating) ? SolidStar : (i - starRating < 1 && i - starRating > 0 ? OutlineStar : OutlineStar)"
          class="w-5 h-5 sm:w-6 sm:h-6"
        />
      </template>
    </div>
  </div>
</template>
