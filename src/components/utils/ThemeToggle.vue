<template>
    <label class="flex cursor-pointer gap-2">
  <svg
    v-if="theme === 'caramellatte'"
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <input type="checkbox" :checked="theme === 'dark'"
      @change="toggleTheme"
      aria-label="Toggle theme" value="synthwave" class="toggle theme-controller w-8 h-4" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
</template>
<script setup>
import { ref, watchEffect } from 'vue'

// Set theme from localStorage or system preference
const getInitialTheme = () => {
  return localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'luxury' : 'caramellatte');
}

const theme = ref(getInitialTheme())

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
})

// Toggle between caramelLatte and luxury theme
const toggleTheme = () => {
  theme.value = theme.value === 'luxury' ? 'caramellatte' : 'luxury'
}

</script>
