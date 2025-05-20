<template>
  <div class="w-full max-w-full overflow-x-auto">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  chartData: Object,
  chartOptions: Object
});
</script>
