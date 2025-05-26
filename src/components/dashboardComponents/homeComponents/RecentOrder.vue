<template>
  <div class="overflow-x-auto">
    <table class="table table-sm">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Order ID</th>
          <th>Qty</th>
          <th>Amount</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- Dynamic Orders -->
        <tr v-if="orders" v-for="(order, index) in orders.slice(0, 5)" :key="order.orderId">
          <th>
            <label>
              <input type="checkbox" v-if="order.status == 'COMPLETED'" class="checkbox" checked />
            </label>
          </th>
          <td>
            <div class="flex items-center gap-3">
              
              <div>
                <div class="font-bold">{{ order.orderId }}</div>
                <div class="text-sm opacity-50">
                  {{ formatDate(order.created_at) }}
                </div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-ghost badge-sm">
              {{ getOrderQty(order.items) }}
            </span>
          </td>
          <td>${{ order.total_price }}</td>
          <td>
            <span
              :class="[
                'badge badge-sm',
                order.status === 'SHIPPED' ? 'badge-info' :
                order.status === 'PENDING' ? 'badge-warning' :
                order.status === 'CANCELLED' ? 'badge-error' :
                'badge-success'
              ]"
            >
              {{ order.status }}
            </span>
          </td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        <tr v-if="!orders.length">
          <th></th>
          <td colspan="5" class="text-center">
            <div class="btn btn-ghost btn-xs">No Order Available</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { computed } from 'vue'


// ✅ If coming from a prop
const props = defineProps({ orders: Array })
const orders = computed(() => props.orders || [])



// Helper to format date
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString()
}

// Helper to calculate quantity
const getOrderQty = (items) => {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}
</script>
