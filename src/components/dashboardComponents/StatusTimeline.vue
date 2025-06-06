<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Tracking Status</h2>
      <ul class="steps steps-vertical">
        <li
          v-for="(status, index) in statusList"
          :key="index"
          class="step"
          :class="{ 'step-primary': status.completed }"
        >
          <div class="flex flex-col">
            <span class="font-semibold">{{ status.description }}</span>
            <span class="text-sm text-gray-500">{{ status.timestamp }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    statusList() {
      return this.status.map((item) => ({
        ...item,
        completed: true, // Adjust based on your API data
      }));
    },
  },
};
</script>