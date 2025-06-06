<template>
  <div class="p-4 md:p-8 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Sales</h1>
      <button @click="showModal = true" class="btn btn-primary btn-sm md:hidden">+ Add Record</button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row md:items-center gap-4">
      <select v-model="filters.type" class="select select-bordered w-full md:w-48">
        <option value="">All Sales Person</option>
        <option v-for="person in soldByOptions" :key="person" :value="person">
          {{ person }}
        </option>
      </select>
      <label class="text-sm font-semibold">Start Date:</label>
      <input v-model="filters.startDate" type="date" class="input input-bordered w-full md:w-48" />
      <label class="text-sm font-semibold">End Date:</label>
      <input v-model="filters.endDate" type="date" class="input input-bordered w-full md:w-48" />
    </div>

    <!-- Chart + Add Form -->
    <div class="md:flex gap-6">
      <!-- Form -->
      <div class="hidden md:block w-1/2  bg-white h-full shadow rounded p-4">
        <h3 class="font-bold text-lg mb-4">Create Sale</h3>
        <form @submit.prevent="submitSale">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <input v-model="newSale.soldBy" class="input input-bordered w-full" placeholder="Sold By" required />
          <input v-model="newSale.soldTo" class="input input-bordered w-full" placeholder="Sold To" />
          <!-- <textarea name="description" id="description" rows="5" v-model="newSale.description" class="input input-bordered w-full h-full p-2" placeholder="Description (optional)">
          </textarea> -->
       
          <select v-model="newSale.paymentMethod" class="select select-bordered w-full" placeholder="Payment Method" required>
            <option disabled value="">Choose</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="other">Other</option>
          </select>
       

          <!-- Line Items -->
          <div class="space-y-2 flex flex-col justify-center items-center">
            <div
              v-for="(item, i) in newSale.line_items"
              :key="i"
              class="flex flex-wrap gap-2 items-start"
            >
              <input
                v-model="item.search"
                @input="searchProduct(i)"
                class="input input-bordered w-48"
                placeholder="Search product"
              />
              <ul
                v-if="item.suggestions.length"
                class="absolute bg-white border rounded w-48 max-h-32 overflow-y-auto z-10"
              >
                <li
                  v-for="product in item.suggestions"
                  :key="product.id"
                  class="p-2 hover:bg-gray-200 cursor-pointer"
                  @click="selectProduct(i, product)"
                >
                  {{ product.name }}
                </li>
              </ul>
              <input
                v-model.number="item.quantity"
                type="number"
                min="1"
                class="input input-bordered w-20"
                placeholder="Qty"
              />
              <input
                v-model.number="item.price"
                type="number"
                step="0.01"
                class="input input-bordered w-24"
                placeholder="Price"
                readonly
              />
              <button type="button" class="btn btn-sm btn-error" @click="removeLineItem(i)">X</button>
              <span
                v-if="item.product && item.quantity > item.product.currentQuantity"
                class="text-red-500 text-xs"
              >
                ⚠ Stock exceeded
              </span>
            </div>

            <button type="button" class="btn btn-outline btn-sm" @click="addLineItem">+ Add Product</button>
          </div>

          <div class="text-right text-sm md:text-xl font-semibold">Subtotal: ₦ {{ subtotal.toFixed(2) }}</div>

          <div class="flex justify-end">
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
          </fieldset>
        </form>
      </div>
      <!-- Chart -->
      <div class="w-full md:w-1/2 bg-white shadow rounded-xl p-4">
        <h3 class="font-bold mb-2">Summary</h3>
        <canvas ref="chartRef" class="w-full" />
      </div>
    </div>

     <!-- Table (Desktop) -->
<div class="hidden md:block overflow-x-auto rounded-lg shadow">
  <table class="table w-full mt-6">
    <thead class="bg-base-200 text-base-content font-semibold uppercase">
      <tr>
        <th>#</th> 
        <th>Date</th>
        <th>Description</th>
        
        <th>Sold To</th>
        <th v-if="hasSales">Sold By</th>
        <th>Payment</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(t, index) in paginatedTransactions" :key="t.id">
        <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td> 
        <td>{{ new Date(t.created_at).toLocaleDateString() }}</td>
        <td>{{ t.description || '—' }}</td>
        
        <td>{{ t.soldTo }}</td>
        <td v-if="hasSales">{{ t.soldBy || '—' }}</td>
         <td class="capitalize">{{ t.paymentMethod }}</td>
        <td>₦ {{ t.subtotal ? t.subtotal : '0.00' }}</td>
      </tr>
    </tbody>
  </table>
</div>
    <!-- Mobile Card View -->
    <div class="md:hidden space-y-4 mt-6">
      <div
        v-for="t in paginatedTransactions"
        :key="t.id"
        class="bg-white shadow rounded-xl p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-semibold capitalize">{{ t.type }}</span>
          <span class="text-sm text-gray-500">{{ t.date }}</span>
        </div>
        <div class="text-lg font-bold text-gray-800">₦ {{ t.subtotal }}</div>
        <p class="text-sm text-gray-700 mt-1">{{ t.description }}</p>
        <p v-if="t.soldBy" class="text-xs text-gray-500 mt-1">Sold By: {{ t.soldBy || '—' }}</p>
         <p class="text-xs text-gray-500 mt-1">Sold To: {{ t.soldTo || '—' }}</p>
         <p>Date: {{ new Date(t.created_at).toLocaleDateString() }}</p>
      </div>
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
    <div class="flex justify-end mt-2">
      <button class="btn btn-outline" @click="exportToCSV">Export CSV</button>
    </div>

    <!-- Mobile Modal -->
    <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" :open="showModal">
      <div class="modal-box animate-fade-in">
        <h3 class="font-bold text-lg mb-4">Create Sales</h3>
        <div class="text-right text-lg md:text-xl font-semibold mb-3">Subtotal: ₦ {{ subtotal.toFixed(2) }}</div>
        <form @submit.prevent="submitSale" class="space-y-4">
          <input v-model="newSale.soldBy" type="text" class="input input-bordered w-full" placeholder="Sold By" required />
          <input v-model="newSale.soldTo" type="text" class="input input-bordered w-full" placeholder="Sold To" />
          <!-- <input v-model="newSale.description" type="text" class="input input-bordered w-full" placeholder="Description" /> -->
          <select v-model="newSale.paymentMethod" class="select select-bordered w-full" required>
            <option disabled value="">Select Payment Method</option>
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Other</option>
          </select>
           <!-- Line Items -->
          <div class="space-y-2 flex flex-col justify-center items-center">
            <div
              v-for="(item, i) in newSale.line_items"
              :key="i"
              class="flex flex-wrap gap-2 items-start"
            >
              <input
                v-model="item.search"
                @input="searchProduct(i)"
                class="input input-sm input-bordered w-28"
                placeholder="Search Item"
                required
              />
              <ul
                v-if="item.suggestions.length"
                class="absolute bg-white border rounded w-48 max-h-32 overflow-y-auto z-10"
              >
                <li
                  v-for="product in item.suggestions"
                  :key="product.id"
                  class="p-2 hover:bg-gray-200 cursor-pointer"
                  @click="selectProduct(i, product)"
                >
                  {{ product.name }}
                </li>
              </ul>
              <input
                v-model.number="item.quantity"
                type="number"
                min="1"
                class="input input-sm input-bordered w-10"
                placeholder="Qty"
                required
              />
              <input
                v-model.number="item.price"
                type="number"
                step="0.01"
                class="input input-sm input-bordered w-20"
                placeholder="Price"
                readonly
              />
              <button type="button" class="btn btn-sm btn-error" @click="removeLineItem(i)">X</button>
              <span
                v-if="item.product && item.quantity > item.product.currentQuantity"
                class="text-red-500 text-xs"
              >
                ⚠ Stock exceeded
              </span>
            </div>
            <button type="button" class="btn btn-outline btn-sm mb-3" @click="addLineItem">+ Add Item</button>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn btn-sm btn-ghost" type="button" @click="showModal = false">Cancel</button>
            <button class="btn btn-sm btn-primary" type="submit" @click="showModal = false">Submit</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, watch, vModelCheckbox } from 'vue'
import Chart from 'chart.js/auto'
import jsPDF from 'jspdf'
import { useVendorStore } from '@/store/VendorStore'
import { useToast } from 'vue-toastification'

const toast = useToast()
const vendorStore = useVendorStore()
// Filters
const filters = ref({ type: '', startDate: '', endDate: '' })
// Product list
const products = ref([])
const transactions = ref([])
const fetchProducts = async () => {
  await vendorStore.getVendorProducts()
  products.value = vendorStore.products
  // get sales record also
  await vendorStore.getSalesRecord()
  transactions.value = vendorStore.sales?.results || []
}
const soldByOptions = computed(() => {
  const unique = new Set()
  transactions.value.forEach(t => {
    if (t.soldBy) unique.add(t.soldBy)
  })
  return Array.from(unique)
})
const user = JSON.parse(localStorage.getItem('user'));
const username = user?.username
// Sale Form
const newSale = reactive({
  soldBy: username,
  soldTo: '',
  description: '',
  paymentMethod: '',
  date: '',
  type: 'sale',
  line_items: []
})

const addLineItem = () => {
  newSale.line_items.push({
    search: '',
    product: null,
    product_id: null,
    quantity: 1,
    price: 0,
    suggestions: []
  })
}
const removeLineItem = (index) => {
  newSale.line_items.splice(index, 1)
}

const searchProduct = (index) => {
  const keyword = newSale.line_items[index].search.toLowerCase()
  newSale.line_items[index].suggestions = products.value.filter(p =>
    p.name.toLowerCase().includes(keyword)
  )
}

const selectProduct = (i, product) => {
  const item = newSale.line_items[i]
  item.product = product
  item.product_id = product.itemId
  item.price = product.currentPrice
  item.search = product.name
  item.suggestions = []
}

// Subtotal calculation
const subtotal = computed(() =>
  newSale.line_items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
)

// Save and Generate Invoice
const submitSale = async () => {
  const payload = {
    soldBy: newSale.soldBy,
    soldTo: newSale.soldTo,
    description: newSale.description,
    paymentMethod: newSale.paymentMethod,
    line_items: newSale.line_items.map(item => ({
      product: item.product_id,
      quantity: item.quantity,
    }))
  }

  const  res = await vendorStore.CreateSalesRecord(payload)
  if (!vendorStore.error.sales){
    const data = res
    toast.success('Created Successfully!')
    // Update local transactions state
    transactions.value.unshift({
      soldBy: data.soldBy,
      soldTo: data.soldTo,
      description: data.description,
      subtotal: data.subtotal,
      paymentMethod: data.paymentMethod,
      created_at: data.created_at
    })
    generateInvoice(data)
    Object.assign(newSale, {
    soldBy: username, soldTo: '', description: '', paymentMethod: '', date: '',
    type: 'sale', line_items: []
  })
  addLineItem()
  await vendorStore.getSalesRecord()
  transactions.value = vendorStore.sales?.results || []
  renderChart()
  } else {
    toast.error(vendorStore.error.sales)
  }
}

// Generate PDF Invoice
const generateInvoice = (sale) => {
  const doc = new jsPDF()
  doc.setFontSize(16).text('Invoice', 105, 20, null, null, 'center')
  doc.setFontSize(12)
  doc.text(`Sold By: ${sale.soldBy}`, 14, 30)
  doc.text(`Sold To: ${sale.soldTo}`, 14, 40)
  doc.text(`Date: ${sale.created_at}`, 14, 50)
  doc.text(`Description: ${sale.description}`, 14, 60)

  let y = 80
  newSale.line_items.forEach((item, i) => {
    doc.text(
      `${i + 1}. ${item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}`,
      14,
      y
    )
    y += 10
  })

  doc.text(`Subtotal: $${subtotal.value.toFixed(2)}`, 14, y + 10)
  doc.save(`invoice-${sale.id}.pdf`)
}

// CSV Export
const exportToCSV = () => {
  const csv = [
    ['Description', 'Date', 'Sold By', 'Payment', 'Subtotal'],
    ...filteredTransactions.value.map(t => [
      t.description,
      t.date,
      t.soldBy || '',
      t.paymentMethod,
      t.subtotal
    ])
  ].map(row => row.join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'sales.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10
const endIndex = computed(() => currentPage.value * itemsPerPage)

const filteredTransactions = computed(() => {
  return transactions.value.filter(t => {
    const matchType = !filters.value.type || t.soldBy === filters.value.type
    const matchStart = !filters.value.startDate || new Date(t.date) >= new Date(filters.value.startDate)
    const matchEnd = !filters.value.endDate || new Date(t.date) <= new Date(filters.value.endDate)
    return matchType && matchStart && matchEnd
  })
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredTransactions.value.slice(start, endIndex.value)
})

const nextPage = () => {
  if (endIndex.value < filteredTransactions.value.length) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Chart Summary
const chartRef = ref(null)
let chartInstance = null

const renderChart = () => {
  const counts = {}
  filteredTransactions.value.forEach(t => {
  const name = t.soldBy || 'Unknown'
  counts[name] = (counts[name] || 0) + 1
})

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: [
        '#10b981', '#3b82f6', '#f59e0b',
        '#6366f1', '#ef4444', '#8b5cf6', '#14b8a6'
      ]
      }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Sales Per Person',
      }
    }
  }
  })
}

const showModal = ref(false)
const hasSales = computed(() => filteredTransactions.value.some(t => t.soldBy))

onMounted(() => {
  fetchProducts()
  renderChart()
  addLineItem()
})
watch(filteredTransactions, renderChart)
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