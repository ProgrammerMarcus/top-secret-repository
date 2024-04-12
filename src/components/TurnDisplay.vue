<script setup lang="ts">
defineProps({ teamName: String })
</script>
<template>
  <div class="turn">{{ teamName + ' Turn' }}</div>
</template>

<style scoped>
.turn {
  font-size: 64px;
  background-color: red;
  color: white;
  z-index: 3;
  position: absolute;
  top: 256px;
  left: 256px;
  pointer-events: none;
}
</style>
