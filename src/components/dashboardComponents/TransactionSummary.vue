<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Status Breakdown Cards -->
    <div
      v-for="(count, status) in statusCounts"
      :key="status"
      class="p-4 bg-white rounded shadow-sm"
    >
      <div class="text-sm font-medium text-gray-500">{{ status }}</div>
      <div class="text-2xl font-bold">{{ count }}</div>
    </div>

    <!-- Total Amount -->
    <div class="p-4 bg-white rounded shadow-sm">
      <div class="text-sm font-medium text-gray-500">Total Amount</div>
      <div class="text-2xl font-bold">₦ {{ totalAmount.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useVendorStore } from '@/store/VendorStore'

const store = useVendorStore()

// Group transactions by status
const statusCounts = computed(() => {
  return store.transactions.reduce((acc, tx) => {
    const key = tx.status || 'UNKNOWN'
    acc[key] = acc[key] ? acc[key] + 1 : 1
    return acc
  }, {})
})

// Sum total amount
const totalAmount = computed(() => {
  return store.transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
})
</script>
