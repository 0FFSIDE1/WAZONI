<template>
  <div class="mb-4 text-right">
    <button @click="exportCSV" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Export CSV
    </button>
  </div>
</template>

<script setup>
import { useVendorStore } from '@/store/VendorStore'

const store = useVendorStore()

const exportCSV = () => {
  const headers = [
    'Reference', 'Amount', 'Status',
    'Type', 'Payment Method', 'Created At'
  ]

  const rows = store.transactions.map(tx => [
    tx.ref,
    tx.amount,
    tx.status,
    tx.transactionType,
    tx.paymentMethod,
    new Date(tx.created_at).toLocaleString(),
  ])

  const content = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'transactions.csv'
  link.click()

  URL.revokeObjectURL(url)
}
</script>
