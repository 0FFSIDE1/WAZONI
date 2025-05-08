<template>
    <div>
        <Hero/>
    </div>
    <div>
        <AboutUs/>
    </div>
    <div>
       <ComingSoon/>
    </div>
    <JoinMovement/>
    <JoinCommunity/>
    <ContactUs/>
</template>

<script setup>
import Hero from "@/components/Hero.vue";
import AboutUs from "@/components/OurStory.vue";
import ComingSoon from '@/components/ComingSoon.vue';
import JoinMovement from '@/components/JoinMovement.vue';
import JoinCommunity from '@/components/JoinCommunity.vue';
import ContactUs from '@/components/ContactUs.vue';

</script>