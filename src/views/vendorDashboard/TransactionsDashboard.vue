<template>
  <div class="p-4 md:p-8 space-y-6">
    <!-- Heading + Mobile Add Button -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-bold">Transactions</h2>
      <button @click="showModal = true" class="btn btn-primary btn-sm md:hidden">+ Add Transaction</button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row md:items-center gap-4">
      <select v-model="filters.type" class="select select-bordered w-full md:w-48">
        <option value="">All Types</option>
        <option value="sale">Sales</option>
        <option value="order">Orders</option>
        <option value="expense">Expenses</option>
      </select>

      <input v-model="filters.startDate" type="date" placeholder="mm/dd/yyyy" class="input input-bordered w-full md:w-48" />
      <input v-model="filters.endDate" type="date" placeholder="mm/dd/yyyy" class="input input-bordered w-full md:w-48" />
    </div>

    <!-- Chart + Form (desktop) -->
    <div class="md:flex gap-6">
      <!-- Chart -->
      <div class="w-full md:w-1/2 bg-white shadow rounded p-4">
        <h3 class="font-bold mb-2">Transaction Summary</h3>
        <canvas ref="chartRef" class="w-full h-64" />
      </div>

      <!-- Form -->
      <div class="hidden md:block w-1/2 bg-white h-full shadow rounded p-4">
        <h3 class="font-bold text-lg mb-4">Add Transaction</h3>
        <form @submit.prevent="addTransaction" class="space-y-4">
          <select v-model="newTransaction.type" class="select select-bordered w-full" required>
            <option value="" disabled>Select Type</option>
            <option value="sale">Sale</option>
            <option value="expense">Expense</option>
          </select>

          <input v-model="newTransaction.amount" type="number" step="0.01" class="input input-bordered w-full" placeholder="Amount" required />
          <input v-model="newTransaction.description" type="text" class="input input-bordered w-full" placeholder="Description" required />
          <input v-model="newTransaction.date" type="date" class="input input-bordered w-full" required />

          <input
            v-if="newTransaction.type === 'sale'"
            v-model="newTransaction.soldBy"
            type="text"
            class="input input-bordered w-full"
            placeholder="Sold By"
            required
          />

          <div class="flex justify-end">
            <button class="btn btn-primary" type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full mt-6">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Amount ($)</th>
            <th>Description</th>
            <th>Date</th>
            <th v-if="hasSales">Sold By</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, index) in paginatedTransactions" :key="t.id">
            <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td class="capitalize">{{ t.type }}</td>
            <td>{{ t.amount.toFixed(2) }}</td>
            <td>{{ t.description }}</td>
            <td>{{ t.date }}</td>
            <td v-if="t.type === 'sale'">{{ t.soldBy || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <div class="join">
        <button class="join-item btn btn-sm" @click="prevPage" :disabled="currentPage === 1">«</button>
        <button class="join-item btn btn-sm">{{ currentPage }}</button>
        <button class="join-item btn btn-sm" @click="nextPage" :disabled="endIndex >= filteredTransactions.length">»</button>
      </div>
    </div>

    <!-- Export Button -->
    <div class="flex justify-end">
      <button class="btn btn-outline" @click="exportToCSV">Export CSV</button>
    </div>

    <!-- Mobile Modal -->
    <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" :open="showModal">
      <div class="modal-box animate-fade-in">
        <h3 class="font-bold text-lg mb-4">Add Transaction</h3>
        <form @submit.prevent="addTransaction" class="space-y-4">
          <select v-model="newTransaction.type" class="select select-bordered w-full" required>
            <option value="" disabled>Select Type</option>
            <option value="sale">Sales</option>
            <option value="expense">Expense</option>
          </select>

          <input v-model="newTransaction.amount" type="number" step="0.01" class="input input-bordered w-full" placeholder="Amount" required />
          <input v-model="newTransaction.description" type="text" class="input input-bordered w-full" placeholder="Description" required />
          <input v-model="newTransaction.date" type="date" class="input input-bordered w-full" required />

          <input
            v-if="newTransaction.type === 'sale'"
            v-model="newTransaction.soldBy"
            type="text"
            class="input input-bordered w-full"
            placeholder="Sold By"
            required
          />

          <div class="flex justify-end gap-2">
            <button class="btn btn-ghost" type="button" @click="showModal = false">Cancel</button>
            <button class="btn btn-primary" type="submit" @click="showModal = false">Add</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const transactions = ref([
  { id: 1, type: 'sale', amount: 150.0, description: 'Sold rice', date: '2024-05-01', soldBy: 'Jane' },
  { id: 2, type: 'order', amount: 300.0, description: 'Customer order', date: '2024-05-02' },
  { id: 3, type: 'expense', amount: 50.0, description: 'Fuel expense', date: '2024-05-03' },
]);

const filters = ref({ type: '', startDate: '', endDate: '' });

const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const matchType = !filters.value.type || t.type === filters.value.type;
    const matchStart = !filters.value.startDate || new Date(t.date) >= new Date(filters.value.startDate);
    const matchEnd = !filters.value.endDate || new Date(t.date) <= new Date(filters.value.endDate);
    return matchType && matchStart && matchEnd;
  });
});

const hasSales = computed(() => filteredTransactions.value.some(t => t.type === 'sale'));

const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTransactions.value.slice(start, start + itemsPerPage);
});

const endIndex = computed(() => currentPage.value * itemsPerPage);
function nextPage() {
  if (endIndex.value < filteredTransactions.value.length) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

const chartRef = ref(null);
let chartInstance;

const renderChart = () => {
  const counts = { sale: 0, order: 0, expense: 0 };
  filteredTransactions.value.forEach(t => counts[t.type]++);
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Sales', 'Orders', 'Expenses'],
      datasets: [{
        data: [counts.sale, counts.order, counts.expense],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      }],
    },
  });
};

watch(filteredTransactions, renderChart);
onMounted(renderChart);

// Modal state
const showModal = ref(false);

// Form logic
const newTransaction = ref({
  type: '',
  amount: '',
  description: '',
  date: '',
  soldBy: '',
});

const addTransaction = () => {
  const transaction = {
    ...newTransaction.value,
    id: Date.now(),
    amount: parseFloat(newTransaction.value.amount),
  };

  if (transaction.type !== 'sale') {
    delete transaction.soldBy;
  }

  transactions.value.push(transaction);

  // Reset
  newTransaction.value = {
    type: '',
    amount: '',
    description: '',
    date: '',
    soldBy: '',
  };

  renderChart();
};

// CSV export
const exportToCSV = () => {
  const csvContent = [
    ['Type', 'Amount', 'Description', 'Date', 'Sold By'],
    ...filteredTransactions.value.map(t => [
      t.type,
      t.amount.toFixed(2),
      t.description,
      t.date,
      t.soldBy || '',
    ]),
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'transactions.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
