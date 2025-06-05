<template>
  <div>
    <!-- 🖥️ Desktop Table -->
    <div class="hidden md:block">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
          <tr>
            <th class="px-4 py-2">Ref</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Amount</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Method</th>
            <th class="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="tx in filteredTransactions"
            :key="tx.ref"
            @click="handleClick(tx)"
            class="hover:bg-gray-50 cursor-pointer transition"
          >
            <td class="px-4 py-2">{{ tx.ref }}</td>
            <td class="px-4 py-2">
              <span class="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                {{ tx.transactionType }}
              </span>
            </td>
            <td class="px-4 py-2">₦ {{ tx.amount }}</td>
            <td class="px-4 py-2">
              <span :class="statusClass(tx.status)">
                {{ tx.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ tx.paymentMethod }}</td>
            <td class="px-4 py-2">{{ formatDate(tx.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📱 Mobile Cards -->
    <div class="space-y-4 md:hidden">
      <div
        v-for="tx in filteredTransactions"
        :key="tx.ref"
        @click="handleClick(tx)"
        class="bg-white shadow rounded p-4 transition hover:shadow-md cursor-pointer"
      >
        <div class="text-sm font-semibold text-gray-800 mb-2">{{ tx.description }}</div>

        <!-- <div class="flex justify-between text-sm text-gray-700 mb-2">
          <span><strong>Type:</strong> {{ tx.transactionType }}</span>
          <span><strong>Method:</strong> {{ tx.paymentMethod }}</span>
        </div> -->

        <div class="flex justify-between gap-4 text-sm text-gray-700">
          <span>
            <strong>Status:</strong>
            <span :class="statusClass(tx.status)">
              {{ tx.status }}
            </span>
          </span>
          
        </div>
        <div class="my-2">
            <span><strong>Amount:</strong> ₦ {{ tx.amount }}</span>
        </div>
        

        <div class="text-xs text-gray-400 mt-2">
          {{ formatDate(tx.created_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVendorStore } from '@/store/VendorStore'
import { formatDate } from '@/utils/formatters'
import { inject, computed, ref } from 'vue'
const props = defineProps({
  search: String,
  status: String
})

const store = useVendorStore()



// Computed filtered transactions
const filteredTransactions = computed(() => {
  return store.transactions.filter(tx => {
    const matchesStatus = !props.status || tx.status === props.status
    const matchesSearch =
      !props.search ||
      tx.ref?.toLowerCase().includes(props.search.toLowerCase()) ||
      tx.description?.toLowerCase().includes(props.search.toLowerCase())

    return matchesStatus && matchesSearch
  })
})
const openModal = inject('openModal')
const setSelectedTransaction = inject('setSelectedTransaction')

const handleClick = (tx) => {
  setSelectedTransaction(tx)
  openModal()
}

const statusClass = (status) => {
  const map = {
    PENDING: 'bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium',
    COMPLETED: 'bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium',
    FAILED: 'bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium',
    CANCELLED: 'bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs font-medium',
    REFUNDED: 'bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium'
  }
  return map[status] || 'bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs font-medium'
}
</script>
