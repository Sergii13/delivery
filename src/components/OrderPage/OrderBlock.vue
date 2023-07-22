<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import BasketProducts from '@/components/shared/BasketProducts/BasketProducts.vue'
import SkeletonApp from '@/components/shared/SkeletonApp.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import CounterApp from '@/components/shared/ui/CounterApp.vue'
import SwitcherApp from '@/components/OrderPage/SwitcherApp.vue'
import ChoosingTime from '@/components/OrderPage/ChoosingTime.vue'
import { useFetch } from '@/composables/useFetch'
import {
  getAddressFields,
  getCustomerFields,
  getPayments,
  getShippings,
  orderClose
} from '@/api/basket'

import { DateTime } from 'luxon'
import ChoosingPayment from '@/components/OrderPage/ChoosingPayment.vue'
import InputApp from '@/components/shared/ui/InputApp.vue'
import { getRestaurantByAddress, getRestaurantsPickup } from '@/api/restaurants'
import ChoosingRest from '@/components/OrderPage/ChoosingRest.vue'
import router from '@/router'
import ErrorsApp from '@/components/shared/ErrorsApp.vue'
import { OFFSET_HEADER } from '@/utils/constants'

const basketStore = useBasketStore()
const { isLoading, productItems, totalPrice } = storeToRefs(basketStore)
const totalPriceAll = computed(() => {
  return totalPrice.value + Number(delivery_cost.value)
})
watch(productItems, (newValue) => {
  if (newValue.length === 0) {
    router.push('/')
  }
})

const { data: shippings, fetch: fetchShippings } = useFetch(getShippings)
const typeDelivery = ref({})

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
const addressFieldsCompleted = ref({ street: '', house: '', entrance: '', floor: '', flat: '' })

const {
  data: restaurantByAddress,
  error: errorRestaurant,
  fetch: fetchRestaurantByAddress
} = useFetch(getRestaurantByAddress)

function getRestaurant(target) {
  if (target.dataset.id === 'street' || target.dataset.id === 'house') {
    let rc3339 = ''
    if (typeDate.value === 'near') {
      const date = DateTime.now().toISODate()
      const time = DateTime.now().plus({ minutes: 5 }).toFormat('HH:mm:ss')
      rc3339 = `${date}T${time}Z`
    } else {
      rc3339 = `${date.value}T${time.value}:00Z`
    }

    const payload = {
      date: rc3339,
      city_name: 'Киев',
      street: addressFieldsCompleted.value.street,
      house: addressFieldsCompleted.value.house
    }
    fetchRestaurantByAddress(payload)
  }
}

const delivery_cost = ref(0)
watch(
  () => restaurantByAddress,
  (newValue) => {
    if (newValue.value) {
      restaurant.value = newValue.value.zone_info?.rest_id
      delivery_cost.value = newValue.value.zone_info?.cost
    } else {
      restaurant.value = ''
      delivery_cost.value = 0
    }
  },
  { deep: true }
)

const { data: restaurants, fetch: fetchRestaurants } = useFetch(getRestaurantsPickup)

const restaurant = ref('')
watch(
  typeDelivery,
  (newValue) => {
    restaurant.value = ''
    delivery_cost.value = 0
    if (newValue?.type === 'pickup' && !restaurants.value) {
      addressFieldsCompleted.value.street = ''
      addressFieldsCompleted.value.house = ''
      addressFieldsCompleted.value.flat = ''
      fetchRestaurants()
    }
  },
  { immediate: true }
)

const isValidate = computed(() => {
  const isAddress =
    addressFieldsCompleted.value.street.trim().length > 0 &&
    addressFieldsCompleted.value.house.trim().length > 0 &&
    addressFieldsCompleted.value.flat.trim().length > 0
  return (
    restaurant.value !== '' &&
    customerFieldsCompleted.value.name.trim().length > 2 &&
    (typeDelivery.value?.type === 'delivery' ? isAddress : true)
  )
})

const { data: responseOrder, error: errorOrder, fetch: fetchCloseOrder } = useFetch(orderClose)
const errorRef = ref(null)
watch(errorOrder, (newValue) => {
  if (newValue) {
    const top = errorRef.value?.getBoundingClientRect().top + scrollY - OFFSET_HEADER
    window.scrollTo({ top: top, behavior: 'smooth' })
  }
})

const countUtensils = ref(0)

async function closeOrder() {
  let payload = {
    shipping_id: typeDelivery.value.id,
    payment_id: payment.value.id,
    restaurant_id: Number(restaurant.value),
    amount_due: '0',
    comment: comment.value,
    date_type: typeDate.value,
    date: date.value,
    time: time.value,
    delivery_cost: delivery_cost.value,
    pwa_rest_id: Number(restaurant.value),
    customer_fields: {
      phone: '0971000000',
      name: customerFieldsCompleted.value.name,
      email: customerFieldsCompleted.value.email
    },
    address_fields: {
      street: addressFieldsCompleted.value.street,
      house: addressFieldsCompleted.value.house,
      flat: addressFieldsCompleted.value.flat,
      floor: addressFieldsCompleted.value.floor,
      entrance: addressFieldsCompleted.value.entrance
    }
  }
  const params = { instance: import.meta.env.VITE_INSTANCE, payload: payload }
  await fetchCloseOrder(params)
  if (responseOrder.value) {
    basketStore.setOrderInfo(responseOrder.value)
    router.push({ name: 'order-status' })
  }
}

onMounted(async () => {
  await basketStore.getBasket()
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

          <div class="order-cutlery">
            <div class="order-cutlery__title">Столові прибори</div>
            <div class="order-cutlery__row">
              <div class="order-cutlery__text">
                Ми eco-friendly, просимо вас не використовувати одноразові прибори без потреби
              </div>
              <div class="order-cutlery__right">
                <CounterApp
                  @update-count="(value) => (countUtensils = value)"
                  :min-value="0"
                  v-if="countUtensils > 0"
                  :count-value="countUtensils"
                />
                <ButtonApp
                  @click="countUtensils++"
                  v-else
                  :type="'border-white'"
                  :label="'Додати'"
                />
              </div>
            </div>
          </div>

          <div v-if="addressFields && typeDelivery?.type === 'delivery'" class="order__block">
            <div class="order__title-block">Доставка</div>
            <div class="order__inputs-address">
              <InputApp
                v-for="itemField of addressFields"
                :key="itemField.id"
                :id="itemField.cart_type"
                :error="
                  itemField.cart_type === 'street' && errorRestaurant
                    ? { ...errorRestaurant, text: 'Ресторан не знайдено' }
                    : null
                "
                @on-blur="getRestaurant"
                :required="Boolean(itemField.required)"
                v-model="addressFieldsCompleted[itemField.cart_type]"
                :placeholder="itemField.title"
              />
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
          <ChoosingRest
            v-model="restaurant"
            v-if="restaurants && typeDelivery?.type === 'pickup'"
            :items="restaurants"
          />
          <!--          <ul class="order-detail">-->
          <!--            <li class="order-detail__list">-->
          <!--              <a href="" class="order-detail__link">-->
          <!--                <div class="order-detail__left">-->
          <!--                  <img :src="LocationIcon" alt="" />вул. Заньковецької, 2 Б-->
          <!--                </div>-->
          <!--                <div class="order-detail__arrow">-->
          <!--                  <img :src="ArrowIcon" alt="" />-->
          <!--                </div>-->
          <!--              </a>-->
          <!--            </li>-->
          <!--            <li class="order-detail">-->
          <!--              <a href="" class="order-detail__link">-->
          <!--                <div class="order-detail__left">-->
          <!--                  <img :src="PhoneIcon" alt="" />+38 123 456 78 90-->
          <!--                </div>-->
          <!--                <div class="order-detail__arrow">-->
          <!--                  <img :src="ArrowIcon" alt="" />-->
          <!--                </div>-->
          <!--              </a>-->
          <!--            </li>-->
          <!--          </ul>-->
          <div v-if="filterCustomerFields" class="order__block">
            <div class="order__title-block">Інформація</div>
            <div class="order__inputs-customer">
              <InputApp
                v-for="itemField of filterCustomerFields"
                :key="itemField.id"
                :required="Boolean(itemField.required)"
                v-model="customerFieldsCompleted[itemField.cart_type]"
                :placeholder="itemField.title"
              />
            </div>
          </div>

          <ChoosingTime v-model:type="typeDate" v-model:date="date" v-model:time="time" />
          <ChoosingPayment @change-payment="changePayment" v-if="payments" :payments="payments" />
          <div class="order__comment">
            <textarea
              v-model="comment"
              class="textarea"
              placeholder="Коментар до замовлення"
            ></textarea>
          </div>
          <ul class="order__info-list">
            <li v-if="0" class="order__info-item"><span>Знижка</span><span>52 ₴</span></li>
            <li class="order__info-item">
              <span>Замовлення</span><span>{{ totalPrice }} ₴</span>
            </li>
            <li class="order__info-item">
              <span>Доставка</span><span v-if="delivery_cost === 0">Безкоштовно</span>
              <span v-else>{{ delivery_cost }} ₴</span>
            </li>
            <li class="order__info-item big">
              <span>Всього</span><span>{{ totalPriceAll }} ₴</span>
            </li>
          </ul>

          <ButtonApp @click="closeOrder" :disabled="!isValidate" :label="'Оформити замовлення'" />
          <div ref="errorRef" class="order__error">
            <ErrorsApp v-show="errorOrder" :items="[errorOrder?.message]" />
          </div>
        </template>
        <SkeletonApp v-if="isLoading" :type-skeleton="'order'" />
      </div>
    </div>
  </section>
</template>
