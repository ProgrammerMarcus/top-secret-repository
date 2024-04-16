<script setup lang="ts">
import title from '@/assets/menu/title.webp'
</script>

<template>
  <div class="home">
    <main class="menu">
      <h1 class="header"><img :src="title" alt="CHESS 5" class="title" /></h1>
      <RouterLink class="btn" to="game">NEW GAME</RouterLink>
    </main>
  </div>
</template>

<style scoped>
@keyframes hover {
  0% {
    background-position: 0px 0px;
  }
  20% {
    background-position: -30svh -30svw;
  }
  40% {
    background-position: -10svh -50svw;
  }
  60% {
    background-position: -100svh -100svw;
  }
  80% {
    background-position: -50svh -30svw;
  }
  100% {
    background-position: -10svh -50svw;
  }
}
.home {
  background-image: url(/src/assets/menu/background.webp);
  background-size: 300svh;
  width: 100svw;
  height: 100svh;
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
}

.btn {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-size: 1.7rem;
  background-image: url(/src/assets/menu/stone.webp);
  background-size: 128px;
  width: 20rem;
  height: 4rem;
  display: grid;
  place-content: center;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  margin: auto;
  transition: 0.2s;
}

.btn:hover {
  filter: brightness(1.2);
}
</style>
