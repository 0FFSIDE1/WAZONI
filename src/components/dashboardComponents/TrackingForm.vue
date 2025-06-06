<template>
  <form
    @submit.prevent="trackParcel"
    class="form-control w-full max-w-md mx-auto"
    aria-labelledby="tracking-form-title"
  >
    <label class="label" for="tracking-number">
      <span class="label-text">Enter Tracking Number</span>
    </label>
    <div class="flex space-x-2">
      <input
        id="tracking-number"
        v-model="trackingNumber"
        type="text"
        placeholder="Enter your tracking number"
        class="input input-bordered w-full"
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
import { useTrackingStore } from "@/store/TrackingLog";

export default {
  setup() {
    const store = useTrackingStore();
    return { store };
  },
  data() {
    return {
      trackingNumber: "",
    };
  },
  methods: {
    async trackParcel() {
      this.store.setTrackingNumber(this.trackingNumber);
      await this.store.fetchParcelData(this.trackingNumber);
    },
  },
};
</script>