<template>
    <div class="navbar sticky top-0 z-50 bg-base-100 h-24 shadow-lg shadow-neutral-content">
      <div class="navbar-start">
        <div class="dropdown">
          <Hamburger @toggle="dropdownOpen = $event" />
          <ul
            v-show="dropdownOpen"
            tabindex="0"
            class="menu menu-md dropdown-content mt-6 z-10 shadow bg-base-100 rounded-box w-52">
            <li><a @click="closeDropdown">Our Story</a></li>
            <li><a @click="closeDropdown">About</a></li>
            <li><a @click="closeDropdown">Why Choose Us</a></li>
            
          </ul>
        </div>
      </div>
  
      <div class="navbar-center">
        <a class="btn btn-ghost text-2xl">WAZONI</a>
      </div>
  
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <component :is="icon" />
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Hamburger from '@/components/utils/Hamburger.vue'
  import { PhoneIcon } from '@heroicons/vue/24/outline'
  
  const dropdownOpen = ref(false)
  const icon = PhoneIcon
  function closeDropdown() {
    dropdownOpen.value = false
  }
  </script>
  