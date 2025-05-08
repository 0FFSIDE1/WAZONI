<template>
    <div class="relative slideshow-container h-[80vh] w-full">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="slide"
        :class="{ active: index === currentSlide }"
        :style="{ backgroundImage: `url(${img})` }"
      ></div>
  
      <div class="content  px-4">
        <blockquote class="italic border-l-4 border-primary pl-6 text-lg md:text-xl mb-10"><h1 class="text-4xl md:text-5xl font-bold fade-in">"Your Hustle Deserves to Be <span class="text-neutral-content">Seen</span>"</h1></blockquote>
        <p class="mt-2 text-lg md:text-xl fade-in">Vendors like <span class="text-neutral-content">Mama Tee</span> are ready to stop begging for visibilty. Are you next?</p>
        <button class="mt-4 btn btn-primary scale-in">Join the Waitlist</button>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Img1 from '@/assets/images/hero1.jpeg'
import Img2 from '@/assets/images/hero2.jpeg'
import Img3 from '@/assets/images/hero3.jpeg'
import Img4 from '@/assets/images/hero4.jpeg'

const images = [Img1, Img2, Img3, Img4]
const currentSlide = ref(0)
let interval

onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % images.length
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.slideshow-container {
  position: relative;
  overflow: hidden;
}
.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1);
  transition: opacity 1.5s ease-in-out, transform 8s ease-in-out;
}
.slide.active {
  opacity: 1;
  transform: scale(1.05);
}
.content {
  position: relative;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}
.slideshow-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 5;
}
.fade-in {
  animation: fadeIn 1s ease-in-out;
}
.scale-in {
  animation: scaleIn 1.5s ease-in-out;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes scaleIn {
  0% { transform: scale(1.2); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
  