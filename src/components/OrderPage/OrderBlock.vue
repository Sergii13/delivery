<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import BasketProducts from '@/components/shared/BasketProducts/BasketProducts.vue'
import SkeletonApp from '@/components/shared/SkeletonApp.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import LocationIcon from '@/assets/img/icons/location3.svg'
import PhoneIcon from '@/assets/img/icons/phone3.svg'
import ArrowIcon from '@/assets/img/icons/arrow.svg'
import SwitcherApp from '@/components/OrderPage/SwitcherApp.vue'
import ChoosingTime from '@/components/OrderPage/ChoosingTime.vue'
import { useFetch } from '@/composables/useFetch'
import { getAddressFields, getCustomerFields, getPayments, getShippings } from '@/api/basket'

import { DateTime } from 'luxon'
import ChoosingPayment from '@/components/OrderPage/ChoosingPayment.vue'
import InputApp from '@/components/shared/ui/InputApp.vue'
import { getRestaurantsPickup } from '@/api/restaurants'
import ChoosingRest from '@/components/OrderPage/ChoosingRest.vue'
import router from '@/router'
import { useBreakpoints } from '@/composables/useBreakpoints'

const basketStore = useBasketStore()
const { isLoading, productItems, totalPrice } = storeToRefs(basketStore)
const totalPriceAll = computed(() => {
  return totalPrice.value
})
watch(productItems, (newValue) => {
  if (newValue.length === 0) {
    router.push('/')
  }
})

const { data: shippings, fetch: fetchShippings } = useFetch(getShippings)
const typeDelivery = ref('delivery')

const typeDate = ref('near')
const date = ref(DateTime.now().toISODate())
const time = ref('00:00')

const { data: payments, fetch: fetchPayments } = useFetch(getPayments)
const payment = ref({})

function changePayment(newValue) {
  payment.value = newValue
}

const { data: customerFields, fetch: fetchCustomerFields } = useFetch(getCustomerFields)
const filterCustomerFields = computed(() => {
  return customerFields.value?.filter((item) => item.cart_type !== 'phone')
})
const customerFieldsCompleted = ref({ name: '', email: '' })
const comment = ref('')

const { data: addressFields, fetch: fetchAddressFields } = useFetch(getAddressFields)

const { data: restaurants, fetch: fetchRestaurants } = useFetch(getRestaurantsPickup)
const restaurant = ref('')
watch(
  typeDelivery,
  (newValue) => {
    if (newValue === 'pickup' && !restaurants.value) {
      fetchRestaurants()
    }
  },
  { immediate: true }
)

const isValidate = computed(() => {
  return restaurant.value !== '' && customerFieldsCompleted.value.name.trim().length > 3
})
onMounted(() => {
  basketStore.getBasket()
  fetchShippings()
  fetchPayments()
  fetchCustomerFields()
  fetchAddressFields()
})
</script>
<template>
  <section class="order">
    <div class="order__container">
      <div class="order__wrap">
        <template v-if="productItems && !isLoading">
          <div class="order__title">Mafia (Вадима Гетьмана, 6)</div>
          <SwitcherApp v-if="shippings?.data" v-model="typeDelivery" :items="shippings.data" />
          <BasketProducts :products="productItems" />
          <div class="order__comment">
            <textarea
              v-model="comment"
              class="textarea"
              placeholder="Коментар до замовлення"
            ></textarea>
          </div>
          <div class="order-cutlery">
            <div class="order-cutlery__title">Столові прибори</div>
            <div class="order-cutlery__row">
              <div class="order-cutlery__text">
                Ми eco-friendly, просимо вас не використовувати одноразові прибори без потреби
              </div>
              <div class="order-cutlery__right">
                <ButtonApp :type="'border-white'" :label="'Додати'" />
              </div>
            </div>
          </div>
          <div class="order__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10171.288305113645!2d30.4593962!3d50.4071534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c936cba79a8f%3A0x133a083fd7bf2131!2z0JTQtdGA0LbQsNCy0L3QuNC5INC80YPQt9C10Lkg0LDQstGW0LDRhtGW0Zcg0ZbQvNC10L3RliDQni4g0JouINCQ0L3RgtC-0L3QvtCy0LA!5e0!3m2!1suk!2sua!4v1689333886045!5m2!1suk!2sua"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div v-if="addressFields && typeDelivery === 'delivery'" class="order__inputs-address">
            <InputApp
              v-for="itemField of addressFields"
              :key="itemField.id"
              :required="Boolean(itemField.required)"
              v-model="customerFieldsCompleted[itemField.cart_type]"
              :placeholder="itemField.title"
            />
          </div>
          <ChoosingRest
            v-model="restaurant"
            v-if="restaurants && typeDelivery === 'pickup'"
            :items="restaurants"
          />
          <ul class="order-detail">
            <li class="order-detail__list">
              <a href="" class="order-detail__link">
                <div class="order-detail__left">
                  <img :src="LocationIcon" alt="" />вул. Заньковецької, 2 Б
                </div>
                <div class="order-detail__arrow">
                  <img :src="ArrowIcon" alt="" />
                </div>
              </a>
            </li>
            <li class="order-detail">
              <a href="" class="order-detail__link">
                <div class="order-detail__left">
                  <img :src="PhoneIcon" alt="" />+38 123 456 78 90
                </div>
                <div class="order-detail__arrow">
                  <img :src="ArrowIcon" alt="" />
                </div>
              </a>
            </li>
          </ul>
          <div v-if="filterCustomerFields" class="order__inputs-customer">
            <InputApp
              v-for="itemField of filterCustomerFields"
              :key="itemField.id"
              :required="Boolean(itemField.required)"
              v-model="customerFieldsCompleted[itemField.cart_type]"
              :placeholder="itemField.title"
            />
          </div>
          <ChoosingTime v-model:type="typeDate" v-model:date="date" v-model:time="time" />
          <ChoosingPayment @change-payment="changePayment" v-if="payments" :payments="payments" />
          <ul class="order__info-list">
            <li class="order__info-item"><span>Знижка</span><span>52 ₴</span></li>
            <li class="order__info-item">
              <span>Замовлення</span><span>{{ totalPrice }} ₴</span>
            </li>
            <li class="order__info-item"><span>Доставка</span><span>Безкоштовно</span></li>
            <li class="order__info-item big">
              <span>Всього</span><span>{{ totalPriceAll }} ₴</span>
            </li>
          </ul>

          <ButtonApp :disabled="!isValidate" :label="'Оформити замовлення'" />
        </template>
        <SkeletonApp v-if="isLoading" :type-skeleton="'order'" />
      </div>
    </div>
  </section>
</template>
