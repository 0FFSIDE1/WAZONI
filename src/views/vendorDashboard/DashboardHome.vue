<template>
  <section class="space-y-12 px-2 md:px-12 py-8">
    <!-- HERO Section -->
    <div class="space-y-4">
      <HeroText v-if="vendorStore.info" :brandName="vendorStore.info?.brandName"/>
      <HeroStat v-if="vendorStore.stats" :totalSales="vendorStore.stats?.totalSales" :totalOrders="vendorStore.stats?.totalOrders" :totalRevenue="vendorStore.stats?.totalRevenue" :percentageCompletedOrders="vendorStore.stats?.percentageCompletedOrders" class="w-full" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <!-- <h2 class="text-2xl font-semibold text-center mb-4">Rating</h2> -->
       <TrustScore v-if="vendorStore.info" :trustScore="vendorStore.info?.trustScore" />
    </div>

    <!-- CHARTS Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <HeroChart v-if="vendorStore.stats"
                  :monthlySales="vendorStore.stats?.monthlySales"
                  :monthlyOrders="vendorStore.stats?.monthlyOrders"
                  class="col-span-1 md:col-span-2" />
      <HeroPieChart class="col-span-1" v-if="vendorStore.stats" :categoryData="vendorStore.stats?.salesByCategory" />
    </div>
   
     
   

    <!-- MID Section: Orders + Notifications -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div>
        <h2 class="text-2xl font-semibold text-center mb-4">Recent Orders</h2>
        <RecentOrder :orders="vendorStore.orders.orders" />
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-center mb-4">Customers</h2>
        <RecentCustomers />
      </div>
    </div>

    <!-- TRANSACTIONS Section -->
    <div class="py-8">
      <h3 class="text-center text-2xl font-semibold mb-6">Recent Transactions</h3>
      <RecentTransaction :transactions="vendorStore.transactions" />
    </div>
  </section>
</template>

<script setup>
import HeroText from '@/components/dashboardComponents/homeComponents/HeroText.vue';
import HeroStat from '@/components/dashboardComponents/homeComponents/HeroStat.vue';
import HeroChart from '@/components/dashboardComponents/homeComponents/HeroChart.vue';
import HeroPieChart from '@/components/dashboardComponents/homeComponents/HeroPieChart.vue';
import TrustScore from '@/components/dashboardComponents/homeComponents/TrustScore.vue';
import RecentOrder from '@/components/dashboardComponents/homeComponents/RecentOrder.vue';
// import Notification from '@/components/dashboardComponents/Notification.vue';
import RecentCustomers from '@/components/dashboardComponents/homeComponents/RecentCustomers.vue';
import RecentTransaction from '@/components/dashboardComponents/homeComponents/RecentTransaction.vue';
import { useVendorStore } from '@/store/VendorStore';
import { onMounted } from 'vue';


const vendorStore = useVendorStore();

onMounted(async () => {
  await vendorStore.getVendorInfo();
  await vendorStore.getVendorStats();
  await vendorStore.getVendorOrders();
  await vendorStore.getVendorNotifications();
  await vendorStore.getVendorTransactions();
});


</script>
