<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
    <div class="bg-white p-4 rounded shadow-sm w-full h-[300px] sm:h-[350px]">
      <canvas id="typeChart" class="w-full h-full"></canvas>
    </div>
    <div class="bg-white p-4 rounded shadow-sm w-full h-[300px] sm:h-[350px]">
      <canvas id="monthlyChart" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import { useVendorStore } from '@/store/VendorStore'

const store = useVendorStore()

let typeChart = null
let monthlyChart = null

onMounted(async () => {
    await store.getVendorTransactions()
  await nextTick() // Wait for DOM to finish rendering

  const typeCtx = document.getElementById('typeChart')
  const monthlyCtx = document.getElementById('monthlyChart')

  if (!typeCtx || !monthlyCtx) {
    console.warn('🛑 Canvas context not available.')
    return
  }

  const byType = {}
  const byMonth = {}

  store.transactions.forEach(tx => {
    const type = tx.transactionType || 'Unknown'
    byType[type] = (byType[type] || 0) + 1

    const month = new Date(tx.created_at).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short'
    })
    byMonth[month] = (byMonth[month] || 0) + parseFloat(tx.amount)
  })

  // ✅ Type Pie Chart
  typeChart = new Chart(typeCtx, {
    type: 'pie',
    data: {
      labels: Object.keys(byType),
      datasets: [{
        data: Object.values(byType),
        backgroundColor: ['#60A5FA', '#F87171', '#34D399', '#FBBF24', '#A78BFA']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Transactions by Type'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  })

  // ✅ Monthly Bar Chart
  monthlyChart = new Chart(monthlyCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(byMonth),
      datasets: [{
        label: 'Total Amount ($)',
        data: Object.values(byMonth),
        backgroundColor: '#4B5563'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Revenue'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})

onBeforeUnmount(() => {
  typeChart?.destroy()
  monthlyChart?.destroy()
})
</script>
