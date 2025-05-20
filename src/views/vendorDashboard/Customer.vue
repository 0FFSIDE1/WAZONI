<template>
  <div class="p-4 md:p-8 space-y-6">
    <!-- Heading + Mobile Add Button -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Customers</h1>
      <button @click="showModal = true" class="btn btn-primary btn-sm">+ Add</button>
    </div>
    <!-- Filters -->
<div class="flex flex-col md:flex-row md:items-center gap-4">
  <input
    v-model="filters.search"
    type="text"
    placeholder="Search by name or phone"
    class="input input-bordered w-full md:w-64"
  />
  <input
    v-model="filters.date"
    type="date"
    class="input input-bordered w-full md:w-64"
  />
  <button @click="exportToCSV" class="btn btn-outline btn-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>
Export CSV</button>
</div>

<!-- Charts -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- Monthly Chart -->
  <div class="bg-white shadow-lg rounded-xl p-4">
    <BarChart :chart-data="monthlyChartData" :chart-options="monthlyChartOptions" />
  </div>

  <!-- Daily Chart -->
  <div class="bg-white shadow-lg rounded-xl p-4">
    <BarChart :chart-data="dailyChartData" :chart-options="dailyChartOptions" />
  </div>
</div>
    

    <!-- Desktop Table -->
    <div class="overflow-x-auto hidden md:block">
      <table class="table table-zebra w-full mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, index) in paginatedCustomers" :key="c.id">
            <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td>{{ c.name }}</td>
            <td>{{ c.email }}</td>
            <td>{{ c.phone }}</td>
            <td>{{ c.joinedDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="space-y-4 md:hidden">
      <div v-for="c in paginatedCustomers" :key="c.id" class="card bg-white shadow-md p-4 rounded">
        <h3 class="font-bold text-lg">{{ c.name }}</h3>
        <p class="text-sm">Email: {{ c.email }}</p>
        <p class="text-sm">Phone: {{ c.phone }}</p>
        <p class="text-xs text-gray-500">Joined: {{ c.joinedDate }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <div class="join">
        <button class="join-item btn btn-sm" @click="prevPage" :disabled="currentPage === 1">«</button>
        <button class="join-item btn btn-sm">{{ currentPage }}</button>
        <button class="join-item btn btn-sm" @click="nextPage" :disabled="endIndex >= filteredCustomers.length">»</button>
      </div>
    </div>

    <!-- Add Customer Modal (mobile only) -->
    <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" :open="showModal">
      <div class="modal-box animate-fade-in">
        <h3 class="font-bold text-lg mb-4">Add Customer</h3>
        <form @submit.prevent="addCustomer" class="space-y-4">
          <input v-model="newCustomer.name" type="text" class="input input-bordered w-full" placeholder="Name" required />
          <input v-model="newCustomer.email" type="email" class="input input-bordered w-full" placeholder="Email" required />
          <input v-model="newCustomer.phone" type="tel" class="input input-bordered w-full" placeholder="Phone" required />

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
import { ref, computed } from 'vue';
import BarChart from '@/components/dashboardComponents/VendorCustomerBarChart.vue';

// Sample data
const customers = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', joinedDate: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-222-3333', joinedDate: '2024-03-10' },
  { id: 3, name: 'Clara White', email: 'clara@example.com', phone: '555-987-6543', joinedDate: '2024-03-25' },
  { id: 4, name: 'Pal White', email: 'd@example.com', phone: '555-555-5355', joinedDate: '2024-04-02' },
  { id: 4, name: 'David Mark', email: 'daid@example.com', phone: '555-55-5544', joinedDate: '2025-04-02' },
  { id: 4, name: 'Luke Jhn', email: 'dav@example.com', phone: '555-555-5675', joinedDate: '2025-05-02' },
  { id: 4, name: 'David ANothon', email: 'id@example.com', phone: '555-465-5555', joinedDate: '2025-02-02' },
  { id: 4, name: 'David Luke', email: 'vid@example.com', phone: '555-534-5555', joinedDate: '2025-07-02' },
  { id: 4, name: 'Daniel Grey', email: 'avid@example.com', phone: '345-555-5555', joinedDate: '2025-07-02' },
  { id: 4, name: 'WHite Grey', email: 'dad@example.com', phone: '675-555-5555', joinedDate: '2025-07-02' },
]);

const currentYear = new Date().getFullYear();
const filters = ref({ search: '', date: '' });

// CSV Export
const exportToCSV = () => {
  const csvRows = [
    ['ID', 'Name', 'Email', 'Phone', 'Joined Date'],
    ...filteredCustomers.value.map(c => [c.id, c.name, c.email, c.phone, c.joinedDate])
  ];

  const csvContent = csvRows.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `customers-${currentYear}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// Filtered customers
const filteredCustomers = computed(() => {
  const search = filters.value.search.toLowerCase();
  const date = filters.value.date;

  return customers.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search) || c.phone.includes(search);
    const matchesDate = date ? c.joinedDate === date : true;
    return matchesSearch && matchesDate;
  });
});

// Monthly Chart Data
const monthlyChartData = computed(() => {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(currentYear, i).toLocaleString('default', { month: 'short' })
  );
  const counts = Array(12).fill(0);

  filteredCustomers.value.forEach(c => {
    const date = new Date(c.joinedDate);
    if (date.getFullYear() === currentYear) {
      counts[date.getMonth()]++;
    }
  });

  return {
    labels: months,
    datasets: [
      {
        label: 'New Customers per Month',
        data: counts,
        backgroundColor: '#3b82f6',
      },
    ],
  };
});

const monthlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    title: { display: true, text: `New Customers in ${currentYear} (Monthly)` }
  },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 } }
  }
};

// Daily Chart Data
const dailyChartData = computed(() => {
  const days = {};
  filteredCustomers.value.forEach(c => {
    const date = new Date(c.joinedDate);
    if (date.getFullYear() === currentYear) {
      const dateStr = date.toISOString().split('T')[0];
      days[dateStr] = (days[dateStr] || 0) + 1;
    }
  });

  const labels = Object.keys(days).sort();
  const data = labels.map(date => days[date]);

  return {
    labels,
    datasets: [
      {
        label: 'New Customers per Day',
        data,
        backgroundColor: '#10b981',
      },
    ],
  };
});

const dailyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    title: { display: true, text: `New Customers in ${currentYear} (Daily)` }
  },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 } }
  }
};

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCustomers.value.slice(start, start + itemsPerPage);
});

const endIndex = computed(() => currentPage.value * itemsPerPage);
const nextPage = () => { if (endIndex.value < filteredCustomers.value.length) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };

// Modal + Add
const showModal = ref(false);
const newCustomer = ref({ name: '', email: '', phone: '' });

const addCustomer = () => {
  const customer = {
    ...newCustomer.value,
    id: Date.now(),
    joinedDate: new Date().toISOString().split('T')[0],
  };
  customers.value.push(customer);
  newCustomer.value = { name: '', email: '', phone: '' };
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
