<template>
<section>
    <HeroText/>
    <HeroStat class="w-full"/>
    <div class="my-6 flex flex-col md:flex-row px-8 py-8">
        <HeroChart/>
        <HeroPieChart/>
    </div>
    <div class="flex md:gap-60 flex-col md:flex-row">
        <div>
            <h2 class="text-2xl text-center">Recent Orders</h2>
            <RecentOrder/>
        </div>
        <div>
            <h2 class="text-2xl text-center">Notification</h2>
            <Notification />

        </div> 
    </div>
    <div class="py-8 my-8">
        <h3 class="text-center my-4 py-4 text-2xl">Recent Transactions</h3>
        <RecentTransaction />
    </div>
    
    
</section>
</template>
<script setup>
import HeroText from '@/components/dashboardComponents/HeroText.vue'
import HeroStat from '@/components/dashboardComponents/HeroStat.vue'
import HeroChart from '@/components/dashboardComponents/HeroChart.vue'
import HeroPieChart from '@/components/dashboardComponents/HeroPieChart.vue'
import RecentOrder from '@/components/dashboardComponents/RecentOrder.vue'
import Notification from '@/components/dashboardComponents/Notification.vue'
import RecentTransaction from '@/components/dashboardComponents/RecentTransaction.vue'
</script>