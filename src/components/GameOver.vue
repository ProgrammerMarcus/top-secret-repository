<script setup lang="ts">
import { Teams } from '../assets/code/enums'
defineProps({
  team: Number
})
</script>

<template>
  <div class="game-over" :class="{ black: team === Teams.Black, white: team === Teams.White }">
    {{ `${team === 1 ? 'RED' : 'BLUE'} WINS!` }}
  </div>
</template>

<style scoped>
@keyframes appear {
  from {
    width: 1svw;
  }
  to {
    width: 30svw;
  }
}
.game-over {
  display: grid;
  place-content: center;
  position: absolute;
  top: calc(50% - 6.5svh);
  right: calc(50% - 15svw);
  width: 30svw;
  height: 13svh;
  font-size: 4svw;
  text-align: center;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  animation: 0.5s 1 forwards appear;
  pointer-events: none;
  text-wrap: nowrap;
}
.game-over.black {
  background-color: rgba(255, 70, 70, 0.7);
}
.game-over.white {
  background-color: rgba(97, 118, 255, 0.7);
}
</style>
