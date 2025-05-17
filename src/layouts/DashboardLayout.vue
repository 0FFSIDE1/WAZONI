<template>
  <div class="flex min-h-screen">
    <!-- ✅ Sidebar / Drawer -->
    <Drawer :isOpen="drawerOpen" :isDesktop="isDesktop" @close="drawerOpen = false" />

    <!-- ✅ Page Content -->
    <div :class="isDesktop ? 'ml-72 w-full' : 'w-full'">
      <!-- Navbar at top -->
      <NavBar :drawerOpen="drawerOpen" :isDesktop="isDesktop" @toggle="toggleDrawer" />

      <!-- Main content -->
      <main class="md:pr-8">
        <slot />
      </main>

      <!-- Dock (mobile only) -->
      <div class="md:hidden">
        <Dock />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/dashboardComponents/Nav/NavBar.vue'
import Drawer from '@/components/dashboardComponents/Nav/Drawer.vue'
import Dock from '@/components/dashboardComponents/Dock.vue'

const drawerOpen = ref(false)
const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.matchMedia('(min-width: 768px)').matches
}

function toggleDrawer(value) {
  drawerOpen.value = value
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
