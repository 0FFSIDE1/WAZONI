<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Tracking Status</h2>
      <ul class="steps steps-vertical">
        <li
          v-for="(entry, index) in trackingLog"
          :key="entry.id"
          class="step"
          :class="{ 'step-primary': index <= lastIndex }"
        >
          <div class="flex flex-col">
            <span class="font-semibold">{{ entry.status }}</span>
            <span class="text-sm text-gray-500">{{ formatDate(entry.created_at) }}</span>
            <span class="text-sm italic text-gray-400">{{ entry.location }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  trackingLog: {
    type: Array,
    default: () => []
  }
})

const lastIndex = computed(() => props.trackingLog.length - 1)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString()
}
</script>
