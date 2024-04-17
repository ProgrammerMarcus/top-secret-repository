<script setup lang="ts">
import { classic } from '@/assets/code/maps/classic'
import { classicPlus } from '@/assets/code/maps/classicPlus'
import MapOption from './MapOption.vue'

const maps = [classic, classicPlus]
</script>

<template>
  <div class="options">
    <MapOption
      v-for="map of maps"
      :key="map.identifier"
      :name="map.name"
      :image="map.image"
      :id="map.identifier"
    />
  </div>
</template>

<style scoped>
.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-image: url(/src/assets/menu/stone.webp);
  background-size: 128px;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>
