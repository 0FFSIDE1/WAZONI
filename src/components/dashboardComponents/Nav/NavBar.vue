<script setup>
import { ref } from 'vue'
import Hamburger from '@/components/dashboardComponents/Nav/Hamburger.vue'
import ThemeToggle from '@/components/utils/ThemeToggle.vue'
import Drawer from '@/components/dashboardComponents/Nav/Drawer.vue'
import { BellAlertIcon } from '@heroicons/vue/24/outline'
import Search from '@/components/dashboardComponents/Nav/Search.vue'

const drawerOpen = ref(false)
</script>

<template>
  <header class="font-poppins sticky top-0 z-50">
    <nav class="navbar bg-base-100 h-24 shadow-lg shadow-neutral-content" role="navigation" aria-label="Main Navigation">
      <!-- Mobile & Desktop Unified Navbar -->
      <div class="flex w-full items-center justify-between  md:justify-even md:gap-12 px-4 md:px-8">
        <!-- Hamburger to toggle drawer -->
        <Hamburger :isOpen="drawerOpen" @toggle="drawerOpen = $event" />

        <!-- Logo -->
        <a href="/" class="text-2xl font-bold" aria-label="Homepage">WAZONI</a>

        <div class="flex ">
            <!-- Call Icon -->
            <a href="tel:+2349025118665" class="btn btn-ghost btn-circle md:mr-4" aria-label="Call us">
              <BellAlertIcon class="w-6 h-6 " />
            </a>
            <div>
               <Search class="hidden md:block"/>
            </div>
           
        </div>
        
      </div>

      <!-- Drawer Component (side menu) -->
        <Drawer :isOpen="drawerOpen" @close="drawerOpen = false" />

      <ThemeToggle />
    </nav>
  </header>
</template>
