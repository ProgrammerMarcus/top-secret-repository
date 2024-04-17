<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function exit(): void {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="quit">
    <button type="button" class="link" @click="exit">QUIT</button>
  </div>
</template>

<style scoped>
.quit {
}

.link {
  color: rgba(0, 0, 0, 0.7);
  transition: 0.2s;
  font-size: 1.7rem;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  font-family: 'Silkscreen';
  text-decoration: underline;
}

.link:hover {
  color: rgb(255, 125, 100);
}
</style>
