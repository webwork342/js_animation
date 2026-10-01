<template >
  <section class="text-gray-200 min-h-screen p-6 font-sans">
    <div class="max-w-6xl mx-auto py-16">
      <div class="rounded-xl p-8 bg-dark-800 text-center mb-20">
        <h2 class="text-neon-purple font-bold tracking-widest text-4xl md:text-5xl">ANIMATION LIST</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link v-for="(animation, index) in animations" :key="animation.id" :to="{ name: 'Animation', params: { id: animation.id }}"
        class="group relative bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-primary-500 transition-all duration-300 hover:shadow-glow overflow-hidden">
          <div :class="[index % 2 ? 'from-neon-blue' : 'from-neon-pink']" class="absolute -inset-1 bg-gradient-to-r to-primary-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300">
          </div>
          <div class="relative z-10">
            <div :class="[index % 2 ? 'shadow-glow-blue' : 'shadow-glow-pink']" class="w-14 h-14 rounded-lg bg-dark-700 flex items-center justify-center mb-6">
              <div class="w-full flex justify-center items-center overflow-hidden">
                <span class="text-3xl transform ">{{ animation.em }}</span>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ animation.title}}</h3>
            <div class="mt-6 pt-6 border-t border-dark-700">
              <span :class="[index % 2 ? 'text-neon-blue' : 'text-neon-pink']" class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-dark-700">{{ animation.physics }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const animations = ref([
  { id: '1', title: 'Animation 1', physics: 'matter', em: '🟢' },
  { id: '2', title: 'Animation 2', physics: 'matter', em: '🔷' },
]);
</script>

