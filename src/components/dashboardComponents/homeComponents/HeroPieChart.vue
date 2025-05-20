<template>
  <!-- Responsive container -->
  <div class="w-full max-w-3xl mx-auto px-4">
    <h3 class="text-xl font-bold text-center mb-4">
      Sales by Category
    </h3>
    <v-chart
      :option="chartOptions"
      autoresize
      class="w-full h-96 shadow-lg"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'

// Required ECharts modules
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register modules
use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

const chartOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
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
  height: 20rem;
}
</style>
