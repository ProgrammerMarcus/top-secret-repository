<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GameBoard, { Areas, GamePiece, Professions, Teams, Types } from '../game'
const board = ref(new GameBoard(15, 10))
let active: undefined | GamePiece = undefined
const size = ref(Math.floor(window.innerHeight / 10))

const updateSize = () => {
  size.value = Math.floor(window.innerHeight / 10)
}

onMounted(() => {
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

for (let x = 1; x <= board.value.width; x++) {
  for (let y = 1; y <= board.value.height; y++) {
    if (x === 1 && y === 1) {
      board.value.addTile(x, y, Types.WaterCorner, Areas.None, 90)
    } else if (x === board.value.width && y === 1) {
      board.value.addTile(x, y, Types.WaterCorner, Areas.None, 180)
    } else if (x === board.value.width && y === board.value.height) {
      board.value.addTile(x, y, Types.WaterCorner, Areas.None, 270)
    } else if (x === 1 && y === board.value.height) {
      board.value.addTile(x, y, Types.WaterCorner, Areas.None, 0)
    } else if (y === 1) {
      board.value.addTile(x, y, Types.WaterMiddle, Areas.None, 90)
    } else if (x === 1) {
      board.value.addTile(x, y, Types.WaterMiddle, Areas.None, 0)
    } else if (y === board.value.height) {
      board.value.addTile(x, y, Types.WaterMiddle, Areas.None, 270)
    } else if (x === board.value.width) {
      board.value.addTile(x, y, Types.WaterMiddle, Areas.None, 180)
    } else if (
      (x === 7 && y === 3) ||
      (y === 8 && x === 9) ||
      (y === 7 && x === 8) ||
      (x === 8 && y === 4)
    ) {
      board.value.addTile(x, y, Types.Rock, Areas.None, 0)
    } else if ((x === 6 && y === 9) || (x === 10 && y === 2)) {
      board.value.addTile(x, y, Types.Log, Areas.None, 0)
    } else {
      board.value.addTile(x, y)
    }
  }
}

for (let i = 2; i < 8; i++) {
  board.value.addPiece(3, i + 1, Teams.Black, Professions.Pawn)
}
board.value.addPiece(2, 5, Teams.Black, Professions.King)
board.value.addPiece(2, 2, Teams.Black, Professions.Rook)
board.value.addPiece(2, 9, Teams.Black, Professions.Rook)
board.value.addPiece(2, 6, Teams.Black, Professions.Queen)
board.value.addPiece(2, 4, Teams.Black, Professions.Bishop)
board.value.addPiece(2, 7, Teams.Black, Professions.Bishop)
board.value.addPiece(2, 8, Teams.Black, Professions.Knight)
board.value.addPiece(2, 3, Teams.Black, Professions.Knight)
board.value.addPiece(3, 2, Teams.Black, Professions.Archer)
board.value.addPiece(3, 9, Teams.Black, Professions.Archer)

for (let i = 2; i < 8; i++) {
  board.value.addPiece(13, i + 1, Teams.White, Professions.Pawn)
}
board.value.addPiece(14, 6, Teams.White, Professions.King)
board.value.addPiece(14, 2, Teams.White, Professions.Rook)
board.value.addPiece(14, 9, Teams.White, Professions.Rook)
board.value.addPiece(14, 5, Teams.White, Professions.Queen)
board.value.addPiece(14, 4, Teams.White, Professions.Bishop)
board.value.addPiece(14, 7, Teams.White, Professions.Bishop)
board.value.addPiece(14, 8, Teams.White, Professions.Knight)
board.value.addPiece(14, 3, Teams.White, Professions.Knight)
board.value.addPiece(13, 2, Teams.White, Professions.Archer)
board.value.addPiece(13, 9, Teams.White, Professions.Archer)

const handleAI = () => {
  const action = board.value.simpleAI()
  if (action) {
    console.log(action.fromX, action.fromY, action.toX, action.toY)
    board.value.movePiece(action.fromX, action.fromY, action.toX, action.toY)
    console.log(`piece_${action.id}`)
    document.getElementById(`piece_${action.id}`)?.animate(
      [
        // keyframes
        {
          transform: `translate(${(action.fromX - action.toX) * size.value}px, ${(action.fromY - action.toY) * size.value}px)`
        },
        { transform: `translate(0px, 0px)` }
      ],
      {
        // timing options
        duration: 200,
        iterations: 1
      }
    )
    board.value.turn = -board.value.turn
  } else {
    alert('you won!')
  }
}

const handleMove = (toX: number, toY: number) => {
  if (active && board.value.getTile(toX, toY)?.highlight) {
    const fromX: number = active.x
    const fromY: number = active.y
    board.value.pieces = board.value.movePiece(active.x, active.y, toX, toY)
    document.getElementById(`piece_${active.id}`)?.animate(
      [
        // keyframes
        {
          transform: `translate(${(fromX - toX) * size.value}px, ${(fromY - toY) * size.value}px)`
        },
        { transform: `translate(0px, 0px)` }
      ],
      {
        // timing options
        duration: 200,
        iterations: 1
      }
    )
    active = undefined
    board.value.turn = -board.value.turn
    handleAI()
  } else {
    active = undefined
    board.value.resetHighlights()
    board.value.tiles = [...board.value.tiles]
  }
}

const showMoves = (x: number, y: number) => {
  const target = board.value.showMoves(x, y)
  if (target) {
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
        draggable="false"
        :class="{ highlight: tile.highlight }"
        :style="`grid-area: ${tile.y} / ${tile.x}; rotate: ${tile.rotate}deg;`"
        @click="handleMove(tile.x, tile.y)"
      />
    </div>
    <div class="pieces">
      <img
        v-for="piece in board.pieces"
        :src="piece.image"
        :key="piece.id"
        :id="`piece_${piece.id}`"
        alt="Game piece"
        class="piece"
        draggable="false"
        :class="{
          active: board.turn === piece.team,
          black: piece.team === Teams.Black,
          white: piece.team === Teams.White,
          selected: active?.x === piece.x && active.y === piece.y,
          clickthrough: active || piece.team !== board.turn
        }"
        :style="`grid-area: ${piece.y} / ${piece.x};`"
        @click="showMoves(piece.x, piece.y)"
      />
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  margin: auto;
  background-color: rgb(99, 155, 255);
}
.tiles {
  position: relative;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  grid-area: 1 / 1;
  grid-template: v-bind('`repeat(${board.height}, ${size}px) / repeat(${board.width}, ${size}px)`');
  .tile {
    height: v-bind('`${size}px`');
  }
}
.pieces {
  position: relative;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  pointer-events: none;
  grid-area: 1 / 1;
  grid-template: v-bind('`repeat(${board.height}, ${size}px) / repeat(${board.width}, ${size}px)`');
  .piece {
    margin: auto;
    height: v-bind('`${size}px`');
    pointer-events: all;
  }
  .piece.clickthrough {
    pointer-events: none;
  }
}

@keyframes highlight {
  from {
    filter: brightness(1.4);
  }
  to {
    filter: brightness(1.2);
  }
}

@keyframes highlight {
  from {
    filter: brightness(1.4);
  }
  to {
    filter: brightness(1.2);
  }
}

.highlight {
  animation: 0.5s infinite alternate highlight;
}
.active:hover {
  filter: brightness(1.4);
}
.active.white {
  background-image: url('../assets/select.png');
  background-size: contain;
}
.active.black {
  background-image: url('../assets/select_2.png');
  background-size: contain;
}
.selected {
  animation: 0.5s infinite alternate highlight;
}
</style>
