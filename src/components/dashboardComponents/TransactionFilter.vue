<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
    <!-- 🔍 Search + Filter -->
    <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <input
        type="text"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        placeholder="Search by ref or description..."
        class="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
      />
      <select
         :value="status"
        @change="$emit('update:status', $event.target.value)"
        class="border px-3 py-2 rounded shadow-sm w-full sm:w-48"
      >
        <option value="">All Status</option>
        <option v-for="s in statusOptions" :key="s" :value="s">
          {{ s }}
        </option>
      </select>
    </div>

    <!-- ⏮️ Pagination Buttons -->
    <div class="flex gap-2 justify-end sm:justify-start">
      <button
        @click="$emit('paginate', 'prev')"
        class="px-4 py-2 bg-gray-100 text-sm rounded shadow hover:bg-gray-200"
      >
        Prev
      </button>
      <button
        @click="$emit('paginate', 'next')"
        class="px-4 py-2 bg-gray-100 text-sm rounded shadow hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
defineProps({
  search: String,
  status: String
})


const search = ref('')
const status = ref('')

const statusOptions = ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']

// 💡 Debounced filter emit
const triggerFilter = useDebounceFn(() => {
  emit('filter', { search: search.value, status: status.value })
}, 400)
defineEmits(['update:search', 'update:status'])
watch([search, status], triggerFilter)
</script>
