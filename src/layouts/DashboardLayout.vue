<template>
    <div class="min-h-screen w-full">
        <NavBar />
        <main>
            <slot />
        </main>
        <div class="md:hidden">
            <Dock />
        </div>
        
    </div>
    <Footer />

</template>
<script setup>
import NavBar from '@/components/dashboardComponents/Nav/NavBar.vue';
import Dock from '@/components/dashboardComponents/Dock.vue';
import Footer from '@/components/Footer.vue'
</script>