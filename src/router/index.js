import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomeView.vue'
import RestaurantView from '@/views/RestaurantView.vue'
import PolicyView from '@/views/PolicyView.vue'
import VerificationView from '@/views/VerificationView.vue'
import VerificationCode from '@/components/VerificationPage/VerificationCode.vue'
import VerificationPhoneNumber from '@/components/VerificationPage/VerificationPhoneNumber.vue'
import VerificationSuccess from '@/components/VerificationPage/VerificationSuccess.vue'
import VerificationError from '@/components/VerificationPage/VerificationError.vue'
import OrderView from '@/views/OrderView.vue'

const isMobile = window.innerWidth < 768
const router = createRouter({
  history: createWebHistory(),
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
        title: 'Оформлення замовлення'
      }
    },
    {
      path: '/restaurant/:id/order',
      name: 'order',
      component: OrderView,
      meta: {
        title: isMobile ? 'Кошик' : 'Оформлення замовлення'
      }
    },
    {
      path: '/restaurant/:id/verification',
      name: 'verify',
      redirect: { name: 'phoneNumber' },
      meta: {
        title: 'Верифікація'
      },
      component: VerificationView,
      children: [
        {
          path: '',
          name: 'phoneNumber',
          component: VerificationPhoneNumber
        },
        {
          path: 'enter-code',
          name: 'enterCode',
          component: VerificationCode
        },
        {
          path: 'success',
          name: 'success',
          component: VerificationSuccess
        },
        {
          path: 'error',
          name: 'error',
          component: VerificationError
        }
      ]
    }
  ]
})

export default router
