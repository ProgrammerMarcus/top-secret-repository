<script setup lang="ts">
import board from "../game"

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="board" v-for="(tile, index) in board.getGrid()" :key="index">
    <img :src="tile.image" alt="" class="tile">
  </div>
</template>

<style scoped>
.board {
    background-color: gray;
    display: grid;
}
@media (min-width: 1024px) {
.board {
    background-color: green;
}
}
</style>
