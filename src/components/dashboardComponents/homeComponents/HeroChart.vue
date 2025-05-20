<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

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
  series: [
    {
      name: '2025',
      type: 'line',
      smooth: true,
      data: [5, 20, 136, 50, 60, 73, 82, 68, 100, 122, 239, 230],
      lineStyle: { width: 3, color: '#2563eb' },
      areaStyle: { color: 'rgba(37, 99, 235, 0.1)' },
      symbolSize: 8
    }
  ]
})

// Bar Chart Options (Monthly Orders)
const orderOptions = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['Orders'], top: 'bottom' },
  grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Orders',
      type: 'bar',
      data: [12, 45, 80, 50, 70, 65, 90, 100, 120, 150, 170, 200],
      itemStyle: {
        color: '#10b981' // Tailwind green-500
      },
      barWidth: '40%'
    }
  ]
})
</script>

<template>
  <div class="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center">
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

