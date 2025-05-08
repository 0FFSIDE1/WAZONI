<template>
  <section data-aos="zoom-in-left" class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-3xl text-center">
      <h1 class="text-5xl font-bold mb-6">Our Story</h1>
      <transition name="fade" mode="out-in">
        <div :key="currentStory.title" class="transition-opacity duration-1000 ease-in-out">
          <p class="text-xl font-semibold text-primary mb-2">{{ currentStory.title }}</p>
          <p class="py-4 text-lg leading-relaxed">
            {{ currentStory.story }}
          </p>
        </div>
      </transition>
      <h1 class="text-primary">
        "Market no dull — na who show face de sell pass."
      </h1>
      <button class="btn btn-primary mt-4">Join the Waitlist</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const stories = [
  {
    "title": "Mama Tee Still Dey Wait for Her Breakthrough",
    "story": "Mama Tee get fine Ankara, affordable price, and loyal customers — but she dey waka market every day, dey beg people to notice her. She no dey lazy, she just need the right people to see wetin she dey offer. Then she hear say one new platform dey come — one wey go give vendors visibility without stress. She say: “If this platform go help me show face, na there I wan dey.”"
  },
  {
    "title": "Chika’s Story: From Hidden Gem to Online Star",
    "story": "Chika dey make handmade jewelry wey dey burst brain. People wey buy am always come back, but the problem be say nobody sabi her. She dey hustle inside local market, still sales no dey grow. One day, she join waitlist for one new platform wey promise to give small vendors voice. Today, Chika dey ship her products go Lagos, Abuja, even outside Naija. Na visibility change her game."
  },
  {
    "title": "Emeka Dey Sell, But Nobody Dey See Am",
    "story": "Emeka dey sell original sneakers, direct from Turkey. Quality? 100%. But online, e be like say e no exist. He go post tire, engagement no dey. He hear say one new ecommerce platform dey come wey dey help people like am shine. Emeka enter waitlist sharp sharp. He talk say, 'This one go be my big break.'"
  },
  {
    "title": "Zainab's Market No Be for Only Who Pass By",
    "story": "Zainab dey run small skincare business from her room. Her cream dey work, but only people wey live near her dey buy. She need platform wey go help her product travel without her moving an inch. Na so she hear of a new app for vendors — one wey dey promote small business. She join waitlist, ready to go global from her doorstep."
  },
  {
    "title": "Kofi From Kumasi Hear About the Naija Platform",
    "story": "Even though Kofi dey Ghana, him dey always look for chance to reach more customers. He sell African print shirts wey people love, but exposure low. One day, he jam info online about a Naija-made ecommerce platform wey dey open door for vendors across Africa. Kofi join the waitlist — he no wan carry last for this kind movement."
  },
  {
    "title": "Tolu Finally Found a Way to Grow",
    "story": "Tolu runs a home-made snack business. Her chin chin is crunchy, her puff-puff is golden — but customers were always just friends and neighbors. She didn’t know how to market online or get noticed. Then she heard of a new platform built to help vendors like her grow. She joined the waitlist. Now she’s ready to take her hustle beyond the street corner."
  },
  {
    "title": "Sarah Wanted More Than Just Sales — She Wanted Growth",
    "story": "Sarah had been selling eco-friendly beauty products for years. Great quality, strong reviews — but still stuck with low visibility. She knew she needed something different. That’s when she discovered a platform being built for vendors who are tired of being overlooked. She joined the waitlist because she believed her business deserved to be seen by more people. This time, she's not waiting for luck — she's waiting for the right launch."
  },
]
const currentIndex = ref(0)
const currentStory = ref(stories[0])

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % stories.length
    currentStory.value = stories[currentIndex.value]
  }, 30000) // 30 seconds
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>