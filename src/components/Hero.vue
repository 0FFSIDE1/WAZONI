<template>
  <section class="relative h-[80vh] w-full slideshow-container" aria-label="Hero Section">
    <!-- Slides as background images -->
    <div
      v-for="(img, index) in images"
      :key="index"
      class="absolute inset-0 transition-opacity duration-700 ease-in-out bg-cover bg-center"
      :class="{ 'opacity-100 z-0': index === currentSlide, 'opacity-0': index !== currentSlide }"
      :style="{ backgroundImage: `url(${img})` }"
      role="img"
      :aria-label="`Slide image ${index + 1}`"
    ></div>

    <!-- Hero content -->
    <div class="content px-4">
      <blockquote class="font-poppins italic border-l-4 border-base-content pl-6 mb-6">
        <h1 class="text-3xl text-secondary-content sm:text-4xl md:text-5xl font-bold leading-tight fade-in">
          “Your Hustle Deserves to Be <span class="text-warning">Seen</span>”
        </h1>
      </blockquote>
      <p class="text-secondary-content font-poppins mt-2 text-lg md:text-xl fade-in">
        Vendors like <strong class="text-warning">Mama Tee</strong> are ready to stop begging for visibility.
        Are you next?
      </p>
      <button
        @click="GoToWaitlistPage"
        class="font-poppins mt-4 btn btn-primary scale-in"
        aria-label="Join the Waitlist"
      >
        Join the Waitlist
      </button>
    </div>

    <!-- Phone Component: visible only on md and up -->
    <div class="hidden md:block absolute bottom-8 right-8 z-20" aria-hidden="true">
      <Phone />
    </div>
  </section>
</template>

  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Phone from '@/components/utils/Phone.vue'
import Img1 from '@/assets/images/download.png'
import Img2 from '@/assets/images/hero2.jpeg'
import Img3 from '@/assets/images/hero3.jpeg'
import Img4 from '@/assets/images/hero4.jpeg'
import { useRouter } from 'vue-router';
const router = useRouter();
const GoToWaitlistPage = () => {
  router.push('/waitlist');
};
// const images = [Img1, Img2, Img3, Img4]
const images = [Img1]
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
  