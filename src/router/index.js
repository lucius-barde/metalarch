import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // lazy-loaded route for non-home views
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/metalband/:id',
    name: 'metalband',
    // lazy-loaded route for non-home views
    component: () => import('../views/MetalBandView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
