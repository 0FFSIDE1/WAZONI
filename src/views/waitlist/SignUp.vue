<script setup>
import { ref } from 'vue'
import api from '@/api/axios'
import Modal from '@/components/Modal.vue'
import { useToast } from 'vue-toastification';
import Preloader from '@/components/utils/Preloader.vue';


const isLoading = ref(false);
const form = ref({
  fullName: '',
  brand_name: '',
  brand_category: '',
  brand_type: '',
  brand_scale: '',
  phone: '',
  email: '',
  delivery_question: '',
  quantity: ''
})
const toast = useToast()
const errors = ref({})
const modalRef = ref(null)

const categories = [
  'Fashion', 'Food & Beverages', 'Electronics', 'Beauty & Skincare',
  'Home Decor', 'Fitness & Wellness', 'Education', 'Others'
]

const validateForm = () => {
  errors.value = {}
  if (!form.value.fullName) errors.value.fullName = 'Full name is required.'
  if (!form.value.brand_name) errors.value.brand_name = 'Brand name is required.'
  if (!form.value.brand_category) errors.value.brand_category = 'Please select a brand category.'
  if (!form.value.brand_type) errors.value.brand_type = 'Select your brand type.'
  if (!form.value.brand_scale) errors.value.brand_scale = 'Tell us how big your brand is.'
  if (!form.value.email) errors.value.email = 'Enter your email'
  if (!form.value.phone) errors.value.phone = 'Enter your phone number eg. +234.....'
  if (!form.value.quantity) errors.value.quantity = 'Please answer the question'
  if (!form.value.delivery_question) errors.value.delivery_question = 'Please answer the delivery question.'
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (validateForm()) {
    isLoading.value = true;
    try {
      const response = await api.post('waitlist/', {
        fullName: form.value.fullName,
        brand_name: form.value.brand_name,
        brand_category: form.value.brand_category,
        brand_type: form.value.brand_type,
        brand_scale: form.value.brand_scale,
        phone: form.value.phone,
        email: form.value.email,
        delivery_question: form.value.delivery_question,
        quantity: form.value.quantity
      })

      // Show modal on success
      modalRef.value?.openModal()

      // Reset form
      form.value = {
        fullName: '',
        brand_name: '',
        brand_category: '',
        brand_type: '',
        brand_scale: '',
        phone: '',
        email: '',
        delivery_question: '',
        quantity: ''
      }

    } catch (err) {
      if (err.response && err.response.data) {
        errors.value = err.response.data
        toast.error('Some info are incorrect. Please try again.')
      } else {
        toast.error('Something went wrong, try again later or contact us.')
      }
    } finally {
      isLoading.value = false // Always stop loader
    }
  }
}


</script>

<template>
  <Preloader v-if="isLoading" />
  <div class="font-poppins min-h-screen bg-base-100 flex flex-col md:flex-row">
    
    <!-- Left: Form -->
    <div class="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl py-5 md:text-4xl font-bold text-primary mb-3" id="waitlist-title">Be The First. Be Visible. 📢</h1>
        <p class="text-base-content/70 mb-5 text-sm md:text-base" id="waitlist-content">
          Join our community of smart vendors. Get notified before we launch, and never miss an update or event.
        </p>

        <form @submit.prevent="submitForm" class="space-y-4" id="waitlist-form">
          <!-- Full Name -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Full Name *</legend>
              <input id="fullName" v-model="form.fullName" required type="text" class="input w-full" placeholder="Your full name" :aria-invalid="!!errors.fullName" aria-required="true" :aria-describedby="errors.fullName ? 'fullNameError' : null" autocomplete="name"/>
              <p v-if="errors.fullName" role="alert" id="fullNameError" class="text-error text-sm">{{ errors.fullName }}</p>
            </fieldset>

             <!-- Business Name -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Brand Name *</legend>
              <input id="brand name" :aria-invalid="!!errors.brand_name" aria-required="true" :aria-describedby="errors.brand_name ? 'brandnameError' : null"  v-model="form.brand_name" required type="text" class="input w-full" placeholder="Your business name"  />
              <p v-if="errors.brand_name" role="alert" id="brandnameError" class="text-error text-sm">{{ errors.brand_name }}</p>
            </fieldset>

           <!-- Email -->
           <fieldset class="fieldset">
            <legend class="fieldset-legend">Email *</legend>
            <input id="email" v-model="form.email" :aria-invalid="!!errors.email" aria-required="true" :aria-describedby="errors.email ? 'emailError' : null" autocomplete="email" type="email" placeholder="youremail@example.com" class="input input-bordered w-full" />
            <p v-if="errors.email" id="emailError" role="alert" class="text-error text-sm">{{ errors.email }}</p>
          </fieldset>

          <!-- WhatsApp (Optional) -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">WhatsApp Number *</legend>
            <input id="phone" v-model="form.phone" required :aria-invalid="!!errors.phone" aria-required="true" :aria-describedby="errors.phone ? 'phoneError' : null" autocomplete="tel" type="tel" placeholder="+234..." class="input input-bordered w-full" />
             <p v-if="errors.phone" id="phoneError" role="alert" class="text-error text-sm">{{ errors.phone[0] }}</p>
          </fieldset>
    
          <!-- Business brand_category -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Brand Category *</legend>
            <input  id="brand category" list="categories" required :aria-invalid="!!errors.brand_category" aria-required="true" :aria-describedby="errors.brand_category ? 'brandcategoryError' : null" v-model="form.brand_category" placeholder="Select category...(if others, Please specify)" class="input input-bordered w-full" />
            <datalist id="categories">
              <option v-for="item in categories" :key="item" :value="item" />
            </datalist>
            <p v-if="errors.brand_category" id="brandcategoryError" role="alert" class="text-error text-sm">{{ errors.brand_category }}</p>
          </fieldset>

          <!-- brand_type of Business -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Type of Brand *</legend>
            <div class="flex flex-wrap gap-3">
              <label class="cursor-pointer">
                <input id="physical store" type="radio" v-model="form.brand_type" value="Physical Store" class="radio radio-primary" />
                <span class="ml-2">Physical Store</span>
              </label>
              <label class="cursor-pointer">
                <input id="online store" type="radio" v-model="form.brand_type" value="Online Store" class="radio radio-primary" />
                <span class="ml-2">Online Store</span>
              </label>
              <label class="cursor-pointer">
                <input type="radio" id="both" v-model="form.brand_type" value="Both" class="radio radio-primary" />
                <span class="ml-2">Both</span>
              </label>
            </div>
            <p v-if="errors.brand_type" class="text-error text-sm" role="alert">{{ errors.brand_type }}</p>
          </fieldset>

          <!-- brand_scale -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">How big is your brand? *</legend>
            <select id="scale_question" v-model="form.brand_scale" class="select w-full">
              <option disabled value="">Select one</option>
              <option>Just starting out</option>
              <option>Growing steadily</option>
              <option>Established brand</option>
            </select>
            <p v-if="errors.brand_scale" class="text-error text-sm" role="alert">{{ errors.brand_scale }}</p>
          </fieldset>

          <!-- brand_scale -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">How much product do you have? *</legend>
            <select id="quantity" v-model="form.quantity" class="select w-full">
              <option disabled value="">Select one</option>
              <option>10 - 100</option>
              <option>101 - 1000</option>
              <option>More than 1000</option>
            </select>
            <p v-if="errors.quantity" class="text-error text-sm" role="alert">{{ errors.quantity }}</p>
          </fieldset>

          <!-- Deliver outside location -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Would you deliver outside your location? *</legend>
            <div class="flex gap-4">
              <label class="cursor-pointer">
                <input id="yes" type="radio" v-model="form.delivery_question" value="Yes" class="radio radio-success" />
                <span class="ml-2">Yes</span>
              </label>
              <label class="cursor-pointer">
                <input id="no" type="radio" v-model="form.delivery_question" value="No" class="radio radio-error" />
                <span class="ml-2">No</span>
              </label>
            </div>
            <p v-if="errors.delivery_question" class="text-error text-sm" role="alert">{{ errors.delivery_question }}</p>
          </fieldset>

          <!-- Submit -->
          <div class="pt-3">
            <button class="btn btn-primary w-full">Join Waitlist</button>
          </div>
        </form>
      </div>
    </div>
    <Modal ref="modalRef"/>

    <!-- Right: Illustration (hidden on small screens) -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-base-100 to-base-300 items-center justify-center relative overflow-hidden">
      <div class="w-full h-full absolute top-0 left-0 opacity-20 mask mask-triangle-3 bg-white"></div>
      <img
        src="https://undraw.co/api/illustrations/undraw_online_shopping_re_k1sv.svg"
        alt="Online business illustration"
        class="max-w-md z-10"
        loading="lazy"
      />
    </div>
  </div>
</template>
