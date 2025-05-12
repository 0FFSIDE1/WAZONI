<template>
  <section data-aos="zoom-in" class="font-poppins min-h-screen my-5 flex items-center justify-center px-4">
    <div class="max-w-3xl text-center">
      <h1 class="text-5xl font-bold mb-6" aria-label="section heading">Our Story</h1>
      <transition name="fade" mode="out-in">
        <div :key="currentStory.title" class="transition-opacity duration-1000 ease-in-out">
          <p class="text-xl font-semibold text-primary mb-2" aria-label="story title">{{ currentStory.title }}</p>
          <p class="py-4 text-lg leading-relaxed" aria-label="story message">
            {{ currentStory.story }}
          </p>
        </div>
      </transition>
      <h1 class="text-primary" aria-label="Market nodull - na whoshow face de sell pass">
        "Market no dull — na who show face de sell pass."
      </h1>
      <button @click="GoToWaitlistPage" class="btn btn-primary btn-lg text-lg px-10 hover:scale-105 transition-transform duration-300 mt-8">Join the Waitlist</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const GoToWaitlistPage = () => {
  router.push('/waitlist');
};
const stories = [
  {
    "title": "Mama Tee Still Dey Wait for Her Breakthrough",
    "story": "Mama Tee get fine Ankara, affordable price, and loyal customers — but she dey waka market every day, dey beg people to notice her. She no dey lazy, she just need the right people to see wetin she dey offer. Then she hear say one new platform dey come — one wey go give vendors visibility without stress. She say: “If this platform go help me show face, na there I wan dey.”"
  },
  {
    "title": "Ruth Needed More Than Just a Local Following",
    "story": "Ruth runs a boutique soap business from her home. Her all-natural bars are beautifully packaged, thoughtfully formulated, and highly rated by every customer she’s had. But growth was slow, limited to referrals and walk-ins. She knew her products had potential — but they needed the right stage. When she discovered a platform focused on giving rising entrepreneurs visibility, she joined immediately. 'This isn’t just a side hustle anymore,' she said. 'It’s a real business — and it deserves real reach.'"
  },
  {
    "title": "Olu Dey Bake, But Internet No Dey Show Am Love",
    "story": "Olu dey bake cakes wey melt for mouth — birthdays, weddings, any occasion. But even with better taste, online orders no dey. Him Instagram dey dry, even though him cake dey sweet. One day, him friend tell am about one new vendor-focused platform. Olu say, 'If this thing fit show my work well, I go join sharp.' Now, Olu dey ready for global taste buds."
  },
   {
    "title": "Ngozi No Fit Waste Her Talent Again",
    "story": "Ngozi dey do hand-painted home décor — wall arts, flower vases, custom frames. Everybody wey buy from her dey always talk say she dey talented. But talent no be enough if people no fit see your work. When she hear about one new platform for small vendors, she no waste time. 'This na the push I need,' she talk."
  },
  {
    "title": "Leila Had Talent, But She Needed a Platform",
    "story": "Leila is an illustrator and digital artist who designs prints, stationery, and custom portraits. Her work is unique, vibrant, and praised by everyone who sees it. But without a solid online presence, her audience was limited. Algorithms didn’t favor her, and big platforms buried her work. When she discovered a vendor-first platform prioritizing visibility for creators like her, she saw hope. 'My work speaks for itself,' she said. 'Now I just need more people to hear it.'"
  },
   {
    "title": "Halima Wan Make Her Bags Travel Pass Her",
    "story": "Halima dey hand-make leather bags — original, stylish, and durable. But all her customers dey within her area. She want her brand to go far, but she no sabi the online game. Then she hear of one ecommerce platform wey dey give vendors wings. She say, 'If this platform fit carry my bags reach people wey sabi better thing, na there I belong.'"
  },
  {
    "title": "Daniel’s Prints Fine, But Nobody Dey Look",
    "story": "Daniel dey design t-shirts with bold African prints — fashion wey make statement. But him store dey hidden for one small street, and social media no dey help. He hear say new platform dey wey dey carry local vendors go front stage. He rush join the waitlist. Now him dey dream bigger — international delivery no far again."
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
  {
    "title": "Sarah Wanted More Than Just Sales — She Wanted Growth",
    "story": "Sarah had been selling eco-friendly beauty products for years. Great quality, strong reviews — but still stuck with low visibility. She knew she needed something different. That’s when she discovered a platform being built for vendors who are tired of being overlooked. She joined the waitlist because she believed her business deserved to be seen by more people. This time, she's not waiting for luck — she's waiting for the right launch."
  },
{
  "title": "From Side Hustle to Main Business — Teni’s Turning Point",
  "story": "Teni started by selling handmade scented candles from her kitchen. Her packaging was elegant, her fragrances long-lasting, and her customers always came back for more. But for a long time, her business stayed small — stuck in her immediate network. That changed the day she signed up for a new platform created to give vendors like her visibility and access to real growth. Now, Teni ships orders nationwide, collaborates with local stores, and plans to expand into wellness products. She says, 'I was just looking for a chance — and I found one.' Thousands of small businesses are still waiting to be seen. You could be next."
}

]
const currentIndex = ref(0)
const currentStory = ref(stories[0])

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % stories.length
    currentStory.value = stories[currentIndex.value]
  }, 35000) // 30 seconds
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