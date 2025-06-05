<template>
  <div class="p-6 mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Orders</h1>
      <button class="btn btn-sm btn-outline" @click="exportToCSV">Export CSV</button>
    </div>

    <!-- Filters -->
    <div class="mb-4 flex flex-col md:flex-row gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by customer or order ID"
        class="input input-bordered w-full md:w-1/2"
      />
      <select v-model="filterStatus" class="select select-bordered w-full md:w-1/4">
        <option value="">All Statuses</option>
        <option value="CREATED">Created</option>
        <option value="PENDING">Pending</option>
        <option value="SHIPPED">Shipped</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>

    <!-- Order Status Count Summary -->
    <div class="grid grid-cols-2 text-secondary  text-md md:text-2xl sm:grid-cols-4 gap-4 mb-4  text-center">
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold py-2">Created</div>
        <div>{{ countByStatus('CREATED') }}</div>
      </div>
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold text-orange-600 py-2">Pending</div>
        <div>{{ countByStatus('PENDING') }}</div>
      </div>
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold text-info py-2">Shipped</div>
        <div>{{ countByStatus('SHIPPED') }}</div>
      </div>
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold text-success py-2">Completed</div>
        <div>{{ countByStatus('COMPLETED') }}</div>
      </div>
    </div>

  <!-- Responsive Table (for md and up) -->
<div class="hidden md:block overflow-x-auto w-full rounded-lg border bg-base-100">
  <table class="table table-zebra table-sm w-full min-w-[900px]">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Order ID</th>
        <th>Date</th>
        <th>Status</th>
        <th>Total (₦)</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in filteredOrders" :key="order.id">
        <td class="truncate max-w-[150px]" :title="order.customer">{{ order.customer }}</td>
        <td>{{ order.phone }}</td>
        <td class="truncate max-w-[180px]" :title="order.address">{{ order.address }}</td>
        <td>{{ order.orderId }}</td>
        <td>{{ order.created_at }}</td>
        <td>
          <span class="badge" :class="{
            'badge-success': order.status === 'COMPLETED',
            'badge-warning': order.status === 'PENDING',
            'badge-info': order.status === 'SHIPPED',
            'badge-error': order.status === 'CANCELLED',
            'badge-ghost': order.status === 'CREATED',
          }">{{ order.status }}</span>
        </td>
        <td>₦ {{ order.total_price.toFixed(2) }}</td>
        <td>
          <button class="btn btn-sm btn-outline" @click="viewOrder(order)">View</button>
        </td>
      </tr>
      <tr v-if="filteredOrders.length === 0">
        <td colspan="8" class="text-center py-4 text-gray-500">No orders found.</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Mobile Cards (for < md screens) -->
<div class="md:hidden space-y-4">
  <div
    v-for="order in filteredOrders"
    :key="order.id"
    class="border rounded-lg p-4 shadow-sm bg-base-100"
  >
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-md font-bold">{{ order.customer }}</h2>
      <span class="badge text-xs" :class="{
  'badge-success': order.status === 'COMPLETED',
  'badge-warning': order.status === 'PENDING',
  'badge-info': order.status === 'SHIPPED',
  'badge-error': order.status === 'CANCELLED',
  'badge-ghost': order.status === 'CREATED',
}">{{ order.status }}</span>
    </div>

    <div class="text-sm text-gray-600 space-y-1 mb-2">
      <p><strong>Phone:</strong> {{ order.phone }}</p>
      <p><strong>Address:</strong> {{ order.address }}</p>
      <p><strong>Order ID:</strong> {{ order.orderId }}</p>
      <p><strong>Date:</strong> {{ order.created_at }}</p>
      <p><strong>Total:</strong> ₦ {{ order.total_price.toFixed(2) }}</p>
    </div>

    <button class="btn btn-sm btn-outline w-full mt-2" @click="viewOrder(order)">
      View Details
    </button>
  </div>
  <div v-if="filteredOrders.length === 0" class="text-center text-gray-500 py-8">
  No orders found.
</div>
</div>

    <!-- Order Detail Modal -->
    <dialog ref="modalRef" class="modal" role="dialog" aria-modal="true">
      <div class="modal-box w-full max-w-2xl">
        <template v-if="selectedOrder && selectedOrder.orderId">
          <h2 class="text-xl font-bold mb-4">
            Order Details — {{ selectedOrder.orderId }}
          </h2>

          <ul class="text-sm text-gray-700 space-y-1 mb-4">
            <li><strong>Customer:</strong> {{ selectedOrder.customer }}</li>
            <li><strong>Phone:</strong> {{ selectedOrder.phone }}</li>
            <li><strong>Address:</strong> {{ selectedOrder.address }}</li>
            <li><strong>Date:</strong> {{ selectedOrder.created_at }}</li>
            <li><strong>Total:</strong> ₦ {{ selectedOrder.total_price.toFixed(2) }}</li> 
          </ul>

          <!-- Steps -->
           
           <div class="flex md:justify-center md:items-center gap-4 flex-col">
            <h3 class="font-semibold mt-4 mb-2">Order Progress</h3>
        
          <ul class="timeline timeline-vertical md:timeline-horizontal">
                <li v-for="step in statusOrder" :key="step">
                  <div :class="['timeline-start', 'timeline-box', getTimelineColor(step)]">{{ formatStepName(step) }}</div>
                  <div class="timeline-middle">
                   
                    <div class="badge" :class="getTimelineBadgeColor(step)">
                      {{ step === selectedOrder.status ? '✓' :  ''}}
                    </div>
                  </div>
                  <hr class="bg-base-300" />
                </li>
                <!-- Handle cancelled case separately -->
                <li v-if="selectedOrder.status === 'CANCELLED'">
                  <div class="timeline-end text-error">Cancelled</div>
                  <div class="timeline-middle">
                    <div class="badge badge-error">Cancelled</div>
                  </div>
                  <hr class="bg-base-300" />
                </li>
          </ul>
           </div>

        
          <!-- Items -->
          <h3 class="font-semibold mt-6 mb-2">Items in this Order</h3>
          <ul class="space-y-4 max-h-60 overflow-y-auto pr-2">
            <li
              v-for="(item, i) in selectedOrder.items"
              :key="i"
              class="flex items-center gap-4 p-2 border rounded-lg hover:bg-base-200 transition"
            >
              <img :src="item.image" alt="" class="w-12 h-12 rounded object-cover" />
              <div class="flex-1">
                <p class="font-medium">{{ item['product']['name'] }}</p>
                <p class="text-xs text-gray-500">
                  ₦ {{ item['product']['currentPrice'] }} × {{ item.quantity }}
                </p>
              </div>
              <div class="text-sm font-semibold">
                ₦ {{ (item['product']['currentPrice'] * item.quantity).toFixed(2) }}
              </div>
            </li>
          </ul>
        </template>

        <template v-else>
          <p class="text-center text-gray-500 py-8">No order selected.</p>
        </template>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVendorStore } from '@/store/Vendorstore'

const vendorStore = useVendorStore(); 
const orders = ref([]);

const filterStatus = ref('');
const searchQuery = ref('');
const modalRef = ref(null);
const selectedOrder = ref({ items: [] });

const filteredOrders = computed(() =>
  orders.value.filter((order) => {
    const byStatus = filterStatus.value ? order.status === filterStatus.value : true;
    const bySearch = [order.customer, order.orderId].some((field) =>
      (field || '').toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    return byStatus && bySearch;
  })
);

const statusOrder = ['CREATED', 'PENDING', 'SHIPPED', 'COMPLETED'];
const getTimelineColor = (step) => {
  const current = selectedOrder.value.status;
  const idxCur = statusOrder.indexOf(current);
  const idxStep = statusOrder.indexOf(step);

  if (current === 'CANCELLED') return 'text-error';

  if (idxStep < idxCur) return 'text-success';
  if (idxStep === idxCur && current === 'PENDING') return 'bg-warning';
  if (idxStep === idxCur && current === 'SHIPPED') return 'bg-warning';
  if (idxStep === idxCur && current === 'COMPLETED') return 'bg-success text-white';
  if (idxStep === idxCur) return 'text-warning';
  return 'text-gray-300';
};

const getTimelineBadgeColor = (step) => {
  const current = selectedOrder.value.status;
  const idxCur = statusOrder.indexOf(current);
  const idxStep = statusOrder.indexOf(step);

  if (current === 'CANCELLED') return 'badge-error';
  if (idxStep < idxCur) return 'bg-green-500';
  if (idxStep === idxCur) return 'badge-success';
  return 'badge-ghost';
};

const formatStepName = (step) => {
  switch (step) {
    case 'CREATED':
      return 'Created';
    case 'PENDING':
      return 'Processing';
    case 'SHIPPED':
      return 'In Transit';
    case 'COMPLETED':
      return 'Delivered';
    default:
      return step;
  }
};

const countByStatus = (s) => orders.value.filter((o) => o.status === s).length;

const viewOrder = (order) => {
  selectedOrder.value = { ...order, items: order.items || [] };
  modalRef.value?.showModal();
};

onMounted(async () => {
  await vendorStore.getVendorOrders();
  console.log(vendorStore.orders)
  orders.value = vendorStore.orders.orders || [];
});

const exportToCSV = () => {
  const headers = ['Customer', 'Phone', 'Address', 'Order ID', 'Date', 'Status', 'Total'];

  const escapeCSV = (field) => {
    if (typeof field === 'number' && field.toString().length > 10) {
      return `"${field}"`;
    }
    if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const rows = filteredOrders.value.map(order => [
    order.customer,
    order.phone,
    order.address,
    order.orderId,
    order.created_at,
    order.status,
    order.items?.[0]?.subtotal ?? 0
  ].map(escapeCSV));

  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `orders_${new Date().toISOString()}.csv`);
  link.click();
};

</script>

<style scoped>
.steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.step {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: #ddd;
}
.step-success {
  background-color: #4ade80;
}
.step-warning {
  background-color: #facc15;
}
.step-error {
  background-color: #f87171;
}
</style>
