<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-30" />
      </TransitionChild>

      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
            <DialogTitle class="text-lg font-semibold text-gray-900">
              Transaction Detail
            </DialogTitle>

            <div v-if="transaction" class="mt-4 text-sm text-gray-700 space-y-3">
              <div><strong>Reference:</strong> {{ transaction.ref }}</div>
              <div><strong>Description:</strong> {{ transaction.description }}</div>
              <div><strong>Amount:</strong> ${{ transaction.amount }}</div>
              <div><strong>Status:</strong> {{ transaction.status }}</div>
              <div><strong>Type:</strong> {{ transaction.transactionType }}</div>
              <div><strong>Method:</strong> {{ transaction.paymentMethod }}</div>
              <div><strong>Date:</strong> {{ formatDate(transaction.created_at) }}</div>
            </div>

            <div class="mt-6 flex justify-end gap-2">
              <button @click="close" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Close
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { inject } from 'vue'
import { formatDate } from '@/utils/formatters'

const isOpen = inject('modalOpen')
const transaction = inject('selectedTransaction')
const close = inject('closeModal')
</script>
