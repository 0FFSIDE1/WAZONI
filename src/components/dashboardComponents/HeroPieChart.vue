<template>
  <v-chart class="h-96" :option="chartOptions" />
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'

// Import required ECharts modules
import {
  PieChart
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

import {
  CanvasRenderer
} from 'echarts/renderers'

// Register components
use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

// Pie chart config
const chartOptions = ref({
  title: {
    text: 'Sales by Category',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Categories',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 1048, name: 'Electronics' },
        { value: 735, name: 'Fashion' },
        { value: 580, name: 'Home' },
        { value: 484, name: 'Books' },
        { value: 300, name: 'Others' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<style scoped>
.h-96 {
  height: 24rem;
}
</style>
