<template>
  <div class="mb-4 text-right">
    <button @click="exportCSV" class="btn btn-xs md:btn-sm btn-outline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
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
