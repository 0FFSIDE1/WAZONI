<template>
  <button class="btn btn-circle swap swap-rotate" @click="toggle">
    <svg
      v-if="!isOpen"
      class="swap-off fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 512 512">
      <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
    </svg>
    <svg
      v-else
      class="swap-off fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 512 512">
      <polygon
        points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
    </svg>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const emit = defineEmits(['toggle'])

function toggle() {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}
</script>
