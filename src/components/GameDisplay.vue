<script setup lang="ts">
import GameOver from './GameOver.vue'
import { Teams } from '../assets/code/enums'
import { ref, onMounted, onUnmounted } from 'vue'
import { GamePiece } from '@/assets/code/classes/GamePiece'
import { classicPlus } from '@/assets/code/maps/classicPlus'
import { classic } from '@/assets/code/maps/classic'
import { useRoute } from 'vue-router'
import { ambush } from '@/assets/code/maps/ambush'
import { duel } from '@/assets/code/maps/duel'
import { invasion } from '@/assets/code/maps/invasion'
import { mines } from '@/assets/code/maps/mines'
import GameMenu from './GameMenu.vue'

const map = useRoute().params.map
let loaded

switch (map) {
  case classic.identifier:
    loaded = classic.generate()
    break
  case classicPlus.identifier:
    loaded = classicPlus.generate()
    break
  case ambush.identifier:
    loaded = ambush.generate()
    break
  case duel.identifier:
    loaded = duel.generate()
    break
  case mines.identifier:
    loaded = mines.generate()
    break
  case invasion.identifier:
    loaded = invasion.generate()
    break
  default:
    console.error('unknown map, using default')
    loaded = classic.generate()
}

const board = ref(loaded)
let active: undefined | GamePiece = undefined
const size = ref(
  Math.min(
    Math.floor((window.innerHeight - 40) / board.value.height),
    Math.floor((window.innerWidth - 40) / board.value.width)
  )
)

const updateSize = () => {
  size.value = Math.min(
    Math.floor((window.innerHeight - 40) / board.value.height),
    Math.floor((window.innerWidth - 40) / board.value.width)
  )
}

onMounted(() => {
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const handleAI = () => {
  const action = board.value.complexAI()
  if (action) {
    board.value.movePiece(action.fromX, action.fromY, action.toX, action.toY)
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
      window.setTimeout(handleAI, 200)
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
    <GameMenu class="menu" />
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
  <GameOver v-if="board.gameOver" :team="-board.turn" />
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
  background-color: black;
  display: grid;
  height: 100lvh;
  width: 100lvw;
  grid-template: min-content / min-content;
  place-content: center;
  .menu {
    height: auto;
  }
  .tiles {
    border-right: 2px solid rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    position: relative;
    top: 0;
    left: 0;
    display: grid;
    place-content: center;
    grid-area: 2 / 1;
    grid-template: v-bind(
      '`repeat(${board.height}, ${size}px) / repeat(${board.width}, ${size}px)`'
    );
    .tile {
      height: v-bind('`${size}px`');
      border-top: 1px solid rgba(0, 0, 0, 0.5);
      border-left: 1px solid rgba(0, 0, 0, 0.5);
      box-sizing: content-box;
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
    grid-area: 2 / 1;
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
</style>
