<script setup lang="ts">
import GameOver from './GameOver.vue'
import QuitGame from './QuitGame.vue'
import { Teams } from '../assets/code/enums'
import { ref, onMounted, onUnmounted } from 'vue'
import { GamePiece } from '@/assets/code/classes/GamePiece'
import { classicPlus } from '@/assets/code/maps/classicPlus'
import { classic } from '@/assets/code/maps/classic'
import { useRoute } from 'vue-router'

const map = useRoute().params.map
let loaded

switch (map) {
  case '1':
    loaded = classic.generate()
    break
  case '2':
    loaded = classicPlus.generate()
    break
  default:
    loaded = classic.generate()
}

const board = ref(loaded)
let active: undefined | GamePiece = undefined
const size = ref(
  Math.min(
    Math.floor((window.innerHeight - 10) / board.value.height),
    Math.floor((window.innerWidth - 10) / board.value.width)
  )
)

const updateSize = () => {
  size.value = Math.min(
    Math.floor((window.innerHeight - 10) / board.value.height),
    Math.floor((window.innerWidth - 10) / board.value.width)
  )
}

onMounted(() => {
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

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
    if (!board.value.gameOver) {
      board.value.turn = -board.value.turn
    }
  } else {
    console.error('AI is confused?')
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
    if (!board.value.gameOver) {
      board.value.turn = -board.value.turn
      handleAI()
    }
  } else {
    active = undefined
    board.value.resetHighlights()
    board.value.tiles = [...board.value.tiles]
  }
}

const showMoves = (x: number, y: number) => {
  if (!board.value.gameOver) {
    const target = board.value.showMoves(x, y)
    if (target) {
      active = board.value.getPiece(x, y)
      board.value.tiles = target
    }
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
  <GameOver v-if="board.gameOver" :team="board.turn" />
  <QuitGame class="quit" />
</template>

<style scoped>
@keyframes highlight {
  from {
    filter: brightness(1.4);
  }
  to {
    filter: brightness(1.2);
  }
}
.board {
  display: grid;
  background-color: rgb(99, 155, 255);
  height: 100svh;
  width: 100svw;
  .tiles {
    position: relative;
    top: 0;
    left: 0;
    display: grid;
    place-content: center;
    grid-area: 1 / 1;
    grid-template: v-bind(
      '`repeat(${board.height}, ${size}px) / repeat(${board.width}, ${size}px)`'
    );
    .tile {
      height: v-bind('`${size}px`');
    }
    .tile.highlight {
      animation: 0.5s infinite alternate highlight;
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
    grid-template: v-bind(
      '`repeat(${board.height}, ${size}px) / repeat(${board.width}, ${size}px)`'
    );
    .piece {
      margin: auto;
      height: v-bind('`${size}px`');
      pointer-events: all;
    }
    .piece.clickthrough {
      pointer-events: none;
    }
    .piece.active:hover {
      filter: brightness(1.4);
    }
    .piece.active.white {
      background-image: url('../assets/select.png');
      background-size: contain;
    }
    .piece.active.black {
      background-image: url('../assets/select_2.png');
      background-size: contain;
    }
    .piece.selected {
      animation: 0.5s infinite alternate highlight;
    }
  }
}
.quit {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
