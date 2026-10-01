<template>
  <div>
    <div v-if="isLoading" class="flex space-x-2 justify-center items-center h-screen dark:invert">
      <div class="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-4 w-4 bg-white rounded-full animate-bounce"></div>
    </div>

    <div id="animation-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Phaser from 'phaser';

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });
  const isLoading = ref(true);
  let gameInstance = null;

  onMounted(async () => {
    try {
      
      const module = await import(/* @vite-ignore */'../animations/scenes/'+props.id+'.js');
      
      let SelectedSceneClass = module.default;

      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
          parent: 'animation-container',
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
          },   
        },
        scene: [SelectedSceneClass]
      };

      gameInstance = new Phaser.Game(config);
    } catch (error) {
      console.error('Error!', error);
    } finally {
      isLoading.value = false;
    }
  });

  onBeforeUnmount(() => {
    if (gameInstance) {
      gameInstance.destroy(true);
    }
  });
</script>