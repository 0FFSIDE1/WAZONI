<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import Preloader from '@/components/utils/Preloader.vue'
import { loginUser } from '@/composables/auth'

const isLoading = ref(false)
const form = ref({
  email: '',
  password: '',
})
const errors = ref({})
const toast = useToast()

const validateForm = () => {
  errors.value = {}
  if (!form.value.email) errors.value.email = 'Please enter your email address.'
  if (!form.value.password) errors.value.password = 'Enter your password.'
  if (form.value.password && form.value.password.length < 8)
    errors.value.password = 'Password must be at least 8 characters long.'

  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    await loginUser({ email: form.value.email, password: form.value.password })
    toast.success('Login successful!')
   
  } catch (err) {
    if (err.response?.data) {
      errors.value = err.response.data
      toast.error(err.response.data.message || 'Invalid credentials.')
    } else {
      toast.error('Something went wrong, try again later.')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Preloader v-if="isLoading" />
  <div class="font-poppins min-h-screen bg-base-100 flex flex-col md:flex-row">
    
    <!-- Left: Form -->
    <div class="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl py-5 flex gap-4 items-center md:text-4xl font-bold text-primary mb-3" id="login-title"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
</svg>
LOGIN</h1>
        <p class="text-base-content/70 mb-5 text-sm md:text-base" id="login-content">
          Enter your email and password to access your account. If you don't have an account, you can register for free.
        </p>

        <form @submit.prevent="submitForm" class="space-y-4" id="login-form">
           <!-- Email -->
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Email *</legend>
                    <label class="input validator w-full">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input type="email" placeholder="mail@site.com" class="w-full"  required v-model="form.email" :aria-invalid="!!errors.email" aria-required="true" :aria-describedby="errors.email ? 'emailError' : null" autocomplete="email" />
                  </label>
                  <div class="validator-hint hidden">Enter valid email address</div>
            </fieldset>
            
           
          <!-- Password -->
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Password *</legend>
            <input id="password" v-model="form.password" :aria-invalid="!!errors.password" aria-required="true" :aria-describedby="errors.password ? 'passwordError' : null" type="password" placeholder="********" class="input input-bordered w-full" />
            <p v-if="errors.password" id="passwordError" role="alert" class="text-error text-xs">{{ errors.password }}</p>
          </fieldset>
          <!-- Remember Me -->
          <div class="flex items-center">
            <input type="checkbox" id="remember" class="checkbox checkbox-primary" />
            <label for="remember" class="ml-2 text-sm">Remember me</label>
          </div>
          <!-- Submit -->
          <div class="pt-3">
            <button class="btn btn-primary w-full">LOGIN</button>
          </div>
          <!-- Forgot Password -->
          <div class="text-sm text-primary mt-2">
            <a href="#" class="link link-primary">Forgot password?</a>
          </div>
          <!-- Register -->
          <div class="text-sm text-primary mt-2">
            <p>Don't have an account? <a href="#" class="link link-primary">Register</a></p>
          </div>
          <!-- Terms and Conditions -->
          <div class="text-sm text-primary mt-2">
            <p>By logging in, you agree to our <a href="#" class="link link-primary">Terms and Conditions</a>.</p>
          </div>
          <!-- Privacy Policy -->
          <div class="text-sm text-primary mt-2">
            <p>Read our <a href="#" class="link link-primary">Privacy Policy</a>.</p>
          </div>
          <!-- Google Login -->
          <div class="flex items-center justify-center mt-4">
            <button class="btn btn-outline btn-primary w-full">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" class="mr-2" />
              Login with Google
            </button>
          </div>
          <!-- OR -->
          <div class="text-center my-4">
            <span class="text-sm text-base-content/70">OR</span>
          </div>
          <!-- Facebook Login -->
          <div class="flex items-center justify-center">
            <button class="btn btn-outline btn-primary w-full">
              <img src="https://img.icons8.com/color/16/000000/facebook-new.png" alt="Facebook Logo" class="mr-2" />
              Login with Facebook
            </button>
          </div>
          <!-- Twitter Login -->
          <div class="flex items-center justify-center">
            <button class="btn btn-outline btn-primary w-full">
              <img src="https://img.icons8.com/color/16/000000/twitter--v1.png" alt="Twitter Logo" class="mr-2" />
              Login with Twitter
            </button>
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
        loading="lazy"
      />
    </div>
  </div>
</template>
