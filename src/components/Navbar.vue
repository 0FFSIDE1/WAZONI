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
          <ul
            v-show="dropdownOpen"
            class="absolute left-0 mt-6 z-10 menu menu-sm dropdown-content shadow bg-base-100 rounded w-52"
            @click="closeDropdown"
          >
            <li><a href="#our-story">Our Story</a></li>
            <li><a href="#why-us">Why Choose Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
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
        <ul class="menu menu-horizontal gap-6 text-lg">
          <li><a href="#our-story">Our Story</a></li>
          <li><a href="#why-us">Why Choose Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>

        <!-- Call Icon -->
        <a href="tel:+2349025118665" class="btn btn-ghost btn-circle" aria-label="Call us">
          <PhoneIcon class="w-6 h-6" />
        </a>
      </div>
    </nav>
  </header>
</template>
