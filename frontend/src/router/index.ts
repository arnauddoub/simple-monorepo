import { createRouter, createWebHistory } from 'vue-router'
import { routes as userRoutes } from '@/modules/user/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...userRoutes
  ]
})

export default router
