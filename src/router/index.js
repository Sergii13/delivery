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
import OrderBlock from '@/components/OrderPage/OrderBlock.vue'
import OrderStatus from '@/components/OrderPage/OrderStatus.vue'
import OrderSuccess from '@/components/OrderPage/OrderSuccess.vue'
import OrderSuccessPayment from '@/components/OrderPage/OrderSuccessPayment.vue'
import OrderErrorPayment from '@/components/OrderPage/OrderErrorPayment.vue'

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
      redirect: { name: 'order-form' },
      meta: {
        title: isMobile ? 'Кошик' : 'Оформлення замовлення'
      },
      children: [
        {
          path: '',
          name: 'order-form',
          component: OrderBlock
        },
        {
          path: '/restaurant/:id/order/expectation',
          name: 'order-status',
          component: OrderStatus
        },
        {
          path: '/restaurant/:id/order/success',
          name: 'order-success',
          component: OrderSuccess,
          meta: {
            title: ''
          }
        },
        {
          path: '/restaurant/:id/order/success-payment',
          name: 'order-success-payment',
          component: OrderSuccessPayment,
          meta: {
            title: ''
          }
        },
        {
          path: '/restaurant/:id/order/error-payment',
          name: 'order-error-payment',
          component: OrderErrorPayment,
          meta: {
            title: ''
          }
        }
      ]
    },
    {
      path: '/restaurant/:id/verification',
      name: 'verify',
      redirect: { name: 'phoneNumber' },
      meta: {
        title: isMobile ? 'Верифікація' : ''
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
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
