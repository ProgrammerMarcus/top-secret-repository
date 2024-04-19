<script setup lang="ts">
import DifficultySelect from './DifficultySelect.vue'
import MapSelect from './MapSelect.vue'
import title from '@/assets/menu/title_old.webp'
</script>

<template>
  <div class="home">
    <main class="menu">
      <h1 class="header"><img :src="title" alt="CHESS 5" class="title" /></h1>
      <DifficultySelect />
      <MapSelect />
    </main>
  </div>
</template>

<style scoped>
@keyframes hover {
  0% {
    background-position: 0px 0px;
  }
  20% {
    background-position: -30lvh -30lvw;
  }
  40% {
    background-position: -10lvh -50lvw;
  }
  60% {
    background-position: -100lvh -100lvw;
  }
  80% {
    background-position: -50lvh -30lvw;
  }
  100% {
    background-position: -10lvh -50lvw;
  }
}
.home {
  background-image: url(/src/assets/menu/background.webp);
  background-size: 300lvh;
  min-width: 100lvw;
  min-height: 100lvh;
  animation: 40s infinite alternate linear hover;
  background-repeat: no-repeat;
  display: grid;
  place-content: center;
}

.menu {
  display: grid;
  place-content: center;
  gap: 10px;
}

.header {
  font-family: 'SilkscreenBold';
  display: grid;
  place-content: center;
  margin: 10px;
}

.title {
  width: 100%;
  max-width: 100%;
  max-height: 4.5rem;
}
</style>
