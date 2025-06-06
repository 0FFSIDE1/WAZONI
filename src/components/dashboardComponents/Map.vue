<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Parcel Location</h2>
      <div id="map" class="h-96 rounded-lg" role="region" aria-label="Parcel location map"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  props: {
    location: {
      type: Object,
      default: () => ({ lat: 51.505, lng: -0.09 }), // Default: London
    },
    route: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map("map").setView([this.location.lat, this.location.lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add marker for current location
      L.marker([this.location.lat, this.location.lng])
        .addTo(map)
        .bindPopup("Current Parcel Location")
        .openPopup();

      // Add route if provided
      if (this.route.length > 0) {
        L.polyline(this.route, { color: "blue" }).addTo(map);
      }
    },
  },
};
</script>