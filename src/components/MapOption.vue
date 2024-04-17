<script setup lang="ts">
defineProps({
  image: String,
  name: String,
  id: Number
})
</script>

<template>
  <div class="option">
    <img :src="image" alt="An image of the map." class="image" />
    <span class="name">{{ name }}</span>
    <RouterLink class="link" :to="`game/${id}`">Play</RouterLink>
  </div>
</template>

<style scoped>
.option {
  width: 20rem;
  height: 20rem;
  display: grid;
  place-content: center;
  margin: auto;
}
.image {
  height: 10rem;
  aspect-ratio: 1;
  object-fit: cover;
}

.name {
  text-decoration: none;
  font-size: 1.7rem;
}

.link {
  color: rgb(255, 0, 255);
  transition: 0.2s;
  font-size: 1.7rem;
}

.link:hover {
  color: rgb(255, 100, 255);
}
</style>
