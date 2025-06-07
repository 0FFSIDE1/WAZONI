<template>
  <form
    @submit.prevent="trackParcel"
    class="form-control w-full max-w-md mx-auto text-center"
    aria-labelledby="tracking-form-title"
  >
    <div class="flex justify-center items-center space-x-2 gap-2 flex-col">
      <input
        id="tracking-number"
        v-model="trackingNumber"
        type="text"
        placeholder="Enter your tracking number"
        class="input input-bordered text-center p-4"
        required
        aria-required="true"
      />
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="store.loading"
        aria-label="Track parcel"
      >
        Track
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTrackingStore } from '@/store/TrackingLog'

const store = useTrackingStore()
const trackingNumber = ref('')

const trackParcel = async () => {
  await store.fetchTrackingInfo(trackingNumber.value)
}
</script>
