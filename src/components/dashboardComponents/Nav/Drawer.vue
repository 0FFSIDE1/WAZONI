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

const props = defineProps({
  isOpen: Boolean,
  isDesktop: Boolean
})

const emit = defineEmits(['close'])

const inventoryOpen = ref(false)
const deliveryOpen = ref(false)
const settingsOpen = ref(false)
</script>

<template>
  <transition name="slide">
    <div
      v-if="isOpen || props.isDesktop"
      class="z-40"
      :class="props.isDesktop ? 'fixed top-0 bottom-0 left-0 w-72' : 'fixed inset-0 flex'"
    >
      <!-- Backdrop (Mobile Only) -->
      <div
        v-if="!props.isDesktop"
        class="fixed inset-0 backdrop-blur-sm bg-base-100/10"
        @click="emit('close')"
      />

      <!-- Sidebar -->
      <aside
        class="bg-base-200 text-base-content p-4 shadow-lg z-50 h-full w-72"
        :class="{ 'fixed top-0 left-0 bottom-0': props.isDesktop, 'relative': !props.isDesktop }"
      >
        <!-- Close button (Mobile Only) -->
        <button
          v-if="!props.isDesktop"
          @click="emit('close')"
          class="btn btn-sm btn-circle absolute top-2 right-2"
        >
          ✕
        </button>

        <!-- Brand -->
        <h3 class="text-center border-b-2 p-6">
          <a href="/" class="text-2xl font-bold">WAZONI</a>
        </h3>

        <!-- Main Menu -->
        <ul class="menu menu-xs space-y-3 pt-8">
          <!-- Dashboard -->
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
              <svg :class="{ 'rotate-180': inventoryOpen }" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="fade">
              <ul v-if="inventoryOpen" class="pl-6 mt-2 space-y-2 text-sm">
                <li><router-link to="#">All Products</router-link></li>
                <li><router-link to="#">Add Products</router-link></li>
                <li><router-link to="#">Product Stats</router-link></li>
              </ul>
            </transition>
          </li>

          <!-- Orders -->
          <li>
            <router-link to="#"><ShoppingBagIcon class="w-6" />Orders</router-link>
          </li>

          <!-- Transactions -->
          <li>
            <router-link to="#"><BanknotesIcon class="w-6" />Transactions</router-link>
          </li>

          <!-- Delivery Dropdown -->
          <li>
            <button class="flex items-center justify-between w-full" @click="deliveryOpen = !deliveryOpen">
              <span class="flex items-center gap-2">
                <ShoppingCartIcon class="w-6" />Delivery
              </span>
              <svg :class="{ 'rotate-180': deliveryOpen }" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="fade">
              <ul v-if="deliveryOpen" class="pl-6 mt-2 space-y-2 text-sm">
                <li><router-link to="#">Request Delivery</router-link></li>
                <li><router-link to="#">Track Parcel</router-link></li>
              </ul>
            </transition>
          </li>

          <!-- Customers -->
          <li>
            <router-link to="#"><UserGroupIcon class="w-6" />Customers</router-link>
          </li>

          <!-- Settings Dropdown -->
          <li>
            <button class="flex items-center justify-between w-full" @click="settingsOpen = !settingsOpen">
              <span class="flex items-center gap-2">
                <CogIcon class="w-6" />Settings
              </span>
              <svg :class="{ 'rotate-180': settingsOpen }" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <!-- Footer Links -->
        <div class="absolute bottom-12 left-4">
          <ul class="flex flex-row items-center text-sm gap-8">
            <li>
              <router-link class="flex items-center gap-2" to="/">
                <HomeIcon class="w-4" />Website
              </router-link>
            </li>
            <li>
              <router-link class="flex items-center gap-2" to="#">
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
/* Slide transition */
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

/* Fade dropdowns */
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
