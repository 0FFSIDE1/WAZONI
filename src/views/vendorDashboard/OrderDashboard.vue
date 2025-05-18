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
        <option value="Created">Created</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Order Status Count Summary -->
    <div class="grid grid-cols-2 text-secondary  text-md md:text-2xl sm:grid-cols-4 gap-4 mb-4  text-center">
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold py-2">Created</div>
        <div>{{ countByStatus('Created') }}</div>
      </div>
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold text-orange-600 py-2">Pending</div>
        <div>{{ countByStatus('Pending') }}</div>
      </div>
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold text-info py-2">Shipped</div>
        <div>{{ countByStatus('Shipped') }}</div>
      </div>
      <div class="p-6 bg-gray-200 rounded shadow-xl">
        <div class="font-semibold text-success py-2">Completed</div>
        <div>{{ countByStatus('Completed') }}</div>
      </div>
    </div>

   <!-- Responsive Table -->
<div class="overflow-x-auto w-full rounded-lg border bg-base-100">
  <table class="table table-zebra table-sm w-full min-w-[900px]">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Order ID</th>
        <th>Date</th>
        <th>Status</th>
        <th>Total ($)</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in filteredOrders" :key="order.id">
        <td class="truncate max-w-[150px]" :title="order.customer">{{ order.customer }}</td>
        <td>{{ order.phone }}</td>
        <td class="truncate max-w-[180px]" :title="order.address">{{ order.address }}</td>
        <td>{{ order.orderId }}</td>
        <td>{{ order.date }}</td>
        <td>
          <span class="badge" :class="{
            'badge-success': order.status === 'Completed',
            'badge-warning': order.status === 'Pending',
            'badge-info': order.status === 'Shipped',
            'badge-error': order.status === 'Cancelled',
          }">{{ order.status }}</span>
        </td>
        <td>${{ order.total.toFixed(2) }}</td>
        <td>
          <button class="btn btn-sm btn-outline" @click="viewOrder(order)">View</button>
        </td>
      </tr>
    </tbody>
  </table>
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
            <li><strong>Date:</strong> {{ selectedOrder.date }}</li>
            <li><strong>Total:</strong> ${{ selectedOrder.total.toFixed(2) }}</li>
          </ul>

          <!-- Steps -->
          <h3 class="font-semibold mt-4 mb-2">Order Progress</h3>
        
          <ul class="steps steps-vertical lg:steps-horizontal">
            <li class="step" :class="getStepClass('Created')">Created</li>
            <li class="step" :class="getStepClass('Pending')">Processing</li>
            <li class="step" :class="getStepClass('Shipped')">In Transit</li>
            <li class="step" :class="getStepClass('Completed')">Delivered</li>
            <li v-if="selectedOrder.status === 'Cancelled'" class="step step-error">Cancelled</li>
          </ul>
        
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
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-xs text-gray-500">
                  ${{ item.price.toFixed(2) }} × {{ item.quantity }}
                </p>
              </div>
              <div class="text-sm font-semibold">
                ${{ (item.price * item.quantity).toFixed(2) }}
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

const orders = ref([
  {
    id: 1,
    customer: 'John Doe',
    phone: '+17728883456',
    address: '102 Dallas texas',
    orderId: 'ORD123456',
    date: '2024-05-16',
    status: 'Pending',
    total: 120.99,
    items: [
      { name: 'Widget A', price: 29.99, quantity: 2, image: 'https://via.placeholder.com/40' },
      { name: 'Service X', price: 60.01, quantity: 1, image: 'https://via.placeholder.com/40' },
    ],
  },
  {
    id: 2,
    customer: 'Jane Smith',
    phone: '+15552223333',
    address: '456 New York, NY',
    orderId: 'ORD789012',
    date: '2024-05-15',
    status: 'Completed',
    total: 89.49,
    items: [
      { name: 'Item B', price: 44.75, quantity: 2, image: 'https://via.placeholder.com/40' },
    ],
  },
  {
    id: 3,
    customer: 'Mark Smith',
    phone: '+15552223333',
    address: '456 New York, NY',
    orderId: 'ORD782312',
    date: '2024-05-15',
    status: 'Pending',
    total: 89.49,
    items: [
      { name: 'Item B', price: 44.75, quantity: 2, image: 'https://via.placeholder.com/40' },
    ],
  },
  {
    id: 4,
    customer: 'Mark Anothny',
    phone: '+15552223333',
    address: '456 New York, NY',
    orderId: 'ORD729012',
    date: '2024-05-15',
    status: 'Shipped',
    total: 89.49,
    items: [
      { name: 'Item B', price: 44.75, quantity: 2, image: 'https://via.placeholder.com/40' },
    ],
  },
  {
    id: 5,
    customer: 'Jude Essien',
    phone: '+15552244333',
    address: '456 New York, NY',
    orderId: 'ORD780012',
    date: '2024-05-15',
    status: 'Cancelled',
    total: 89.49,
    items: [
      { name: 'Item B', price: 44.75, quantity: 2, image: 'https://via.placeholder.com/40' },
    ],
  },
  {
    id: 6,
    customer: 'Pal Smith',
    phone: '+15552223333',
    address: '456 New York, NY',
    orderId: 'ORD785012',
    date: '2024-05-15',
    status: 'Cancelled',
    total: 89.49,
    items: [
      { name: 'Item B', price: 44.75, quantity: 2, image: 'https://via.placeholder.com/40' },
    ],
  },
]);

const filterStatus = ref('');
const searchQuery = ref('');
const modalRef = ref(null);
const selectedOrder = ref({ items: [] });

const filteredOrders = computed(() =>
  orders.value.filter((order) => {
    const byStatus = filterStatus.value ? order.status === filterStatus.value : true;
    const bySearch = [order.customer, order.orderId]
      .some((field) => field.toLowerCase().includes(searchQuery.value.toLowerCase()));
    return byStatus && bySearch;
  })
);

const statusOrder = ['Created', 'Pending', 'Shipped', 'Completed'];
const getStepClass = (step) => {
  const current = selectedOrder.value.status;
  const idxCur  = statusOrder.indexOf(current);
  const idxStep = statusOrder.indexOf(step);
  if (current === 'Cancelled')   return 'step-error';
  if (current === 'Completed')   return 'step-success';
  if (idxStep < idxCur)          return 'step-success';
  if (idxStep === idxCur)        return 'step-warning';
  return '';
};

const countByStatus = (s) => orders.value.filter((o) => o.status === s).length;

const viewOrder = (order) => {
  selectedOrder.value = { ...order, items: order.items || [] };
  modalRef.value?.showModal();
};

onMounted(() => {
  setInterval(() => {
    const pending = orders.value.find((o) => o.status === 'Pending');
    if (pending) pending.status = 'Completed';
  }, 10000);
});

const exportToCSV = () => {
  const headers = ['Customer', 'Phone', 'Address', 'Order ID', 'Date', 'Status', 'Total'];

  const escapeCSV = (field) => {
    if (typeof field === 'number' && field.toString().length > 10) {
      // Force phone number to be treated as a string
      return `"${field}"`;
    }
    if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
      return `"${field.replace(/"/g, '""')}"`; // Escape quotes
    }
    return field;
  };

  const rows = orders.value.map((o) => [
    escapeCSV(o.customer),
    escapeCSV(o.phone),
    escapeCSV(o.address),
    escapeCSV(o.orderId),
    escapeCSV(o.date),
    escapeCSV(o.status),
    escapeCSV(o.total),
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'orders.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
