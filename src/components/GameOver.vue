<script setup lang="ts">
import QuitGame from './QuitGame.vue'
import { Teams } from '../assets/code/enums'
defineProps({
  team: Number
})
</script>

<template>
  <div class="game-over" :class="{ black: team === Teams.Black, white: team === Teams.White }">
    <span class="text">{{ `${team === 1 ? 'RED' : 'BLUE'} WINS!` }}</span>
    <QuitGame />
  </div>
</template>

<style scoped>
@keyframes appear {
  from {
    width: 1vw;
  }
  to {
    width: 30vw;
  }
}
.game-over {
  display: grid;
  place-content: center;
  position: absolute;
  top: calc(50% - 12vh);
  right: calc(50% - 15vw);
  width: 30vw;
  font-size: 4vw;
  text-align: center;
  height: 24vh;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  animation: 0.5s 1 forwards appear;
  text-wrap: nowrap;
  color: white;
  cursor: default;
  padding: 10px;
}

.text {
  height: min-content;
}

.game-over.black {
  background-color: rgba(255, 70, 70, 0.7);
}
.game-over.white {
  background-color: rgba(97, 118, 255, 0.7);
}
</style>
