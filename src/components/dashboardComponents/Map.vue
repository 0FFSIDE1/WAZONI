<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Parcel Location</h2>
      <div id="map" class="h-96 rounded-lg" role="region" aria-label="Parcel location map"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'

const props = defineProps({
  trackingLog: {
    type: Array,
    default: () => []
  }
})

onMounted(() => {
  const map = L.map('map').setView([51.505, -0.09], 5)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  if (props.trackingLog.length) {
    const coords = props.trackingLog.map(entry => [entry.latitude, entry.longitude])
    const lastEntry = props.trackingLog[props.trackingLog.length - 1]

    // Draw route polyline
    L.polyline(coords, { color: 'blue' }).addTo(map)

    // Use last entry's coordinates and location label
    if (lastEntry) {
      const { latitude, longitude, location } = lastEntry
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(location || 'Current Parcel Location') // fallback if location is empty
        .openPopup()

      map.setView([latitude, longitude], 13)
    }
  }
})

</script>

<style scoped>
#map {
  width: 100%;
}
</style>
