<script setup lang="ts">
import { ref } from 'vue'
import GameBoard, { Areas, Professions, Teams, Types } from '../game'

const board = ref(new GameBoard(8, 8))

for (let i = 0; i < 64; i++) {
  const x = Math.floor(i % 8) + 1
  const y = Math.floor(i / 8) + 1
  if (x === 1 && y === 1) {
    board.value.addTile(x, y, Types.WaterCorner, Areas.Regular, 90)
  } else if (x === 8 && y === 1) {
    board.value.addTile(x, y, Types.WaterCorner, Areas.Regular, 180)
  } else if (x === 8 && y === 8) {
    board.value.addTile(x, y, Types.WaterCorner, Areas.Regular, 270)
  } else if (x === 1 && y === 8) {
    board.value.addTile(x, y, Types.WaterCorner, Areas.Regular, 0)
  } else if (y === 1) {
    board.value.addTile(x, y, Types.WaterMiddle, Areas.Regular, 90)
  } else if (x === 1) {
    board.value.addTile(x, y, Types.WaterMiddle, Areas.Regular, 0)
  } else if (y === 8) {
    board.value.addTile(x, y, Types.WaterMiddle, Areas.Regular, 270)
  } else if (x === 8) {
    board.value.addTile(x, y, Types.WaterMiddle, Areas.Regular, 180)
  } else {
    board.value.addTile(x, y)
  }
}

board.value.addPiece(2, 2, Teams.Black, Professions.Pawn)

const handleMove = (fromX: number, fromY: number, toX: number, toY: number) => {
  board.value.pieces = board.value.movePiece(fromX, fromY, toX, toY)
}
</script>

<template>
  <div class="tiles">
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
  <div class="pieces">
    <img
      v-for="piece in board.pieces"
      :src="piece.image"
      :key="`${piece.x}, ${piece.y}`"
      alt="Game piece"
      class="piece"
      :style="`grid-area: ${piece.y} / ${piece.x};`"
      @click="handleMove(piece.x, piece.y, piece.x + 1, piece.y)"
    />
  </div>
</template>

<style scoped>
.tiles {
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
  top: 0;
  left: 0;
  display: grid;
  grid-template: v-bind('`repeat(${board.height}, 96px) / repeat(${board.width}, 96px)`');
  .piece {
    margin: auto;
  }
}
</style>
