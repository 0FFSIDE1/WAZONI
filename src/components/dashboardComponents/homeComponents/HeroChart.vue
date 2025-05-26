<script setup>
import { ref, watchEffect } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'


const props = defineProps({
  monthlySales: {
    type: Array,
    default: () => []
  },
  monthlyOrders: {
    type: Array,
    default: () => []
  }
})


// Utility: Get Month Index from "2025-05-01T00:00:00Z"
const getMonthIndex = (dateStr) => new Date(dateStr).getUTCMonth()

// Format Sales and Orders into 12-length arrays
const formattedSales = ref(new Array(12).fill(0))
const formattedOrders = ref(new Array(12).fill(0))



// Register components
use([
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
])

// Line Chart Options (Monthly Sales)
const salesOptions = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['2025'], top: 'bottom' },
  grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  yAxis: { type: 'value' },
  series: [{
    name: '2025',
    type: 'line',
    smooth: true,
    data: [], // filled by watchEffect
    lineStyle: { width: 3, color: '#2563eb' },
    areaStyle: { color: 'rgba(37, 99, 235, 0.1)' },
    symbolSize: 8
  }]
})

// Bar Chart Options (Monthly Orders)
const orderOptions = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['Orders'], top: 'bottom' },
  grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  yAxis: { type: 'value' },
  series: [{
    name: 'Orders',
    type: 'bar',
    data: [], // filled by watchEffect
    itemStyle: { color: '#10b981' },
    barWidth: '40%'
  }]
})
watchEffect(() => {
  formattedSales.value = new Array(12).fill(0)
  formattedOrders.value = new Array(12).fill(0)

  props.monthlySales.forEach(item => {
    const i = getMonthIndex(item.month)
    formattedSales.value[i] = item.total // Use 'sales' not 'total' if you want amount
  })

  props.monthlyOrders.forEach(item => {
    const i = getMonthIndex(item.month)
    formattedOrders.value[i] = item.total // Assuming this is number of orders
  })

  // ✅ Set series data after formatting
  salesOptions.value.series[0].data = formattedSales.value
  orderOptions.value.series[0].data = formattedOrders.value
})
</script>

<template>
  <div class="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
    <div class="w-full">
      <h3 class="text-xl font-bold text-center mb-4">Monthly Sales</h3>
      <VChart :option="salesOptions" autoresize style="width: 100%; height: 400px;" />
    </div>

    <div class="w-full">
      <h3 class="text-xl font-bold text-center mb-4">Monthly Orders</h3> 
      <VChart :option="orderOptions" autoresize style="width: 100%; height: 400px;" />
    </div>
  
  </div>
</template>

