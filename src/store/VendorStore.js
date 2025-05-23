import { defineStore } from 'pinia'
import { fetchVendorInfo, fetchVendorStats, fetchVendorProducts } from '@/services/vendor'

export const useVendorStore = defineStore('vendor', {
  state: () => ({
    info: null,
    stats: [],
    products: [],
    loading: {
      info: false,
      stats: false,
      products: false,
    },
    error: {
      info: null,
      stats: null,
      products: null,
    },
    lastFetched: {
      info: null,
      stats: null,
      products: null,
    },
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'vendor-store',
        storage: localStorage,
        paths: ['info', 'stats', 'products', 'lastFetched']
      }
    ]
  },

  actions: {
    async getVendorInfo(forceRefresh = false) {
      const now = Date.now()
      const CACHE_TTL = 5 * 60 * 1000

      if (!forceRefresh && this.lastFetched.info && now - this.lastFetched.info < CACHE_TTL) {
        return
      }

      this.loading.info = true
      this.error.info = null

      try {
        const data = await fetchVendorInfo()
        this.info = data || {}
        this.lastFetched.info = now
      } catch (err) {
        this.error.info = err.message || 'Failed to fetch vendor info'
      } finally {
        this.loading.info = false
      }
    },

    async getVendorStats(forceRefresh = false, id) {
      const now = Date.now()
      const CACHE_TTL = 5 * 60 * 1000

      if (!forceRefresh && this.lastFetched.stats && now - this.lastFetched.stats < CACHE_TTL) {
        return
      }

      this.loading.stats = true
      this.error.stats = null

      try {
        const data = await fetchVendorStats(id)
        this.stats = data || []
        this.lastFetched.stats = now
      } catch (err) {
        this.error.stats = err.message || 'Failed to fetch vendor stats'
      } finally {
        this.loading.stats = false
      }
    },

    async getVendorProducts(forceRefresh = false) {
      const now = Date.now()
      const CACHE_TTL = 5 * 60 * 1000

      if (!forceRefresh && this.lastFetched.products && now - this.lastFetched.products < CACHE_TTL) {
        return
      }

      this.loading.products = true
      this.error.products = null

      try {
        const data = await fetchVendorProducts()
        this.products = data || []
        this.lastFetched.products = now
      } catch (err) {
        this.error.products = err.message || 'Failed to fetch vendor products'
      } finally {
        this.loading.products = false
      }
    },

    resetVendorData() {
      this.info = null
      this.stats = []
      this.products = []
      this.lastFetched = {
        info: null,
        stats: null,
        products: null,
      }
      this.error = {
        info: null,
        stats: null,
        products: null,
      }
    }
  }
})
