import HelloWorld from '../components/HelloWorld.vue'
import HelloWorld2 from '../components/HelloWorld2.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {path: '/', component: HelloWorld},
  {path: '/home', component: HelloWorld2},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})