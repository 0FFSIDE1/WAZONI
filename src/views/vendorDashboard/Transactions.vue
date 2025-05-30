
<template>
  <div class="p-6">
    <TransactionSummary />
    <TransactionFilter  v-model:search="search" v-model:status="status"  @paginate="handlePagination" /><TransactionExport />
    <TransactionChart />
    <TransactionTable :search="search" :status="status"/>
    <TransactionDetailsModal />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useVendorStore } from '@/store/VendorStore'

import TransactionSummary from '@/components/dashboardComponents/TransactionSummary.vue'
import TransactionFilter from '@/components/dashboardComponents/TransactionFilter.vue'
import TransactionTable from '@/components/dashboardComponents/TransactionTable.vue'
import TransactionDetailsModal from '@/components/dashboardComponents/TransactionDetailsModal.vue'
import TransactionExport from '@/components/dashboardComponents/TransactionExport.vue'
import TransactionChart from '@/components/dashboardComponents/TransactionChart.vue'

const vendorStore = useVendorStore()

const search = ref('')
const status = ref('')
const fetch = (params = {}) => vendorStore.getVendorTransactions(params)

const applyFilter = (filters) => {
  fetch(filters)
}

const handlePagination = (direction) => {
  const url = direction === 'next' ? vendorStore.pagination.next : vendorStore.pagination.previous
  if (url) vendorStore.getVendorTransactions(null, url)
}

// Initial load
fetch()
// Modal Control
const modalOpen = ref(false)
const selectedTransaction = ref(null)

const openModal = () => { modalOpen.value = true }
const closeModal = () => { modalOpen.value = false }
const setSelectedTransaction = (tx) => { selectedTransaction.value = tx }

// Provide to children
provide('modalOpen', modalOpen)
provide('selectedTransaction', selectedTransaction)
provide('openModal', openModal)
provide('closeModal', closeModal)
provide('setSelectedTransaction', setSelectedTransaction)

// Optional: Fetch if needed
onMounted(() => {
    vendorStore.getVendorTransactions()
})
  

</script>