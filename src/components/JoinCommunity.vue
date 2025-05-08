<template>
    <section data-aos="zoom-in-up" class="font-poppins bg-primary-content py-20 px-4 text-center">
      <div class="max-w-xl mx-auto">
        <transition name="fade" appear>
          <div>
            <h2 class="text-3xl md:text-4xl font-bold  mb-4">
              Stay Ahead. Join the Community.
            </h2>
            <p class="text-base text-primary mb-8">
              Be the first to know when we launch, get invites to private vendor events,
              and join a tribe of smart sellers like you.
            </p>

          <form
            @submit.prevent="submitForm"
            class="flex flex-col gap-4 text-left"
          >
            <input
              v-model="email"
              type="email"
              required
              placeholder="Email address"
              class="input input-bordered w-full"
            />

            <input
              v-model="whatsapp"
              type="tel"
              placeholder="WhatsApp number (optional)"
              class="input input-bordered w-full"
            />

            <button
              type="submit"
              class="btn btn-primary w-full text-dark text-lg"
            >
              Notify Me
            </button>
          </form>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const whatsapp = ref('')

function submitForm() {
  console.log('Notify request:', {
    email: email.value,
    whatsapp: whatsapp.value,
  })

  // Reset form fields
  email.value = ''
  whatsapp.value = ''
  alert('You’ll be notified. Thanks for joining!')
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.8s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
  