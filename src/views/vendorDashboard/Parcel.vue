<template>
  <div class="p-4">
    <h2 class="text-xl md:text-2xl font-bold mb-4">📦 Delivery Management</h2>

    <!-- Top Section: Chart + Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <!-- Actions -->
    <div class="card bg-base-100 shadow-md">
        <div class="card-body space-y-4">
          <div class="flex justify-between items-center">
            <button class="btn btn-xs md:btn-sm btn-primary" @click="openCreateModal = true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>Create
            </button>
            <button class="btn btn-xs md:btn-sm btn-outline" @click="exportCSV">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>Export CSV
            </button>
          </div>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Search parcels..."
            class="input input-bordered w-full"
          />
        </div>
      </div>
      <!-- Chart -->
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h3 class="text-lg font-semibold">📊Overview</h3>
          <canvas id="parcelChart" class="w-full h-48"></canvas>
        </div>
      </div>


    </div>
    <!-- Filters -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
  <select v-model="filterStatus" class="select select-bordered w-full">
    <option value="">All Statuses</option>
    <option>Pending</option>
    <option>In Transit</option>
    <option>Delivered</option>
  </select>

  <input
    type="date"
    v-model="startDate"
    class="input input-bordered w-full"
    placeholder="Start Date"
  />
  <input
    type="date"
    v-model="endDate"
    class="input input-bordered w-full"
    placeholder="End Date"
  />
</div>
    <!-- Parcel List Table for Large Screens -->
    <div class="hidden md:block overflow-x-auto shadow rounded-lg">
    <table class="table table-zebra w-full">
        <thead class="bg-base-200">
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(parcel, index) in filteredParcels"
            :key="parcel.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ parcel.name }}</td>
            <td>
              <select v-model="parcel.status" class="select select-sm select-bordered" @change="updateChart">
                <option>Pending</option>
                <option>In Transit</option>
                <option>Delivered</option>
              </select>
            </td>
            <td>{{ parcel.date }}</td>
            <td class="space-x-2">
              <button class="btn btn-sm btn-outline" @click="selectedParcel = parcel; openViewModal = true">
                View
              </button>
              <button class="btn btn-sm btn-error" @click="deleteParcel(parcel.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Parcel Cards for Small Screens -->
    <div class="md:hidden space-y-4">
      <div v-for="parcel in filteredParcels" :key="parcel.id" class="card bg-base-100 shadow-md">
        <div class="card-body">
          <h3 class="font-bold">{{ parcel.name }}</h3>
          <p><strong>Status:</strong>
            <select v-model="parcel.status" class="select select-sm select-bordered" @change="updateChart">
              <option>Pending</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </p>
          <p><strong>Date:</strong> {{ parcel.date }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-sm btn-outline" @click="selectedParcel = parcel; openViewModal = true">View</button>
            <button class="btn btn-sm btn-error" @click="deleteParcel(parcel.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-end">
      <div class="join">
        <button class="join-item btn btn-sm" :disabled="page === 1" @click="page--">«</button>
        <button class="join-item btn btn-sm">Page {{ page }}</button>
        <button class="join-item btn btn-sm" :disabled="!hasMore" @click="page++">»</button>
      </div>
    </div>

    <!-- Create Modal -->
    <dialog class="modal modal-bottom sm:modal-middle" :open="openCreateModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">🚚 Create New Parcel</h3>
        <form @submit.prevent="createParcel" class="space-y-4">
          <input v-model="newParcel.name" class="input input-bordered w-full" placeholder="Parcel Name" required />
          <select v-model="newParcel.status" class="select select-bordered w-full" required>
            <option disabled value="">Select Status</option>
            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>
          <div class="modal-action">
            <button type="button" class="btn" @click="openCreateModal = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </dialog>

    <!-- View Modal -->
    <dialog class="modal modal-bottom sm:modal-middle" :open="openViewModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">📦 Parcel Details</h3>
        <p><strong>Name:</strong> {{ selectedParcel.name }}</p>
        <p><strong>Status:</strong> {{ selectedParcel.status }}</p>
        <p><strong>Date:</strong> {{ selectedParcel.date }}</p>
        <div class="modal-action">
          <button class="btn" @click="openViewModal = false">Close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Chart from 'chart.js/auto'
const filterStatus = ref('')
const startDate = ref('')
const endDate = ref('')

const parcels = ref([
  { id: 1, name: 'Parcel A', status: 'Delivered', date: '2025-05-01' },
  { id: 2, name: 'Parcel B', status: 'In Transit', date: '2025-05-15' },
  { id: 3, name: 'Parcel C', status: 'Pending', date: '2025-05-20' }
])

const openCreateModal = ref(false)
const openViewModal = ref(false)
const selectedParcel = ref({})
const searchQuery = ref('')
const page = ref(1)
const perPage = 5
const newParcel = ref({ name: '', status: '' })
let chartInstance

const filteredParcels = computed(() => {
  return parcels.value
    .filter(p => {
      const nameMatch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const statusMatch = !filterStatus.value || p.status === filterStatus.value

      const parcelDate = new Date(p.date)
      const afterStart = !startDate.value || parcelDate >= new Date(startDate.value)
      const beforeEnd = !endDate.value || parcelDate <= new Date(endDate.value)

      return nameMatch && statusMatch && afterStart && beforeEnd
    })
    .slice((page.value - 1) * perPage, page.value * perPage)
})

const hasMore = computed(() => parcels.value.length > page.value * perPage)

const createParcel = () => {
  parcels.value.push({
    id: Date.now(),
    name: newParcel.value.name,
    status: newParcel.value.status,
    date: new Date().toISOString().split('T')[0]
  })
  newParcel.value = { name: '', status: '' }
  openCreateModal.value = false
  updateChart()
}

const deleteParcel = id => {
  parcels.value = parcels.value.filter(p => p.id !== id)
  updateChart()
}

const exportCSV = () => {
  const header = ['ID', 'Name', 'Status', 'Date']
  const rows = parcels.value.map(p => [p.id, p.name, p.status, p.date])
  const csv = [header, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'parcels.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const updateChart = () => {
  const statusCounts = { Pending: 0, 'In Transit': 0, Delivered: 0 }
  parcels.value.forEach(p => statusCounts[p.status]++)

  const ctx = document.getElementById('parcelChart')
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Parcel Count',
        data: Object.values(statusCounts),
        backgroundColor: ['#fbbf24', '#60a5fa', '#34d399']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  })
}

onMounted(updateChart)
</script>