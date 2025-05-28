<template>
  <div class="p-4 sm:p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-2xl font-bold">Products</h1>
      <div class="flex gap-3 flex-wrap">
        <button @click="exportToCSV" class="btn btn-outline btn-success">Export CSV</button>
        <button @click="openModal" class="btn btn-primary">Add Product</button>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <input type="text" v-model="search" placeholder="Search by name..." class="input input-bordered w-full" />
      <select v-model="filterCategory" class="select select-bordered w-full">
        <option value="">All Categories</option>
        <option v-for="cat in categoryOptions" :key="cat">{{ cat }}</option>
      </select>
      <select v-model="filterType" class="select select-bordered w-full">
        <option value="">All Types</option>
        <option v-for="type in typeOptions" :key="type">{{ type }}</option>
      </select>
    </div>

    <!-- Products Table -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="table w-full text-sm sm:text-base">
        <thead class="bg-base-200 text-base-content font-semibold uppercase">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Price (₦)</th>
            <th>Qty</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="index" class="hover">
            <td>{{ product.name }}</td>
            <td>{{ product.category_name }}</td>
            <td>{{ product.productType }}</td>
            <td>₦ {{ product.currentPrice.toFixed(2) }}</td>
            <td>
              {{ product.currentQuantity }}
            </td>
            <td>
              <input
              type="checkbox"
              v-model="product.inStock"
              @change="toggleStockStatus(product)"
              class="checkbox checkbox-primary"
              />
            </td>
            
            <td class="flex gap-1 flex-col md:flex-row">
              <button type="button" @click="editProduct(product)" class="btn btn-warning btn-sm">
                <PencilIcon class="h-5 w-5 text-white" />Edit
              </button>
              <button type="button" @click="deleteProduct(product.itemId)" class="btn btn-error btn-sm">
                <TrashIcon class="h-5 w-5 text-white" />Delete
              </button>
            </td>
          </tr>
          <tr v-if="paginatedProducts.length === 0">
            <td colspan="7" class="text-center py-4 text-gray-500">No products found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <div>
        <label class="label mr-2">
          <span class="label-text">Items per page:</span>
        </label>
        <select v-model.number="pageSize" class="select select-sm select-bordered w-24">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
      <div class="join">
        <button class="join-item btn" :disabled="page === 1" @click="page--">Prev</button>
        <button class="join-item btn btn-ghost cursor-default">{{ page }}</button>
        <button class="join-item btn" :disabled="page === totalPages" @click="page++">Next</button>
      </div>
    </div>

    <!-- Add/edit Product Modal -->
    <dialog ref="modalRef" id="addProductModal" class="modal modal-bottom sm:modal-middle">
      <form method="dialog" class="modal-box space-y-4" @submit.prevent="addProduct">
        <h3 class="font-bold text-lg">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="formProduct.name" type="text" placeholder="Name" class="input input-bordered w-full" />
          <input
            v-model="formProduct.category"
            list="categoryOptions"
            placeholder="Category"
            class="input input-bordered w-full"
          />
          <datalist id="categoryOptions">
            <option v-for="cat in categoryOptions" :key="cat" :value="cat" />
          </datalist>
          <input
            v-model="formProduct.productType"
            list="typeOptions"
            placeholder="Type"
            class="input input-bordered w-full"
          />
          <datalist id="typeOptions">
            <option v-for="type in typeOptions" :key="type" :value="type" />
          </datalist>

          <input
            v-model.number="formProduct.currentPrice"
            type="number"
            placeholder="Price"
            class="input input-bordered w-full"
          />

          <textarea
            rows="5"
            name="description"
            v-model="formProduct.description"
            placeholder="Description"
            class="textarea textarea-bordered w-full col-span-2"
          ></textarea>

          <input
            v-model.number="formProduct.currentQuantity"
            type="number"
            placeholder="Quantity"
            class="input input-bordered w-full col-span-2"
          />
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
              v-for="(img, index) in formProduct.photos"
              :key="index"
              class="w-20 h-20 rounded border overflow-hidden"
            >
              <img :src="img.preview" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Save' }}</button>
        </div>
      </form>
    </dialog>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVendorStore } from '@/store/VendorStore';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
const modalRef = ref(null);
const fileInput = ref(null);
const search = ref('');
const filterCategory = ref('');
const filterType = ref('');
const page = ref(1);
const pageSize = ref(5);
const toast = useToast()
const vendorStore = useVendorStore();
const products = computed(() => vendorStore.products);

const router = useRouter();
const route = useRoute();
// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'your_upload_preset'); // Replace with your preset
//   formData.append('cloud_name', 'your_cloud_name'); // Replace with your cloud name

//   const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
//     method: 'POST',
//     body: formData
//   });

//   const data = await res.json();
//   return data.secure_url;
// };

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    return (
      p.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (!filterCategory.value || p.category === filterCategory.value) &&
      (!filterType.value || p.productType === filterType.value)
    );
  });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize.value));
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredProducts.value.slice(start, start + pageSize.value);
});

const categoryOptions = computed(() => [...new Set(products.value.map(p => p.category_name))]);
const typeOptions = computed(() => [...new Set(products.value.map(p => p.productType))]);

const isEditing = ref(false);
const editedProductId  = ref(null);

const defaultProduct = {
  name: '',
  category: '',
  productType: '',
  description: '',
  currentPrice: null,
  currentQuantity: 1,
  inStock: true,
  photos: []
};

const formProduct = ref({ ...defaultProduct });

const openModal = () => {
  resetForm();
  modalRef.value.showModal();
};

const closeModal = () => {
  modalRef.value.close();
  resetForm();
};

const resetForm = () => {
  formProduct.value = { ...defaultProduct, photos: [] };
  isEditing.value = false;
  editedProductId .value = null;
};

const editProduct = (product) => {
  formProduct.value = {
    ...product,
    photos: [
      { preview: product.photo1, file: null },
      { preview: product.photo2, file: null }
    ]
  };
  editedProductId.value = product.itemId;
  isEditing.value = true;
  modalRef.value.showModal();
};

const addProduct = async () => {
  if (formProduct.value.photos.length !== 2) {
    alert('Please upload exactly 2 images.');
    return;
  }

  // const uploadedPhotos = await Promise.all(
  //   formProduct.value.photos.map(async img => {
  //     return img.file ? await uploadToCloudinary(img.file) : img.preview;
  //   })
  // );

  const productData = {
    ...formProduct.value,
    // photo1: uploadedPhotos[0],
    // photo2: uploadedPhotos[1]
  };

  try {
    if (isEditing.value && editedProductId.value !== null) {
      await vendorStore.updateVendorProduct(formProduct.value.itemId, productData);
      toast.success('Update Successfull');
    } else {
      const response = await vendorStore.createVendorProduct(productData);
      console.log('Create response:', response);
      toast.success('New Product Added!');
    }

    await vendorStore.getVendorProducts(); // Refresh
    router.push('/vendor/dashboard/products/');
    closeModal();
  } catch (error) {
    console.error('Add Product Failed:', error);
    toast.error(vendorStore.error.products);
  }
};

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    await vendorStore.deleteVendorProduct(id);
    await vendorStore.getVendorProducts(); 
    toast.success(
      `Product with id ${id} deleted successfully!`
    )
  }
};
const toggleStockStatus = async (product) => {
  await vendorStore.updateVendorProduct(product.itemId, { ...product });
  await vendorStore.getVendorProducts();
  router.push('/vendor/dashboard/products/')
};

const handleImagePreview = (files) => {
  formProduct.value.photos = files.map(file => ({
    preview: URL.createObjectURL(file),
    file
  }));
};

const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files).slice(0, 2);
  handleImagePreview(files);
};

const handleFileChange = (e) => {
  const files = Array.from(e.target.files).slice(0, 2);
  handleImagePreview(files);
};

const triggerFileInput = () => {
  fileInput.value.click();
};


const exportToCSV = () => {
  const csvContent = [
    ['Name', 'Category', 'Type', 'Price', 'Qty', 'In Stock'],
    ...filteredProducts.value.map((p) => [p.name, p.category, p.productType, p.currentPrice.toFixed(2), p.currentQuantity.toString(), p.inStock]),
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
onMounted(async () => {
  await vendorStore.getVendorProducts();
  
});
</script>
