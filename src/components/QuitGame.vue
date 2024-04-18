<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function exit(): void {
  router.push({ name: 'Home' })
}
</script>

<template>
  <button type="button" class="link" @click="exit">EXIT</button>
</template>

<style scoped>
.link {
  color: white;
  transition: 0.2s;
  font-size: 3rem;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  font-family: 'Silkscreen';
  text-decoration: underline;
  cursor: pointer;
}

.link:hover {
  color: rgb(255, 125, 100);
}
</style>
