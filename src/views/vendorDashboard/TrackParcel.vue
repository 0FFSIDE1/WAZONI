<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-center">Track Your Parcel</h1>
    <TrackingForm />
    <div v-if="store.loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div v-else-if="store.error" class="alert alert-error">
      {{ store.error }}
    </div>
    <div v-else-if="store.parcelData" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Map :location="store.parcelData.currentLocation" :route="store.parcelData.route" />
      <StatusTimeline :status="store.parcelData.status" />
    </div>
  </div>
</template>

<script setup>
import { useTrackingStore } from "@/store/TrackingLog";
import TrackingForm from "@/components/dashboardComponents/TrackingForm.vue";
import Map from "@/components/dashboardComponents/Map.vue";
import StatusTimeline from "@/components/dashboardComponents/StatusTimeline.vue";

export default {
  components: { TrackingForm, Map, StatusTimeline },
  setup() {
    const store = useTrackingStore();
    return { store };
  },
};
</script>