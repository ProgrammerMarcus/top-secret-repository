<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
const router = useRouter()
function exit(): void {
  router.push({ name: 'Home' })
}

let date = new Date().getTime()
const time = ref('00:00')

function clockDate() {
  console.log('tick')
  time.value = new Date(new Date().getTime() - date).toISOString().slice(14, 19)
}

let intervalID = -1

onMounted(() => {
  intervalID = window.setInterval(clockDate, 1000)
})

onUnmounted(() => {
  window.clearInterval(intervalID)
})
</script>

<template>
  <div class="menu">
    <button type="button" class="link" @click="exit">Return to main menu</button>
    <span class="time">{{ time }}</span>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.link {
  color: white;
  transition: 0.2s;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
  font-family: 'Silkscreen';
  text-decoration: underline;
  cursor: pointer;
  margin: auto auto auto 0;
}
.link:hover {
  color: rgb(255, 125, 100);
}

.time {
  color: white;
  font-size: 20px;
  margin: auto 0 auto auto;
}
</style>
