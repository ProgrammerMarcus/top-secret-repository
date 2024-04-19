<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function exit(): void {
  router.push({ name: 'Home' })
}

let date = new Date().getTime()
const time = ref('00:00')

function clockDate() {
  time.value = new Date(new Date().getTime() - date).toISOString().slice(14, 19)
}

let intervalID = -1

onMounted(() => {
  intervalID = window.setInterval(clockDate, 1000)
})

onUnmounted(() => {
  window.clearInterval(intervalID)
})

let modalOn = ref(false)
</script>

<template>
  <div class="menu">
    <button type="button" class="link" @click="modalOn = !modalOn">
      <span class="hide">RETURN TO </span>MAIN MENU
    </button>
    <span class="time">{{ time }}</span>
    <div class="modal" v-if="modalOn">
      <span class="text">Are you sure?</span>
      <div class="buttons">
        <button class="btn" @click="exit">YES</button>
        <button class="btn" @click="modalOn = false">NO</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  gap: 5px;
  z-index: 99;
  background-color: rgba(33, 33, 33, 0.6);
  .text {
    text-align: center;
    font-size: 1.2rem;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    .btn {
      background-image: url(/src/assets/menu/stone.webp);
      background-size: 64px;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
      padding: 5px;
      max-width: calc(100lvw - 60px);
      margin: auto;
      color: white;
      width: 6rem;
      font-family: 'Silkscreen';
      font-size: 1.3rem;
      transition: 0.3s;
      border: 1px solid black;
      cursor: pointer;
    }
    .btn:hover {
      filter: brightness(1.3);
    }
  }
}

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

@media (max-width: 900px) {
  .hide {
    display: none;
  }
}
</style>
