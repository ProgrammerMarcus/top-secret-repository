<script setup lang="ts">
import GameBoard, { Areas, Types } from '../game'

const board = new GameBoard(8, 8)
for (let i = 0; i < 64; i++) {
  const x = Math.floor(i % 8) + 1
  const y = Math.floor(i / 8) + 1
  if (x === 1 && y === 1) {
    board.addTile(x, y, Types.WaterCorner, Areas.Regular, 90)
  } else if (x === 8 && y === 1) {
    board.addTile(x, y, Types.WaterCorner, Areas.Regular, 180)
  } else if (x === 8 && y === 8) {
    board.addTile(x, y, Types.WaterCorner, Areas.Regular, 270)
  } else if (x === 1 && y === 8) {
    board.addTile(x, y, Types.WaterCorner, Areas.Regular, 0)
  } else if (y === 1) {
    board.addTile(x, y, Types.WaterMiddle, Areas.Regular, 90)
  } else if (x === 1) {
    board.addTile(x, y, Types.WaterMiddle, Areas.Regular, 0)
  } else if (y === 8) {
    board.addTile(x, y, Types.WaterMiddle, Areas.Regular, 270)
  } else if (x === 8) {
    board.addTile(x, y, Types.WaterMiddle, Areas.Regular, 180)
  } else {
    board.addTile(x, y)
  }
}
</script>

<template>
  <div class="board">
    <img
      v-for="(tile, index) in board.tiles"
      :src="tile.image"
      :key="index"
      alt="Game tile"
      class="tile"
      :style="`grid-area: ${tile.y} / ${tile.x}; rotate: ${tile.rotate}deg; ${tile.highlight ? 'filter: brightness(1.5);' : ''}`"
      @click="console.log(tile.x, tile.y)"
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
