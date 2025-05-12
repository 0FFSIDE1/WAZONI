<script setup>
import { ref } from 'vue'
import Hamburger from '@/components/utils/Hamburger.vue'
import { PhoneIcon } from '@heroicons/vue/24/outline'

const dropdownOpen = ref(false)
function closeDropdown() {
  dropdownOpen.value = false
}
</script>

<template>
  <header class="font-poppins sticky top-0 z-50">
    <nav
      class="navbar bg-base-100 h-24 shadow-lg shadow-neutral-content"
      role="navigation"
      aria-label="Main Navigation"
    >
      <!-- Mobile (Small Screen) Navbar -->
      <div class="flex w-full items-center justify-between md:hidden">
        <!-- Hamburger -->
        <div class="dropdown relative">
          <Hamburger @toggle="dropdownOpen = $event" />
              <transition name="fade-slide">
                <div
                  v-show="dropdownOpen"
                  class="lg:hidden absolute flex flex-col menu menu-xl mt-6 border-t shadow-md z-50 w-56 bg-base-100"
                >
                  <router-link to="/" class="w-full px-2 py-2"  aria-label="home">Home</router-link>
                  <router-link to="/#our-story" class="w-full px-2 py-2" aria-label="our story">Our Story</router-link>
                  <router-link to="/#why-us" class="w-full px-2 py-2"  aria-label="coming soon">Coming Soon</router-link>
                  <router-link to="/#contact" class="w-full px-2 py-2" aria-label="contact us">Contact Us</router-link>
                </div>
              </transition>
        </div>

        <!-- Centered Logo -->
        <a
          href="/"
          class="text-2xl font-bold"
          aria-label="Homepage"
        >
          WAZONI
        </a>

        <!-- Call Icon -->
        <a href="tel:+2349025118665" class="btn btn-ghost btn-circle" aria-label="Call us">
          <PhoneIcon class="w-6 h-6" />
        </a>
      </div>

      <!-- Desktop (md+) Navbar -->
      <div class="hidden md:flex w-full items-center justify-between px-8">
        <!-- Logo aligned left -->
        <a href="/" class="text-2xl font-bold" aria-label="Homepage">
          WAZONI
        </a>

        <!-- Menu -->
        <ul class="menu menu-horizontal gap-6 text-md">
          
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/#our-story">Our Story</router-link></li>
          <li><router-link to="/#why-us">Why Choose Us</router-link></li>
          <li><router-link to="/#contact">Contact Us</router-link></li>

        </ul>

        <!-- Call Icon -->
        <a href="tel:+2349025118665" class="btn btn-ghost btn-circle" aria-label="Call us">
          <PhoneIcon class="w-6 h-6" />
        </a>
      </div>
      <ThemeToggle/>
    </nav>
  </header>
</template>
<script scoped>
import ThemeToggle from '@/components/utils/ThemeToggle.vue';
</script>
<style scoped>
.fade-slide-enter-active {
  transition: all 0.3s ease;
}
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
