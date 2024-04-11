<script setup lang="ts">
import { ref } from 'vue'
import GameBoard, { Areas, GamePiece, Professions, Teams, Types } from '../game'

const board = ref(new GameBoard(8, 8))
let active: undefined | GamePiece = undefined

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

for (let i = 0; i < 8; i++) {
  board.value.addPiece(i + 1, 2, Teams.Black, Professions.Pawn)
}
board.value.addPiece(4, 1, Teams.Black, Professions.King)
board.value.addPiece(6, 1, Teams.Black, Professions.Archer)
board.value.addPiece(5, 1, Teams.Black, Professions.Queen)
board.value.addPiece(3, 1, Teams.Black, Professions.Bishop)
board.value.addPiece(7, 1, Teams.Black, Professions.Knight)
board.value.addPiece(2, 1, Teams.Black, Professions.Knight)
board.value.addPiece(1, 1, Teams.Black, Professions.Rook)
board.value.addPiece(8, 1, Teams.Black, Professions.Rook)

for (let i = 0; i < 8; i++) {
  board.value.addPiece(i + 1, 7, Teams.White, Professions.Pawn)
}
board.value.addPiece(5, 8, Teams.White, Professions.King)
board.value.addPiece(3, 8, Teams.White, Professions.Archer)
board.value.addPiece(4, 8, Teams.White, Professions.Queen)
board.value.addPiece(6, 8, Teams.White, Professions.Bishop)
board.value.addPiece(7, 8, Teams.White, Professions.Knight)
board.value.addPiece(2, 8, Teams.White, Professions.Knight)
board.value.addPiece(1, 8, Teams.White, Professions.Rook)
board.value.addPiece(8, 8, Teams.White, Professions.Rook)

const handleMove = (toX: number, toY: number) => {
  if (active && board.value.getTile(toX, toY)?.highlight) {
    board.value.turn = -board.value.turn
    board.value.pieces = board.value.movePiece(active.x, active.y, toX, toY)
    active = undefined
  } else {
    active = undefined
    board.value.resetHighlights()
    board.value.tiles = [...board.value.tiles]
  }
}

const showMoves = (x: number, y: number) => {
  const target = board.value.showMoves(x, y)
  if (target) {
    console.log('Test')
    active = board.value.getPiece(x, y)
    board.value.tiles = target
  }
}
</script>

<template>
  <div class="board">
    <div class="tiles">
      <img
        v-for="(tile, index) in board.tiles"
        :src="tile.image"
        :key="index"
        alt="Game tile"
        class="tile"
        :style="`grid-area: ${tile.y} / ${tile.x}; rotate: ${tile.rotate}deg; ${tile.highlight ? 'filter: brightness(1.5);' : ''}`"
        @click="handleMove(tile.x, tile.y)"
      />
    </div>
    <div class="pieces">
      <img
        v-for="piece in board.pieces"
        :src="piece.image"
        :key="`${piece.x}, ${piece.y}`"
        alt="Game piece"
        class="piece"
        :style="`grid-area: ${piece.y} / ${piece.x}; ${active || piece.team !== board.turn ? 'pointer-events: none;' : ''}`"
        @click="showMoves(piece.x, piece.y)"
      />
    </div>
  </div>
</template>

<style scoped>
.board {
  position: relative;
}
.tiles {
  background-color: gray;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
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
  place-content: center;
  pointer-events: none;
  grid-template: v-bind('`repeat(${board.height}, 96px) / repeat(${board.width}, 96px)`');
  .piece {
    margin: auto;
    height: 100%;
    pointer-events: all;
  }
}
</style>
