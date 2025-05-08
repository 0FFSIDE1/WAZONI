<script setup>
import { ref } from 'vue'

const form = ref({
  fullName: '',
  businessName: '',
  category: '',
  type: '',
  scale: '',
  phone: '',
  email: '',
  delivery: '',
  quantity: ''
})

const errors = ref({})

const categories = [
  'Fashion', 'Food & Beverages', 'Electronics', 'Beauty & Skincare',
  'Home Decor', 'Fitness & Wellness', 'Education', 'Other'
]

const validateForm = () => {
  errors.value = {}
  if (!form.value.fullName) errors.value.fullName = 'Full name is required.'
  if (!form.value.businessName) errors.value.businessName = 'Business name is required.'
  if (!form.value.category) errors.value.category = 'Please select a business category.'
  if (!form.value.type) errors.value.type = 'Select your business type.'
  if (!form.value.scale) errors.value.scale = 'Select the scale of your brand.'
  if (!form.value.email) errors.value.email = 'Enter your email'
  if (!form.value.phone) errors.value.phone = 'Enter your email'
  if (!form.value.quantity) errors.value.quantity = 'Enter your email'
  if (!form.value.delivery) errors.value.delivery = 'Please answer the delivery question.'
  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (validateForm()) {
    alert('Waitlist submitted successfully!')
    // Submit logic here
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-100 flex flex-col md:flex-row">
    
    <!-- Left: Form -->
    <div class="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl md:text-4xl font-bold text-primary mb-3">Be The First. Be Visible. 📢</h1>
        <p class="text-base-content/70 mb-5 text-sm md:text-base">
          Join our community of smart vendors. Get notified before we launch, and never miss an update or event.
        </p>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Full Name -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Full Name *</legend>
              <input v-model="form.fullName" type="text" class="input w-full" placeholder="Your full name" />
              <p v-if="errors.fullName" class="text-error text-sm">{{ errors.fullName }}</p>
            </fieldset>

             <!-- Business Name -->
          <fieldset class="fieldset">
              <legend class="fieldset-legend">Brand Name *</legend>
              <input v-model="form.businessName" type="text" class="input w-full" placeholder="Your business name"  />
              <p v-if="errors.businessName" class="text-error text-sm">{{ errors.businessName }}</p>
            </fieldset>

           <!-- Email -->
           <fieldset class="fieldset">
            <legend class="fieldset-legend">Email *</legend>
            <input v-model="form.email" type="tel" placeholder="youremail@example.com" class="input input-bordered w-full" />
            <p v-if="errors.email" class="text-error text-sm">{{ errors.email }}</p>
          </fieldset>

          <!-- WhatsApp (Optional) -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">WhatsApp Number *</legend>
            <input v-model="form.phone" type="tel" placeholder="+234..." class="input input-bordered w-full" />
             <p v-if="errors.phone" class="text-error text-sm">{{ errors.phone }}</p>
          </fieldset>
    
          <!-- Business Category -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Brand Category *</legend>
           
            <input list="categories" v-model="form.category" placeholder="Choose or type..." class="input input-bordered w-full" />
            <datalist id="categories">
              <option v-for="item in categories" :key="item" :value="item" />
            </datalist>
            <p v-if="errors.category" class="text-error text-sm">{{ errors.category }}</p>
          </fieldset>

          <!-- Type of Business -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Type of Brand *</legend>
            <div class="flex flex-wrap gap-3">
              <label class="cursor-pointer">
                <input type="radio" v-model="form.type" value="Physical Store" class="radio radio-primary" />
                <span class="ml-2">Physical Store</span>
              </label>
              <label class="cursor-pointer">
                <input type="radio" v-model="form.type" value="Online Store" class="radio radio-primary" />
                <span class="ml-2">Online Store</span>
              </label>
              <label class="cursor-pointer">
                <input type="radio" v-model="form.type" value="Both" class="radio radio-primary" />
                <span class="ml-2">Both</span>
              </label>
            </div>
            <p v-if="errors.type" class="text-error text-sm">{{ errors.type }}</p>
          </fieldset>

          <!-- Scale -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">How big is your brand? *</legend>
            <select v-model="form.scale" class="select w-full">
              <option disabled value="">Select one</option>
              <option>Just starting out</option>
              <option>Growing steadily</option>
              <option>Established brand</option>
            </select>
          </fieldset>

          <!-- Scale -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">How much much product do you have? *</legend>
            <select v-model="form.quantity" class="select w-full">
              <option disabled value="">Select one</option>
              <option>10 - 100</option>
              <option>101 - 1000</option>
              <option>More than 1000</option>
            </select>
          </fieldset>

          <!-- Deliver outside location -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Would you deliver outside your location? *</legend>
            <div class="flex gap-4">
              <label class="cursor-pointer">
                <input type="radio" v-model="form.delivery" value="Yes" class="radio radio-success" />
                <span class="ml-2">Yes</span>
              </label>
              <label class="cursor-pointer">
                <input type="radio" v-model="form.delivery" value="No" class="radio radio-error" />
                <span class="ml-2">No</span>
              </label>
            </div>
            <p v-if="errors.delivery" class="text-error text-sm">{{ errors.delivery }}</p>
          </fieldset>

          <!-- Submit -->
          <div class="pt-3">
            <button class="btn btn-primary w-full">Join Waitlist</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Right: Illustration (hidden on small screens) -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-base-100 to-base-300 items-center justify-center relative overflow-hidden">
      <div class="w-full h-full absolute top-0 left-0 opacity-20 mask mask-triangle-3 bg-white"></div>
      <img
        src="https://undraw.co/api/illustrations/undraw_online_shopping_re_k1sv.svg"
        alt="Online business illustration"
        class="max-w-md z-10"
      />
    </div>
  </div>
</template>
