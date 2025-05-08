<template>
    <section data-aos="zoom-in-up" class="py-8 min-h-screen flex items-center justify-center text-center bg-base-300">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold mb-10">
          Coming Soon: <span class="text-primary">A Smarter Way to Sell Online</span>
        </h2>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group shadow-md rounded-xl p-6 bg-base-200 hover:bg-gray-200 transition duration-500 ease-in-out"
          >
            <div class="text-5xl mb-4 transition-transform hover:scale-105 group-hover:text-2xl">
              <component :is="feature.icon" />
            </div>
            <h3 class="text-xl font-semibold group-hover:text-2xl transition">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-primary group-hover:text-secondary transition">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // You can use any icon component system (e.g., Heroicons via unplugin-icons)
  import { EyeIcon, MegaphoneIcon, ShoppingCartIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/outline'
  
  const features = [
    {
      title: 'Show Face',
      description: 'Get your products in front of the right audience',
      icon: EyeIcon
    },
    {
      title: 'Stand Out',
      description: 'No more shouting — let your hustle speak.',
      icon: MegaphoneIcon
    },
    {
      title: 'Sell More',
      description: 'Convert visibility into real sales.',
      icon: ShoppingCartIcon
    },
    {
      title: 'Grow Fast',
      description: 'Optimise AI and SEO to ensure your product reaches the right audience.',
      icon: ArrowTrendingUpIcon
    }
  ]
  </script>
  <!-- Join a community of smart, visible vendors. -->