<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
    <!-- Page Header -->
    <div class="text-center">
       

      <h1 class="text-4xl font-bold flex justify-center items-center gap-4"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>Edit Profile</h1>
      <p class="text-gray-500 mt-1">Update your business information, manage security, and personalize your preferences.</p>
    </div>

    <!-- Profile Completion + Avatar Upload -->
    <div class="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-8">
      <!-- Profile Photo Upload -->
      <div class="relative group w-40 h-40">
        <div class="absolute inset-0 bg-base-200 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center ">
            <div class="w-full h-full border-4 border-primary rounded-full overflow-hidden flex items-center justify-center">
                <img
                    v-if="profile.photoPreview"
                    :src="profile.photoPreview"
                    alt="Profile Photo"
                    class="object-cover w-full h-full"
                />
                <div v-else class="text-sm text-gray-400 text-center">
                    Drag & Drop<br />Photo
                </div>
                <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="absolute inset-0 opacity-0 cursor-pointer"
          @change="handleFileChange"
          @dragover.prevent
          @drop.prevent="handleDrop"
        />
        <div
          class="absolute bottom-0 right-0 badge badge-success"
          v-if="profile.verified"
        >
          Verified
        </div>
            </div>
            
        </div>
       
        
      </div>

      <!-- Profile Completion + Stats -->
      <div class="flex-1 space-y-4">
        <div class="text-sm font-medium text-gray-700">Profile Completion</div>
        <progress
          class="progress progress-primary w-full"
          :value="completion"
          max="100"
        ></progress>
        <div class="grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
          <div class="bg-base-200 p-2 md:p-4 rounded-lg">
            <p class="text-2xl font-bold">240</p>
            <span class="text-sm text-gray-500">Orders</span>
          </div>
          <div class="bg-base-200 p-2 md:p-4 rounded-lg">
            <p class="text-2xl font-bold">$12.4K</p>
            <span class="text-sm text-gray-500">Earnings</span>
          </div>
          <div class="bg-base-200 p-2 md:p-4 rounded-lg">
            <p class="text-2xl font-bold">4.8</p>
            <span class="text-sm text-gray-500">Rating</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs for Profile Sections -->
    <div role="tablist" class="tabs tabs-boxed mt-6">
      <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'profile' }" @click="activeTab = 'profile'">Profile Info</a>
      <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'security' }" @click="activeTab = 'security'">Security</a>
      <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'preferences' }" @click="activeTab = 'preferences'">Preferences</a>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab === 'profile'" class="space-y-6">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="saveProfile">
        <div>
          <label class="label"><span class="label-text">First Name</span></label>
          <input v-model="profile.firstName" type="text" class="input input-bordered w-full" required />
        </div>
        <div>
          <label class="label"><span class="label-text">Last Name</span></label>
          <input v-model="profile.lastName" type="text" class="input input-bordered w-full" required />
        </div>
        <div>
          <label class="label"><span class="label-text">Email</span></label>
          <input v-model="profile.email" type="email" class="input input-bordered w-full" disabled />
        </div>
        <div>
          <label class="label"><span class="label-text">Phone</span></label>
          <input v-model="profile.phone" type="tel" class="input input-bordered w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="label"><span class="label-text">Business Name</span></label>
          <input v-model="profile.businessName" type="text" class="input input-bordered w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="label"><span class="label-text">Bio / About</span></label>
          <textarea v-model="profile.bio" rows="4" class="textarea textarea-bordered w-full"></textarea>
        </div>
            <div class="md:col-span-2">
              <label class="label"><span class="label-text">Social Links</span></label>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <i class="fab fa-linkedin text-xl text-blue-700 w-6"></i>
                  <input v-model="profile.socialLinks.linkedin" type="url" placeholder="https://linkedin.com/in/yourhandle" class="input input-bordered w-full" />
                </div>
                <div class="flex items-center gap-2">
                  <i class="fab fa-twitter text-xl text-blue-400 w-6"></i>
                  <input v-model="profile.socialLinks.twitter" type="url" placeholder="https://twitter.com/yourhandle" class="input input-bordered w-full" />
                </div>
                <div class="flex items-center gap-2">
                  <i class="fab fa-instagram text-xl text-pink-500 w-6"></i>
                  <input v-model="profile.socialLinks.instagram" type="url" placeholder="https://instagram.com/yourhandle" class="input input-bordered w-full" />
                </div>
                <div class="flex items-center gap-2">
                  <i class="fab fa-facebook text-xl text-blue-600 w-6"></i>
                  <input v-model="profile.socialLinks.facebook" type="url" placeholder="https://facebook.com/yourhandle" class="input input-bordered w-full" />
                </div>
                <div class="flex items-center gap-2">
                  <i class="fab fa-whatsapp text-xl text-green-500 w-6"></i>
                  <input v-model="profile.socialLinks.whatsapp" type="url" placeholder="https://whatsapp.com/yourhandle" class="input input-bordered w-full" />
                </div>
              </div>
            </div>
        <div class="md:col-span-2 flex justify-end gap-4">
          <button type="button" class="btn btn-ghost" @click="resetProfile">Cancel</button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
            Save Changes
          </button>
        </div>
      </form>
    </div>

    <div v-else-if="activeTab === 'security'" class="space-y-6">
      <div class="alert alert-info">
        You can enable 2FA and update your password here.
      </div>
      <div class="flex justify-between items-center gap-4">
        <button class="btn btn-outline btn-accent">Enable 2FA</button>
        <button class="btn btn-outline">Change Password</button>
      </div>
      
    </div>

    <div v-else-if="activeTab === 'preferences'" class="space-y-6">
      <label class="cursor-pointer label">
        <span class="label-text">Receive Email Notifications</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="profile.emailNotify" />
      </label>
      <label class="cursor-pointer label">
        <span class="label-text">Enable Dark Mode</span>
        <input type="checkbox" class="toggle toggle-secondary" v-model="profile.darkMode" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const activeTab = ref('profile');
const loading = ref(false);

const originalProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'vendor@example.com',
  phone: '+1234567890',
  businessName: 'Doe Ventures',
  bio: '',
  photoPreview: '',
  verified: true,
  social: '',
  emailNotify: true,
  darkMode: false,
  socialLinks: {
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
  }
};

const profile = reactive({ ...originalProfile });

function handleFileChange(e) {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) previewImage(file);
}

function handleDrop(e) {
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) previewImage(file);
}

function previewImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => (profile.photoPreview = e.target.result);
  reader.readAsDataURL(file);
}

function saveProfile() {
  loading.value = true;
  setTimeout(() => {
    console.log('Saved profile:', profile);
    alert('Profile saved!');
    loading.value = false;
  }, 1200);
}

function resetProfile() {
  Object.assign(profile, originalProfile);
}

const completion = computed(() => {
  let score = 0;
  if (profile.firstName) score += 20;
  if (profile.lastName) score += 20;
  if (profile.phone) score += 15;
  if (profile.businessName) score += 15;
  if (profile.bio) score += 15;
  if (profile.social) score += 15;
  return score;
});
</script>

<style scoped>
.label-text {
  font-weight: 500;
}
</style>
