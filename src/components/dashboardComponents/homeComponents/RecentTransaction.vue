<template>
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Payment Mode</th>
          <th>Reference</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tx, index) in recentTransactions" :key="tx.id">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(tx.created_at) }}</td>
          <td>{{ tx.paymentMethod }}</td>
          <td>{{ tx.ref }}</td>
          <td>₦ {{ tx.amount }}</td>
          <td v-if="tx.status=='COMPLETED'" class="text-success">{{ tx.status }}            
          </td>
          <td v-else class="text-error">{{ tx.status }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Payment Mode</th>
          <th>Reference</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const recentTransactions = computed(() => props.transactions.slice(0, 15))

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>
