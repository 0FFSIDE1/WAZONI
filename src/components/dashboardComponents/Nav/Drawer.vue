<template>
  <transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-40 flex">
      <!-- Backdrop -->
      <div class="fixed inset-0  bg-opacity-40" @click="$emit('close')"></div>

      <!-- Side Drawer -->
      <aside class="relative w-72 bg-base-200 text-base-content p-4 shadow-lg z-50">
        <button @click="$emit('close')" class="btn btn-sm btn-circle absolute top-2 right-2">✕</button>
        <h3 class="text-center border-b-2 p-4"><a href="/" class="text-2xl font-bold" aria-label="Homepage">WAZONI</a></h3>
        <ul class="menu menu-xs space-y-3 pt-8">
          <li>
            <router-link to="/"><HomeModernIcon class="w-6"/>Dashboard</router-link>
          </li>
          <li>
            <router-link to="#"><FolderPlusIcon class="w-6"/>Inventory</router-link>
          </li>
          <li>
            <router-link to="#"><ShoppingBagIcon class="w-6"/>Orders</router-link>
          </li>
          <li>
            <router-link to="#"><BanknotesIcon class="w-6"/>Transactions</router-link>
          </li>
          <li>
            <router-link to="#"><UserGroupIcon class="w-6"/>Customers</router-link></li>
          <li>
            <router-link to="#"><CogIcon class="w-6"/>Settings</router-link>
          </li>
          <!-- <li>
              <router-link to="#"><PowerIcon class="w-6"/>Logout</router-link>
          </li> -->
         
         
          
        </ul>
        <div class="absolute bottom-12">
          <ul class="flex flex-row items-center text-sm justify-between gap-24">
            <li>
              <router-link class="flex flex-row items-center gap-2" to="#"><HomeIcon class="w-4"/>Website</router-link>
            </li>
            <li>
              <router-link class="flex flex-row items-center gap-2" to="#"><PowerIcon class="w-4"/>Logout</router-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { HomeIcon, HomeModernIcon, BuildingStorefrontIcon, ShoppingBagIcon, BanknotesIcon, CogIcon, UserGroupIcon, PowerIcon, FolderPlusIcon } from "@heroicons/vue/24/outline";
defineProps({
  isOpen: Boolean
})
defineEmits(['close'])
</script>

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
</style>
