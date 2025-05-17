<script setup>
import Hamburger from '@/components/dashboardComponents/Nav/Hamburger.vue'
import ThemeToggle from '@/components/utils/ThemeToggle.vue'
import { BellAlertIcon } from '@heroicons/vue/24/outline'
import Search from '@/components/dashboardComponents/Nav/Search.vue'

const props = defineProps({
  drawerOpen: Boolean,
  isDesktop: Boolean
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <header class="font-poppins sticky top-0 z-50 bg-base-100 shadow-lg h-24 flex items-center px-4 md:px-8">
    <div class="flex w-full items-center justify-between md:gap-12">
      <!-- Hamburger -->
      <Hamburger
        v-if="!props.isDesktop"
        :isOpen="props.drawerOpen"
        @toggle="emit('toggle', $event)"
      />

      <!-- Logo -->
      <a href="/" class="text-2xl md:hidden font-bold" aria-label="Homepage">WAZONI</a>

      <!-- Right -->
      <div class="flex items-center gap-4">
        
        <Search class="hidden md:block md:w-[1000px]" />
         
        
      </div>
      <div class="flex items-center">
         <a class="btn btn-ghost btn-circle flex" aria-label="Call us">
          <BellAlertIcon class="w-6 h-6" />
      </a>
      <ThemeToggle />

      </div>
     
      
    </div>
  </header>
</template>
