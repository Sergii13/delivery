<script setup>
import { getRestaurants } from '@/api/restaurants'
import { onMounted, ref } from 'vue'
import SortIcon from '@/components/icons/SortIcon.vue'

const restaurants = ref([])

onMounted(async () => {
  restaurants.value = await getRestaurants()
})
</script>
<template>
  <div class="restaurants">
    <div class="restaurants__container">
      <div v-if="restaurants" class="restaurants__wrap">
        <div class="restaurants__top">
          <div class="restaurants__filter">
            <button class="restaurants__filter-btn active">Всі Ресторани</button>
            <button class="restaurants__filter-btn"><span>🇬🇪</span>Грузинські</button>
            <button class="restaurants__filter-btn"><span>🇬🇮</span>Італійські</button>
            <button class="restaurants__filter-btn"><span>🇬🇺</span> Європейські</button>
            <button class="restaurants__filter-btn">
              <span>🥗</span>
              Середньоземноморські
            </button>
          </div>
          <button class="restaurants__sort-btn">
            <SortIcon />
          </button>
        </div>
        <div class="restaurants__grid-layout">
          <RouterLink
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            v-for="restaurant of restaurants"
            :key="restaurant.id"
            class="restaurants__card restaurants-card"
          >
            <div class="restaurants-card__image-ibg">
              <picture>
                <source :srcset="restaurant.image.webp" type="image/webp" />
                <source :srcset="restaurant.image.png" type="image/png" />
                <img :src="restaurant.image.png" alt="" />
              </picture>
              <!--              <div class="restaurants-card__label">-5%</div>-->
              <!--              <div class="restaurants-card__time">20-30 хв</div>-->
            </div>
            <div class="restaurants-card__content">
              <h4>{{ restaurant.title }}</h4>
              <!--              <p>Доставка 40 ₴</p>-->
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
