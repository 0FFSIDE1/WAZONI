<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register required ECharts modules
use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
])

// Chart Options
const options = ref({
  title: {
    text: 'Monthly Sales',
    left: 'center',
    textStyle: { fontSize: 18 }
  },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['2025'],
    top: 'bottom'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '2025',
      type: 'line',
      smooth: true,
      data: [5, 20, 136, 50, 60, 73, 82, 68, 100, 122, 239, 230],
      lineStyle: {
        width: 3,
        color: '#2563eb'
      },
      areaStyle: {
        color: 'rgba(37, 99, 235, 0.1)'
      },
      symbolSize: 8
    }
  ]
})
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <VChart :option="options" autoresize style="width: 100%; height: 400px;" />
  </div>
</template>
