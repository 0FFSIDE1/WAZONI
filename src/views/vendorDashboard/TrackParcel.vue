<script setup>
import { useTrackingStore } from '@/store/TrackingLog'
import TrackingForm from '@/components/dashboardComponents/TrackingForm.vue'
import Map from '@/components/dashboardComponents/Map.vue'
import StatusTimeline from '@/components/dashboardComponents/StatusTimeline.vue'

const store = useTrackingStore()
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-center mt-6">Track Shipment</h1>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
    <p>
      Welcome to our <strong>Parcel Tracking System</strong> — a powerful, real-time dashboard that lets you
      monitor the journey of your shipment from dispatch to delivery.
    </p>
    <p>
      Simply enter your <strong>tracking number</strong> below to see live updates on your parcel's location, status, and route history.
    </p>
    <ul class="list-disc list-inside text-left sm:text-center lg:text-left">
      <li><strong>Interactive Map:</strong> Visualize your parcel’s current location and travel path.</li>
      <li><strong>Status Timeline:</strong> Track major delivery milestones, all in one place.</li>
    </ul>
    <p class="mt-4 italic text-sm text-gray-500">
      Need help? Contact our support team with your tracking number for assistance.
    </p>
  </div>
</div>

    <TrackingForm />

    <div v-if="store.loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <div v-else-if="store.error" class="alert alert-error">
      {{ store.error }}
    </div>

    <div v-else-if="store.log" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Map :tracking-log="store.log.tracking_log" />
      <StatusTimeline :tracking-log="store.log.tracking_log" />
    </div>
  </div>
</template>
