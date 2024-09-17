import { createRouter, createWebHistory } from 'vue-router'
import IssuesView from '@/views/IssuesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IssuesView
    },
  ]
})

export default router
