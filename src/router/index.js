import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  // 新歌
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  // 排行
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/Rank.vue')
  },
  // 歌单
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue')
  },
  // 歌手
  {
    path: '/singer',
    name: 'singer',
    component: () => import('../views/Singer.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
