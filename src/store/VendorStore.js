import { defineStore } from 'pinia'
import { 
  fetchVendorInfo, 
  fetchVendorStats,  
  fetchVendorOrders, 
  fetchVendorParcel, 
  fetchVendorTransactions, 
  } from '@/services/vendor'
import {
  fetchVendorProducts,
  editVendorProduct,
  deleteProduct,
  createProduct,
  fetchSaleRecord,
  createSaleRecord
} from '@/services/products'
import { 
  fetchNotifications, 
  updateNotification, 
  markAllNotificationsAsRead } from '@/services/notifications'



export const useVendorStore = defineStore('vendor', {
  state: () => ({
    info: null,
    stats: [],
    products: [],
    orders: [],
    transactions: [],
    parcels: [],
    customers: [],
    notifications: [],
    sales: [],
    pagination: {
    count: 0,
    next: null,
    previous: null,
    },
    loading: {
      info: false,
      stats: false,
      products: false,
      orders: false,
      transactions: false,
      parcels: false,
      customers: false,
      notifications: false,
      sales: false,
    },
    error: {
      info: null,
      stats: null,
      products: null,
      orders: false,
      transactions: false,
      parcels: false,
      customers: false,
      notifications: false,
      sales: false,
    },
    lastFetched: {
      info: null,
      stats: null,
      products: null,
      orders: false,
      transactions: false,
      parcels: false,
      customers: false,
      notifications: false,
      sales: false,
    },
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'vendor-store',
        storage: localStorage,
        paths: ['info', 'stats', 'products', 'orders', 'transactions', 'customers', 'parcels', 'transactions', 'notifications', 'sales', 'lastFetched']
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
    async getVendorStats(forceRefresh = false) {
      const now = Date.now()
      const CACHE_TTL = 5 * 60 * 1000
      if (!forceRefresh && this.lastFetched.stats && now - this.lastFetched.stats < CACHE_TTL) {
        return
      }
      if (!this.info || !this.info.id) {
        await this.getVendorInfo(true) // force refresh to ensure latest info
      }
      const vendorId = this.info?.id
      if (!vendorId) {
        console.log('Vendor ID is not available')
        this.error.stats = 'Vendor ID is not available'
        return
      }
      this.loading.stats = true
      this.error.stats = null
      try {
        const data = await fetchVendorStats(vendorId)
        this.stats = data || []
        this.lastFetched.stats = now
      } catch (err) {
        this.error.stats = err.message || 'Failed to fetch vendor stats'
      } finally {
        this.loading.stats = false
      }
    },
    async getVendorProducts(page=1) {
      // const now = Date.now()
      // const CACHE_TTL = 5 * 60 * 1000
      // if (!forceRefresh && this.lastFetched.products && now - this.lastFetched.products < CACHE_TTL) {
      //   return
      // }
      this.loading.products = true
      this.error.products = null
      try {
        const path = page ? `products/?page=${page}` : 'products/'
        const data = await fetchVendorProducts(path)
        this.products = data.results || []
        this.pagination = {
        count: data.count,
        next: data.next,
        previous: data.previous,
      };
        this.lastFetched.products = now
      } catch (err) {
        this.error.products = err.message || 'Failed to fetch vendor products'
      } finally {
        this.loading.products = false
      }
    },
    async createVendorProduct(payload) {
    this.loading.products = true;
    this.error.products = null;
    try {
      const response = await createProduct(payload);
      console.log('Create response:', response);
      this.products.push(response.data);
      return response;
    } catch (err) {
      this.error.products = err.message || 'Failed to create vendor product';
      throw err;
    } finally {
      this.loading.products = false;
    }
    },
    async updateVendorProduct(id, data) {
      this.loading.products = true
      this.error.products = null
      try {
        const response = await editVendorProduct(id, data)
        console.log('Update response:', response);
        this.products = this.products.map(product =>
          product.itemid === id ? { ...product, ...response } : product
        )
      } catch (err) {
        this.error.products = err.message || 'Failed to update vendor product'
      } finally {
        this.loading.products = false
      }
    },
    async deleteVendorProduct(id){
      this.loading.products = true
      this.error.products = null
      try {
        const response = await deleteProduct(id)
        console.log('Delete response:', response)
        this.products = this.products.filter(product => product.itemid !== id)
      } catch (err) {
        this.error.products = err.message || 'Failed to delete vendor product'
      } finally {
        this.loading.products = false
      }
    },
    async getVendorOrders(){
      this.loading.orders = true
      this.error.orders = null
      try {
        const data = await fetchVendorOrders()
        this.orders = data || []
      } catch (err){
        this.error.orders = err.message || 'Failed to fetch vendor orders'
      } finally {
        this.loading.orders = false
      }
    },
    async getVendorNotifications(url = null) {
      this.loading.notifications = true
      this.error.notifications = null
      try {
        const data = await fetchNotifications(url) // don't reassign url=null again
        this.notifications = data.results || []
      
        // ✅ store pagination info
        this.pagination = {
          count: data.count,
          next: data.next,
          previous: data.previous,
        }
      } catch (err) {
        this.error.notifications = err.message || 'Failed to fetch vendor notifications'
      } finally {
        this.loading.notifications = false
      }
    },
    async updateNotificationReadStatus(id, data) {
      this.loading.notifications = true
      this.error.notifications = null
      try {
        const response = await updateNotification(id, data)
        this.notifications = this.notifications.map(notification =>
          notification.id === id ? { ...notification, ...response } : notification
        )
      } catch (err) {
        this.error.notifications = err.message || 'Failed to update vendor notification'
      }
      finally {
        this.loading.notifications = false
      }
    },
    async updateAllNotificationReadStatus() {
      this.loading.notifications = true
      this.error.notifications = null
      try {
        const response = await markAllNotificationsAsRead()
        this.notifications = this.notifications.map(notification =>
          notification.id === id ? { ...notification, ...response } : notification
        )
      } catch (err) {
        this.error.notifications = err.message || 'Failed to update vendor notification'
      }
      finally {
        this.loading.notifications = false
      }
    },
    async getVendorTransactions(){
      this.loading.transactions = true
      this.error.transactions = null
      try {
        const data = await fetchVendorTransactions()
        this.transactions = data.results || []
      } catch (err){
        this.error.transactions = err.message || 'Failed to fetch vendor transactions'
      } finally {
        this.loading.transactions = false
      }
    },
    async getVendorParcels(){
      this.loading.parcels = true
      this.error.parcels = null
      try {
        const data = await fetchVendorParcel()
        this.parcels = data || []
      } catch (err){
        this.error.parcels = err.message || 'Failed to fetch vendor parcels'
      } finally {
        this.loading.parcels = false
      }
    },
    async CreateSalesRecord(payload){
      this.loading.sales = true
      this.error.sales = null
      try {
        const response = await createSaleRecord(payload)
        return response;
      } catch(err){
        this.error.sales = err.message || 'Failed to create sales record'
      } finally {
        this.loading.sales = false
      }
    },
    async getSalesRecord(){
      this.loading.sales = true
      this.error.sales = null
      try {
        const data = await fetchSaleRecord()
        this.sales = data || []
        this.pagination = {
          count: data.count,
          next: data.next,
          previous: data.previous,
        }
      } catch(err){
        this.error.sales = err.message || 'Failed to create sales record'
      } finally {
        this.loading.sales = false
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
