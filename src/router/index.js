import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlist from '../views/Playlist.vue'
import Player from '../views/Player.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/player',
    name: 'Player',
    component: Player

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
