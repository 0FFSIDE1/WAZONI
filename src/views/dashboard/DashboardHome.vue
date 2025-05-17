<template>
  <section class="space-y-12 px-2 md:px-12 py-8">
    <!-- HERO Section -->
    <div class="space-y-4">
      <HeroText />
      <HeroStat class="w-full" />
    </div>

    <!-- CHARTS Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <HeroChart class="col-span-1 md:col-span-2" />
      <HeroPieChart class="col-span-1" />
    </div>

    <!-- MID Section: Orders + Notifications -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div>
        <h2 class="text-2xl font-semibold text-center mb-4">Recent Orders</h2>
        <RecentOrder />
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-center mb-4">Customers</h2>
        <RecentCustomers />
      </div>
    </div>

    <!-- TRANSACTIONS Section -->
    <div class="py-8">
      <h3 class="text-center text-2xl font-semibold mb-6">Recent Transactions</h3>
      <RecentTransaction />
    </div>
  </section>
</template>

<script setup>
import HeroText from '@/components/dashboardComponents/home/HeroText.vue'
import HeroStat from '@/components/dashboardComponents/home/HeroStat.vue'
import HeroChart from '@/components/dashboardComponents/home/HeroChart.vue'
import HeroPieChart from '@/components/dashboardComponents/home/HeroPieChart.vue'
import RecentOrder from '@/components/dashboardComponents/home/RecentOrder.vue'
// import Notification from '@/components/dashboardComponents/Notification.vue'
import RecentCustomers from '@/components/dashboardComponents/home/RecentCustomers.vue'
import RecentTransaction from '@/components/dashboardComponents/home/RecentTransaction.vue'
</script>
