<template>
  <!-- Responsive container -->
  <div class="w-full max-w-3xl mx-auto px-4">
    <v-chart
      :option="chartOptions"
      autoresize
      class="w-full h-96"
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
  title: {
    text: 'Sales by Category',
    left: 'center',
    textStyle: {
      fontSize: 18
    }
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
