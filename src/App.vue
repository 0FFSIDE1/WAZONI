<template>
  <div class="font-poppins">
    <Preloader v-if="loading" />
    <component :is="layoutComponent" v-else>
      <router-view v-slot="{ Component }">
        <keep-alive v-if="$route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </router-view>
      <ScrollToTop />
    </component>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'
import Preloader from './components/utils/Preloader.vue'
import ScrollToTop from './components/utils/ScrollToTopBtn.vue'
import layouts from './layouts'

const route = useRoute()
const loading = ref(true)


const layoutComponent = computed(() => {
  const layout = route.meta.layout || 'default'
  return layouts[layout] || layouts.default
})

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>
