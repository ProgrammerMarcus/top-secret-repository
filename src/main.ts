import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import GameDisplay from './components/GameDisplay.vue'
import GameHome from './components/GameHome.vue'

const routes = [
  { path: '/top-secret-repository/', component: GameHome, name: 'Home' },
  { path: '/top-secret-repository/game', component: GameDisplay, name: 'Game' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
