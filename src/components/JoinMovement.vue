<template>
    <section
    data-aos="zoom-in"
      class="bg-neutral text-neutral-content py-24 px-4 text-center overflow-hidden"
    >
      <div class="max-w-3xl mx-auto">
        <!-- Entrance animation -->
        <transition name="fade-slide" appear>
          <div>
            <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Thousands of vendors like <span class="text-primary">Mama Tee</span>
              are waiting for the breakthrough.
            </h2>
  
            <p class="text-lg md:text-xl mb-8">
              You don’t want to carry last.
            </p>
  
            <blockquote
              class="italic border-l-4 border-primary pl-6 text-lg md:text-xl mb-10 text-gray-300"
            >
              “You can’t win the market hiding in the shadows — get visible, get
              chosen, get ahead.”
            </blockquote>
  
           <button
            @click="GoToWaitlistPage"
             class="btn btn-primary btn-lg text-lg px-10 hover:scale-105 transition-transform duration-300"
           >
             Join the Waitlist Now
           </button>
         </div>
       </transition>
     </div>
   </section>
 </template>
 
 <script setup>
 import { useRouter } from 'vue-router';
const router = useRouter();
const GoToWaitlistPage = () => {
  router.push('/waitlist');
};
 </script>
 
 <style scoped>
 .fade-slide-enter-active {
   transition: all 1s ease;
 }
 .fade-slide-enter-from {
   opacity: 0;
   transform: translateY(40px);
 }
 .fade-slide-enter-to {
   opacity: 1;
   transform: translateY(0);
 }
 </style>
 