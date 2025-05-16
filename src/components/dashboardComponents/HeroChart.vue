<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
])

const options = ref({
  title: { text: 'Montly Sales' },
  tooltip: {},
  legend: { data: ['2025'] },
  xAxis: { data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  yAxis: {},
  series: [
    { name: '2025', type: 'line', data: [5, 20, 36] }
  ]
})
</script>

<template>
  <VChart :option="options" style="height: 400px; width: 100%" />
</template>
