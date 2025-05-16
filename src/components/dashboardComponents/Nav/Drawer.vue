<script setup>
import { ref } from 'vue'
import {
  HomeIcon,
  HomeModernIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  CogIcon,
  UserGroupIcon,
  PowerIcon,
  FolderPlusIcon,
  ShoppingCartIcon
} from "@heroicons/vue/24/outline"

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const inventoryOpen = ref(false)
const settingsOpen = ref(false)
</script>

<template>
  <transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-40 flex">
      <!-- Backdrop -->
      <div class="fixed inset-0  backdrop-blur-sm bg-base-100/10" @click="$emit('close')"></div>

      <!-- Side Drawer -->
      <aside class="relative w-72 bg-base-200 text-base-content p-4 shadow-lg z-50">
        <button @click="$emit('close')" class="btn btn-sm btn-circle absolute top-2 right-2">✕</button>

        <h3 class="text-center border-b-2 p-4">
          <a href="/" class="text-2xl font-bold" aria-label="Homepage">WAZONI</a>
        </h3>

        <ul class="menu menu-xs space-y-3 pt-8">
          <li>
            <router-link to="/vendor/dashboard/">
              <HomeModernIcon class="w-6" />Dashboard
            </router-link>
          </li>

          <!-- Inventory Dropdown -->
          <li>
            <button class="flex items-center justify-between w-full" @click="inventoryOpen = !inventoryOpen">
              <span class="flex items-center gap-2">
                <FolderPlusIcon class="w-6" />Inventory
              </span>
              <svg
                :class="{ 'rotate-180': inventoryOpen }"
                class="w-4 h-4 transition-transform duration-300"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition name="fade">
              <ul v-if="inventoryOpen" class="pl-6 mt-2 space-y-2 text-sm">
                <li><router-link to="#">All Products</router-link></li>
                <li><router-link to="#">Add Products</router-link></li>
                <li><router-link to="#">Products Stats</router-link></li>
              </ul>
            </transition>
          </li>

          <li>
            <router-link to="#"><ShoppingBagIcon class="w-6" />Orders</router-link>
          </li>
          <li>
            <router-link to="#"><BanknotesIcon class="w-6" />Transactions</router-link>
          </li>
          <li>
            <router-link to="#"><UserGroupIcon class="w-6" />Customers</router-link>
          </li>
           <li>
            <router-link to="#"><ShoppingCartIcon class="w-6" />Delivery</router-link>
          </li>
         
          <li>
            <button class="flex items-center justify-between w-full" @click="settingsOpen = !settingsOpen">
              <span class="flex items-center gap-2">
                <CogIcon class="w-6" />Settings
              </span>
              <svg
                :class="{ 'rotate-180': settingsOpen }"
                class="w-4 h-4 transition-transform duration-300"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition name="fade">
              <ul v-if="settingsOpen" class="pl-6 mt-2 space-y-2 text-sm">
                <li><router-link to="#">Edit Profile</router-link></li>
                <li><router-link to="#">Enable 2FA</router-link></li>
                <li><router-link to="#">Renew Subscription</router-link></li>
              </ul>
            </transition>
          </li>
        </ul>

        <!-- Bottom Links -->
        <div class="absolute bottom-12">
          <ul class="flex flex-row items-center text-sm justify-between gap-24">
            <li>
              <router-link class="flex flex-row items-center gap-2" to="/">
                <HomeIcon class="w-4" />Website
              </router-link>
            </li>
            <li>
              <router-link class="flex flex-row items-center gap-2" to="#">
                <PowerIcon class="w-4" />Logout
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
