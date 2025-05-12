<template>
  <input type="checkbox" class="modal-toggle" :id="modalId" v-model="isVisible" />

  <div class="modal" role="dialog">
    <div class="modal-box text-center px-6 py-10 rounded-xl">
      <div class="mb-4">
        <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h3 class="text-2xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-base text-neutral-content">{{ message }}</p>
      <div class="mt-6">
        <button class="btn btn-primary w-full" @click="closeModal">Okay</button>
      </div>
    </div>
    <label class="modal-backdrop" :for="modalId"></label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: "You Sabi Better Thing — You're on the List 🎉"
  },
  message: {
    type: String,
    default: 'Thank you for joining the waitlist. We’ll reach out as soon as we launch. Stay tuned and follow us for updates!.'
  },
  modalId: {
    type: String,
    default: 'success_modal'
  }
})

const isVisible = ref(false)

const openModal = () => {
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
}

defineExpose({ openModal, closeModal })
</script>
