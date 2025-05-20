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
                <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.date) }}</p>
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
</template>


<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
function sidebarBtnClass(val) {
  return `flex items-center w-full px-4 py-2 rounded-md text-sm font-medium ${
    filter.value === val
      ? 'bg-blue-100 text-blue-600'
      : 'text-gray-700 hover:bg-gray-100'
  }`;
}
// Sample Notification Data (Replace with API response)
const notifications = ref([
  {
    id: 1,
    title: 'Order Received',
    message: 'You have received a new order for product XYZ.',
    read: false,
    date: dayjs().subtract(0, 'day').toISOString(),
  },
  {
    id: 2,
    title: 'Account Verified',
    message: 'Your account has been successfully verified.',
    read: true,
    date: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: 3,
    title: 'Product Approved',
    message: 'Your product listing "Cool Shirt" has been approved.',
    read: false,
    date: dayjs().subtract(2, 'day').toISOString(), // 2 days ago
  },
  {
    id: 4,
    title: 'New Message',
    message: 'You received a new message from a customer.',
    read: true,
    date: dayjs().subtract(3, 'day').toISOString(), // 3 days ago
  },
]);

const filter = ref('all');

const filteredNotifications = computed(() => {
  if (filter.value === 'unread') {
    return notifications.value.filter(n => !n.read);
  } else if (filter.value === 'read') {
    return notifications.value.filter(n => n.read);
  }
  return notifications.value;
});

const groupedNotifications = computed(() => {
  const groups = {};

  filteredNotifications.value.forEach(n => {
    const dateKey = dayjs(n.date).format('YYYY-MM-DD');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(n);
  });

  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]))
  );
});

function markAsRead(id) {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value[index].read = true;
  }
}

function markAllAsRead() {
  notifications.value.forEach(n => {
    n.read = true;
  });
}

function formatTime(datetime) {
  return dayjs(datetime).format('h:mm A');
}

function formatGroupDate(dateStr) {
  const today = dayjs().format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return dayjs(dateStr).format('MMMM D, YYYY');
}
</script>

<style scoped>
.select {
  border: 1px solid #ccc;
}
.mdi {
  font-family: "Material Design Icons";
}
</style>
