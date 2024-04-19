<script setup lang="ts">
import { config } from '@/assets/code/config'
import { Difficulties } from '@/assets/code/enums'
import { ref } from 'vue'

const difficulty = ref(config.difficulty)

function changeDifficulty(to: number) {
  difficulty.value = to
  config.difficulty = to
}
</script>

<template>
  <div class="difficulty">
    <span class="text">Difficulty: </span>
    <button
      :class="{ selected: difficulty === Difficulties.Easy }"
      class="btn"
      type="button"
      @click="changeDifficulty(Difficulties.Easy)"
    >
      EASY
    </button>
    <button
      :class="{ selected: difficulty === Difficulties.Normal }"
      class="btn"
      type="button"
      @click="changeDifficulty(Difficulties.Normal)"
    >
      NORMAL
    </button>
  </div>
</template>

<style scoped>
.difficulty {
  display: grid;
  place-content: center;
  grid-template: 1fr / min-content min-content min-content;
  gap: 10px;
}
.btn {
  background-image: url(/src/assets/menu/stone.webp);
  background-size: 64px;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 5px;
  max-width: calc(100svw - 60px);
  margin: auto;
  color: white;
  width: 6rem;
  font-family: 'Silkscreen';
  font-size: 1rem;
  transition: 0.3s;
  border: 1px solid black;
}

.text {
  margin: auto;
  font-size: 1.2rem;
}

.btn.selected {
  background-image: url(/src/assets/menu/stone_selected.webp);
}

.btn:hover:not(.btn.selected) {
  filter: brightness(1.3);
  cursor: pointer;
}
</style>
