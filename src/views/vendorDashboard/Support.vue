<template>
  <div class="p-4 md:p-8 space-y-10 max-w-7xl mx-auto">

    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold">Vendor Support Center</h1>
      <p class="text-gray-600 mt-2">Answers, tools, and tips to help vendors succeed on our platform.</p>
    </div>

    <!-- FAQ Search -->
    <div class="relative max-w-md mx-auto">
      <input
        v-model="faqSearch"
        type="text"
        class="input input-bordered w-full pr-10"
        placeholder="Search FAQs..."
      />
      <span class="absolute right-3 top-2.5 text-gray-400">
        🔍
      </span>
    </div>

    <!-- FAQs -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div class="space-y-4">
        <details
          v-for="(faq, i) in filteredFaqs"
          :key="i"
          class="border border-gray-200 rounded-md p-4"
        >
          <summary class="font-medium text-lg cursor-pointer">
            {{ faq.question }}
          </summary>
          <p class="text-gray-600 mt-2">{{ faq.answer }}</p>
        </details>
        <p v-if="filteredFaqs.length === 0" class="text-center text-gray-500">No FAQs match your search.</p>
      </div>
    </section>

    <!-- Contact Management -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Contact Management</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-white p-4 rounded-lg shadow">
        <div class="flex items-start space-x-4">
          <span class="text-2xl text-blue-500">📧</span>
          <div>
            <h3 class="font-semibold">Email</h3>
            <p class="text-gray-600">support@yourplatform.com</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <span class="text-2xl text-green-500">📞</span>
          <div>
            <h3 class="font-semibold">Phone</h3>
            <p class="text-gray-600">+1 (234) 567-8901</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <span class="text-2xl text-yellow-500">📍</span>
          <div>
            <h3 class="font-semibold">Address</h3>
            <p class="text-gray-600">123 Vendor Lane, Tech City, UK</p>
          </div>
        </div>
        <div class="flex items-start space-x-4 col-span-full sm:col-span-2 lg:col-span-1">
          <span class="text-2xl text-purple-500">⏰</span>
          <div>
            <h3 class="font-semibold">Office Hours</h3>
            <p class="text-gray-600">Mon - Fri, 9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Helpful Tips & Tools -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Helpful Tips & Tools</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg shadow flex items-start gap-4">
          <span class="text-3xl">📦</span>
          <div>
            <h3 class="font-semibold">Product Management</h3>
            <p class="text-gray-600">Add, edit or remove products from your dashboard easily and track availability.</p>
          </div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg shadow flex items-start gap-4">
          <span class="text-3xl">📊</span>
          <div>
            <h3 class="font-semibold">Sales Analytics</h3>
            <p class="text-gray-600">Understand trends and performance with real-time sales reports and insights.</p>
          </div>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg shadow flex items-start gap-4">
          <span class="text-3xl">🛎️</span>
          <div>
            <h3 class="font-semibold">Customer Interaction</h3>
            <p class="text-gray-600">Respond to messages promptly and improve ratings with fast communication.</p>
          </div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg shadow flex items-start gap-4">
          <span class="text-3xl">📘</span>
          <div>
            <h3 class="font-semibold">Vendor Guide</h3>
            <p class="text-gray-600">
              Download the <a href="/docs/vendor-guide" class="text-blue-600 underline">Vendor Quick Start Guide</a> to help you get started quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const faqSearch = ref('');
const faqs = ref([
  { question: 'How do I register as a vendor?', answer: 'Visit the registration page and complete the required fields to sign up.' },
  { question: 'How can I add a new product?', answer: 'Navigate to the dashboard > My Products > Add New Product.' },
  { question: 'What is the commission fee?', answer: 'We charge 10% on every transaction made through our platform.' },
  { question: 'How do I contact support?', answer: 'You can reach us by email or phone, listed below.' },
  { question: 'How do I view my sales performance?', answer: 'Check the Analytics tab in your dashboard for reports and metrics.' }
]);

const filteredFaqs = computed(() => {
  if (!faqSearch.value) return faqs.value;
  return faqs.value.filter(faq =>
    faq.question.toLowerCase().includes(faqSearch.value.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.value.toLowerCase())
  );
});
</script>

<style scoped>
details[open] summary {
  font-weight: bold;
}
</style>
