<script setup lang="ts">
import { board, pieces } from '../game'
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="board">
    <img
      v-for="(tile, index) in board.grid"
      :src="tile.image"
      :key="index"
      alt="Game tile"
      class="tile"
      :style="`rotate: ${tile.rotate}deg;`"
    />
  </div>
  <div class="pieces">
    <img
      v-for="(piece, index) in pieces"
      :src="piece.image"
      :key="index"
      alt="Game piece"
      class="piece"
      style="grid-area: 1 / 1"
      :style="`grid-area: ${piece.y} / ${piece.x};`"
    />
  </div>
</template>

<style scoped>
.board {
  position: relative;
  background-color: gray;
  display: grid;
  grid-template: v-bind('`repeat(${board.height}, 96px) / repeat(${board.width}, 96px)`');
  .tile {
    height: 100%;
  }
}
.pieces {
  position: absolute;
  display: grid;
  grid-template: v-bind('`repeat(${board.height}, 96px) / repeat(${board.width}, 96px)`');
  .piece {
    margin: auto;
  }
}
</style>
