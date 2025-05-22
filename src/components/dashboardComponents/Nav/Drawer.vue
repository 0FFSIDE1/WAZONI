<script setup>
import { ref } from 'vue'
import {
  BellAlertIcon,
  HomeIcon,
  HomeModernIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  CogIcon,
  UserGroupIcon,
  PowerIcon,
  FolderPlusIcon,
  ShoppingCartIcon,
  WalletIcon
} from "@heroicons/vue/24/outline"
import { logoutUser } from '@/composables/auth'

const handleLogout = async () => {
  await logoutUser();
}
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
          <li>
            <router-link to="/vendor/dashboard/">
              <WalletIcon class="w-6" />Wallet<kbd class="kbd kbd-xs">Coming Soon</kbd>
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
                <li><router-link to="/vendor/dashboard/products/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>
Products</router-link></li>
                <!-- <li><router-link to="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
Add Products</router-link></li> -->
                <li><router-link to="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg>
Products Stats <kbd class="kbd kbd-xs">Coming Soon</kbd></router-link></li>
              </ul>
            </transition>
          </li>
          <!-- Transactions -->
          <li>
            <router-link to="/vendor/dashboard/transactions/"><BanknotesIcon class="w-6" />Sales</router-link>
          </li>
          <!-- Orders -->
          <li>
            <router-link to="/vendor/dashboard/orders/"><ShoppingBagIcon class="w-6" />Orders<kbd class="kbd kbd-xs">Coming Soon</kbd></router-link>
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
                <li><router-link to="/vendor/dashboard/parcels/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>

Delivery Management</router-link></li>
<li><router-link to="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
</svg>
Track Parcel</router-link></li>
                <li><router-link to="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
Request Delivery<kbd class="kbd kbd-xs">Coming Soon</kbd></router-link></li>
                
              </ul>
            </transition>
          </li>
           <!-- Customers -->
          <li>
            <router-link to="/vendor/dashboard/customers/"><UserGroupIcon class="w-6" />Customers</router-link>
          </li>
          <li>
            <router-link to="/vendor/dashboard/notifications/"><BellAlertIcon class="w-6" />Notifications</router-link>
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
                <li><router-link to="/vendor/dashboard/profile/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
 Edit Profile</router-link></li>
                <li><router-link to="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
Enable 2FA<kbd class="kbd kbd-xs">Coming Soon</kbd></router-link></li>
                <!-- <li><router-link to="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
Renew Plan<kbd class="kbd kbd-xs">Coming Soon</kbd></router-link></li> -->
              </ul>
            </transition>
          </li>
          <li class="hidden md:block">
            <router-link to="/vendor/dashboard/support/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>Support Center</router-link>
          </li>
        </ul>

        <!-- Footer Links -->
        <div class="absolute bottom-2 left-4 mt-4">
          <ul class="flex flex-row items-center text-sm justify-around gap-16">
            <li>
              <router-link class="flex items-center gap-2" to="/">
                <HomeIcon class="w-4" />Website
              </router-link>
            </li>
            <li>
             
                <button @click="handleLogout" class="btn-logout btn-transparent flex items-center gap-2"><PowerIcon class="w-4" />Logout</button>
              
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
