import { defineStore } from "pinia";
import { getTrackingLog } from "@/services/parcel"; 

export const useTrackingStore = defineStore('tracking', {
  state: () => ({
    log: [],
    loading: false,
    error: null,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'trackingLog',
        storage: localStorage,
        paths: ['log']
      }
    ]
  },
  actions: {
    async fetchTrackingInfo(trackingNo) {
      this.loading = true;
      this.error = null;

      try {
        const data = await getTrackingLog(trackingNo);
        this.log = data || [];
        console.log(this.log)
      } catch (err) {
        this.error = err.message || 'Failed to fetch Tracking Log';
      } finally {
        this.loading = false;
      }
    }
  }
});
