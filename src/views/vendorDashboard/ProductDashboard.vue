<template>
  <div class="p-4 sm:p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Products</h1>
      <div class="flex gap-3 flex-wrap">
        <button @click="exportToCSV" class="btn btn-outline btn-success">
          Export CSV
        </button>
        <button @click="openModal" class="btn btn-primary">Add Product</button>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <input
        type="text"
        v-model="search"
        placeholder="Search by name..."
        class="input input-bordered w-full"
      />
      <select v-model="filterCategory" class="select select-bordered w-full">
        <option value="">All Categories</option>
        <option v-for="cat in categoryOptions" :key="cat">{{ cat }}</option>
      </select>
      <select v-model="filterType" class="select select-bordered w-full">
        <option value="">All Types</option>
        <option v-for="type in typeOptions" :key="type">{{ type }}</option>
      </select>
      <!-- <select v-model="filterType" class="select select-bordered w-full">
        <option value="">In stock</option>
        <option v-for="type in typeOptions" :key="type">{{ type }}</option>
      </select> -->
    </div>

    <!-- Products Table -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="table w-full text-sm sm:text-base">
        <thead class="bg-base-200 text-base-content font-semibold uppercase">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Price ($)</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="index" class="hover">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.price.toFixed(2) }}</td>
            <td>
              <div class="flex gap-2">
                <img
                  v-for="(photo, i) in product.photos"
                  :key="i"
                  :src="photo.preview"
                  class="w-10 h-10 object-cover rounded"
                  alt="Product Image"
                  loading="lazy"
                />
              </div>
            </td>
          </tr>
          <tr v-if="paginatedProducts.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">No products found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <div>
        <label class="label">
          <span class="label-text">Items per page:</span>
        </label>
        <select v-model.number="pageSize" class="select select-bordered w-24">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>

      <div class="join">
        <button
          class="join-item btn"
          :disabled="page === 1"
          @click="page--"
        >Prev</button>
        <button class="join-item btn btn-ghost cursor-default">{{ page }}</button>
        <button
          class="join-item btn"
          :disabled="page === totalPages"
          @click="page++"
        >Next</button>
      </div>
    </div>

    <!-- Add Product Modal -->
    <dialog ref="modalRef" id="addProductModal" class="modal modal-bottom sm:modal-middle">
      <form method="dialog" class="modal-box space-y-4" @submit.prevent="addProduct">
        <h3 class="font-bold text-lg">Add New Product</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="newProduct.name" type="text" placeholder="Product Name" class="input input-bordered w-full" />
          <input v-model="newProduct.category" type="text" placeholder="Category" class="input input-bordered w-full" />
          <input v-model="newProduct.type" type="text" placeholder="Type" class="input input-bordered w-full" />
          <input v-model.number="newProduct.price" type="number" placeholder="Price" class="input input-bordered w-full" />
        </div>
        <div
          @dragover.prevent
          @drop.prevent="handleDrop"
          class="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-primary"
          @click="triggerFileInput"
        >
          <p class="text-gray-500">Drag & drop or click to upload <strong>2 images</strong></p>
          <input type="file" accept="image/*" multiple ref="fileInput" @change="handleFileChange" class="hidden" />
          <div class="flex justify-center mt-3 gap-3">
            <div
              v-for="(img, index) in newProduct.photos"
              :key="index"
              class="w-20 h-20 rounded border overflow-hidden"
            >
              <img :src="img.preview" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const modalRef = ref(null);
const fileInput = ref(null);
const search = ref('');
const filterCategory = ref('');
const filterType = ref('');
const page = ref(1);
const pageSize = ref(5);

// Dummy products
const products = ref([]);
onMounted(() => {
  products.value = Array.from({ length: 22 }, (_, i) => ({
    name: `Rice Type ${i + 1}`,
    category: ['Grain', 'Cereal'][i % 2],
    type: ['White', 'Brown'][i % 2],
    price: Math.random() * 50 + 10,
    photos: [
      {
        preview: 'https://via.placeholder.com/100?text=Photo+1',
      },
      {
        preview: 'https://via.placeholder.com/100?text=Photo+2',
      },
    ],
  }));
});

// Filters
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (!filterCategory.value || p.category === filterCategory.value) &&
      (!filterType.value || p.type === filterType.value)
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / pageSize.value)
);

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredProducts.value.slice(start, start + pageSize.value);
});

const categoryOptions = computed(() => [...new Set(products.value.map((p) => p.category))]);
const typeOptions = computed(() => [...new Set(products.value.map((p) => p.type))]);

// Product form
const newProduct = ref({
  name: '',
  category: '',
  type: '',
  price: null,
  photos: [],
});

const openModal = () => {
  modalRef.value.showModal();
};

const closeModal = () => {
  modalRef.value.close();
  resetForm();
};

const resetForm = () => {
  newProduct.value = {
    name: '',
    category: '',
    type: '',
    price: null,
    photos: [],
  };
};

const addProduct = () => {
  if (newProduct.value.photos.length !== 2) {
    alert('Please upload exactly 2 images.');
    return;
  }
  products.value.unshift({ ...newProduct.value });
  closeModal();
};

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files).slice(0, 2);
  handleImagePreview(files);
};

const handleFileChange = (e) => {
  const files = Array.from(e.target.files).slice(0, 2);
  handleImagePreview(files);
};

const handleImagePreview = (files) => {
  const previews = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));
  newProduct.value.photos = previews;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const exportToCSV = () => {
  const csvContent = [
    ['Name', 'Category', 'Type', 'Price'],
    ...filteredProducts.value.map((p) => [p.name, p.category, p.type, p.price.toFixed(2)]),
  ]
    .map((row) => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'products.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
