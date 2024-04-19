<script setup lang="ts">
import { classic } from '@/assets/code/maps/classic'
import { classicPlus } from '@/assets/code/maps/classicPlus'
import { ambush } from '@/assets/code/maps/ambush'
import MapOption from './MapOption.vue'
import { mines } from '@/assets/code/maps/mines'
import { invasion } from '@/assets/code/maps/invasion'
import { duel } from '@/assets/code/maps/duel'

const maps = [classic, classicPlus, ambush, mines, invasion, duel]
</script>

<template>
  <div class="container">
    <h2 class="info">{{ `Maps (${maps.length}):` }}</h2>
    <div class="options">
      <MapOption
        v-for="map of maps"
        :key="map.identifier"
        :name="map.name"
        :image="map.image"
        :id="map.identifier"
      />
    </div>
  </div>
</template>

<style scoped>
.info {
  font-size: 2.1rem;
  font-family: 'SilkscreenBold';
  text-align: center;
  margin-bottom: 5px;
}

.container {
  background-image: url(/src/assets/menu/stone.webp);
  background-size: 128px;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 5px 3px 40px 3px;
  max-width: calc(100vw - 60px);
  margin: 10px auto;
  width: 720px;
  border: 1px solid black;
  overflow: auto;
  max-height: 70vh;
}

.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 600px;
  margin: auto;
}
</style>
