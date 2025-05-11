<template>
    <div class="font-poppins mockup-phone bottom-4 border-primary w-64 md:w-72 lg:w-80 h-[500px] md:h-[650px] mx-auto scale-90 md:scale-100">
 
  <div class="mockup-phone-display">
    <div class="mockup-browser border-base-300 border w-72">
  <div class="mockup-browser-toolbar">
    <div class="input text-sm">https://wazoni.com</div>
  </div>
  <div class="grid place-content-center border-t border-base-300 h-[555px]">
    <span ref="typedElement" class="text-center text-lg font-semibold px-4"></span>
  </div>
</div>
  </div>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Typed from 'typed.js'

const typedElement = ref(null)

onMounted(() => {
  const options = {
    strings: [
      "Being visible in your market is no longer optional. If you’re not online, you’re invisible.  — Anonymous",
      "The more visible your business, the more credible it becomes.  — Neil Patel",
      "Technology levels the playing field. A small business with the right tools can compete globally. — Marc Ostrofsky",
      "Build it, and they might come. Promote it, and they definitely will. — Peter Shankman",
      "Visibility creates opportunity. Use every modern tool to be seen and heard. — Melinda Emerson",
      "Marketing is no longer about the stuff you make, but about the stories you tell. — Seth Godin",
      "Brand visibility is the heartbeat of business growth in a digital age. — Anonymous",
      "In today’s business world, visibility is currency. Technology gives you a printing press. — Anonymous",
      "Growth comes from consistency. Visibility must be constant, not occasional. — Anonymous",
      "It’s not about having the right opportunities. It’s about handling the opportunities right in front of you—especially online. — Mark Cuban",
      "Digital visibility drives real-world growth. — Anonymous",
      "Digital presence is your new storefront.  — OFFSIDE INTEGRATED TECHNOLOGY ",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 5000,
    loop: true,
    showCursor: false,
    
  }

  new Typed(typedElement.value, options)
})
</script>