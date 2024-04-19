<script setup lang="ts">
defineProps({
  image: String,
  name: String,
  id: String
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
  display: grid;
  place-content: center;
  margin: auto;
}
.image {
  height: 10rem;
  aspect-ratio: 1;
  object-fit: cover;
  image-rendering: auto;
}

.name {
  text-decoration: none;
  font-size: 1.3rem;
  text-align: center;
}

.link {
  color: rgb(255, 0, 255);
  transition: 0.2s;
  font-size: 1.6rem;
  text-align: center;
  margin-top: -10px;
}

.link:hover {
  color: rgb(255, 120, 255);
}
</style>
