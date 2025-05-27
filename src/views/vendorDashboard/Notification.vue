<template>
  <div class="max-w-7xl mx-auto p-4 md:p-8 grid md:grid-cols-4 gap-6">
    <!-- Mobile Header -->
    <div class="md:hidden text-center">
      <h1 class="text-2xl font-bold">Notifications</h1>
      <p>Stay up to date on important activity.</p>
    </div>
    <!-- Sidebar -->
    <aside class="md:block space-y-4">
      <!-- <h2 class="text-lg font-semibold">Filter</h2> -->
      <ul class="space-y-2">
        <li>
          <button @click="filter = 'all'" :class="sidebarBtnClass('all')">
            <span class="mdi mdi-bell-outline mr-2"></span>
            All
          </button>
        </li>
        <li>
          <button @click="filter = 'unread'" :class="sidebarBtnClass('unread')">
            <span class="mdi mdi-email-outline mr-2"></span>
            Unread
          </button>
        </li>
        <li>
          <button @click="filter = 'read'" :class="sidebarBtnClass('read')">
            <span class="mdi mdi-check-circle-outline mr-2"></span>
            Read
          </button>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="md:col-span-3 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="hidden md:block text-2xl font-bold">Notifications</h1>
          <p class="hidden md:block text-gray-600 text-sm">Stay up to date on important activity.</p>
        </div>
        <button @click="markAllAsRead" class="text-xs btn btn-primary btn-xs">
          Mark all as read
        </button>
      </div>

      <!-- Notifications -->
      <div v-if="Object.keys(groupedNotifications).length > 0" class="space-y-6">
        <div v-for="(group, date) in groupedNotifications" :key="date">
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {{ formatGroupDate(date) }}
          </h2>

          <div class="space-y-3">
            <div
              v-for="notification in group"
              :key="notification.id"
              class="flex items-start gap-4 p-4 rounded-lg border transition hover:shadow-sm cursor-pointer"
              :class="{
                'bg-blue-50 border-blue-200': !notification.read,
                'bg-white border-gray-200': notification.read
              }"
            >
              <!-- Icon or avatar -->
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <span class="mdi mdi-bell-ring-outline text-xl"></span>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800">{{ notification.title }}</h3>
                <p class="text-sm text-gray-600">{{ notification.message }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.created_at) }}</p>
              </div>

              <!-- Mark as read -->
              <button
                v-if="!notification.read"
                @click.stop="markAsRead(notification.id)"
                class="text-xs text-blue-500 hover:underline"
              >
                Mark as read
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center text-gray-500 py-10">
        <span class="mdi mdi-bell-off-outline text-4xl mb-2 block"></span>
        No notifications found.
      </div>
    </div>
  </div>
  <!-- Pagination Controls -->
  <div class="flex justify-start mx-4 mt-6 space-x-4">
    <button
      :disabled="!pagination.previous"
      @click="loadPrevPage"
      class="btn btn-sm"
    >
      Previous
    </button>

    <button
      :disabled="!pagination.next"
      @click="loadNextPage"
      class="btn btn-sm"
    >
      Next
    </button>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { useVendorStore } from '@/store/VendorStore'

const vendorStore = useVendorStore()
const { notifications, pagination } = storeToRefs(vendorStore)
const { getVendorNotifications } = vendorStore

const filter = ref('all')

// Pagination handlers
function loadNextPage() {
  if (pagination.value.next) {
    getVendorNotifications(pagination.value.next)
  }
}

function loadPrevPage() {
  if (pagination.value.previous) {
    getVendorNotifications(pagination.value.previous)
  }
}

// Notification filters
const filteredNotifications = computed(() => {
  if (filter.value === 'unread') return notifications.value.filter(n => !n.read)
  if (filter.value === 'read') return notifications.value.filter(n => n.read)
  return notifications.value
})

// Grouped by date
const groupedNotifications = computed(() => {
  const groups = {}
  filteredNotifications.value.forEach(n => {
    const dateKey = dayjs(n.created_at).format('YYYY-MM-DD')
    if (!groups[dateKey]) groups[dateKey] = []
    groups[dateKey].push(n)
  })

  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]))
  )
})

function markAsRead(id) {
  const index = vendorStore.notifications.findIndex(n => n.id === id)
  if (index !== -1) {
    vendorStore.notifications[index].read = true
  }
}

function markAllAsRead() {
  vendorStore.notifications.forEach(n => {
    n.read = true
  })
}

function formatTime(datetime) {
  return dayjs(datetime).format('h:mm A')
}

function formatGroupDate(dateStr) {
  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  if (dateStr === today) return 'Today'
  if (dateStr === yesterday) return 'Yesterday'
  return dayjs(dateStr).format('MMMM D, YYYY')
}

function sidebarBtnClass(val) {
  return `flex items-center w-full px-4 py-2 rounded-md text-sm font-medium ${
    filter.value === val
      ? 'bg-blue-100 text-blue-600'
      : 'text-gray-700 hover:bg-gray-100'
  }`
}

onMounted(() => {
  getVendorNotifications()
})
</script>


<style scoped>
.select {
  border: 1px solid #ccc;
}
.mdi {
  font-family: "Material Design Icons";
}
</style>
