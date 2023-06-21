import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomeView.vue'
import RestaurantView from '@/views/RestaurantView.vue'
import PolicyView from '@/views/PolicyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant',
      component: RestaurantView
    },
    {
      path: '/policy',
      name: 'policy',
      component: PolicyView,
      meta: {
        title: 'Політика конфіденційності та публічна оферта'
      }
    }
  ]
})

export default router
