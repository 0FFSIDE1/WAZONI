<template>
  <Preloader v-if="isLoading" />
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
            <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>

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
    <Modal ref="modalRef" title="Thanks for subscribing!" message="You’ll now receive early updates, event invites, and exclusive news straight to your inbox. Stay tuned—exciting things are coming!"/>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api/axios';
import Modal from '@/components/Modal.vue';
import { useToast } from 'vue-toastification';
import Preloader from '@/components/utils/Preloader.vue';

const email = ref('');
const whatsapp = ref('');
const toast = useToast();
const modalRef = ref(null);
const errors = ref({});
const isLoading = ref(false);
const validateForm = () => {
  errors.value = {}

  let isValid = true

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value || !emailPattern.test(email.value)) {
    errors.value.email = 'Please enter a valid email address.'
    isValid = false
  }

  // Optional: only validate whatsapp if it's provided
  if (whatsapp.value && whatsapp.value.length > 15) {
    errors.value.whatsapp = 'WhatsApp number is too long.'
    isValid = false
  }
  return isValid
}

const submitForm = async () => {
  if (validateForm()) {
    isLoading.value = true;
    try {
      const response = await api.post('notify-list/', {
        email: email.value,
        whatsappNo: whatsapp.value,
      })

      // Show modal on success
      modalRef.value?.openModal()

      // Reset form
      form.value = {
        email: '',
       whatsapp: '',
        
      }

    } catch (err) {
      if (err.response && err.response.data) {
        errors.value = err.response.data
        toast.error('Something went wrong. Please try again.')
      } else {
        toast.error('Something went wrong, try again later or contact us.')
      }
    } finally {
      isLoading.value = false // Always stop loader
    }
  }
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
  