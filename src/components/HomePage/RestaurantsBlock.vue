<script setup>
import { getRestaurants } from '@/api/restaurants'
import { onMounted, ref } from 'vue'
import SortIcon from '@/components/icons/SortIcon.vue'
import LocationIconOrange from '@/assets/img/icons/location-orange.svg'
import LocationIcon from '@/assets/img/icons/location3.svg'
import { useBreakpoints } from '@/composables/useBreakpoints'
import BackIcon from '@/components/icons/BackIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import FilterIcon from '@/components/icons/FilterIcon.vue'
import SkeletonApp from '@/components/shared/SkeletonApp.vue'
import { useFetch } from '@/composables/useFetch'

const { data: restaurants, isLoading, error, fetch } = useFetch(getRestaurants)

onMounted(async () => {
  fetch()
})

const { isMobile } = useBreakpoints()

const isOpenFilter = ref(false)

const emit = defineEmits(['openLocation'])
</script>
<template>
  <div class="restaurants">
    <div class="restaurants__container">
      <div v-if="isMobile" class="restaurants-mob-head">
        <button @click="emit('openLocation')" class="restaurants-mob-head__address">
          <img :src="LocationIcon" alt="" />
          Обрати адресу
        </button>
        <button @click="isOpenFilter = true" class="restaurants-mob-head__btn">
          <FilterIcon />
        </button>
      </div>
      <Transition name="filter">
        <div v-if="isMobile && isOpenFilter" class="restaurants-filter">
          <div class="restaurants-filter__head">
            <button @click="isOpenFilter = false" class="restaurants-filter__btn">
              <BackIcon />
            </button>
            <div class="restaurants-filter__title">Фільтр</div>
            <button class="restaurants-filter__btn">
              <SearchIcon />
            </button>
          </div>
          <ul class="restaurants-filter__list">
            <li class="restaurants-filter__item"><span>🍕</span>Піцца</li>
            <li class="restaurants-filter__item"><span>🇬🇪</span>Грузинська</li>
            <li class="restaurants-filter__item"><span>🇮🇹</span>Італійська</li>
            <li class="restaurants-filter__item"><span>🇪🇺</span>Європейська</li>
            <li class="restaurants-filter__item"><span>🇯🇵</span>Японська</li>
            <li class="restaurants-filter__item"><span>🍝</span>Паста</li>
            <li class="restaurants-filter__item"><span>🍣</span>Суші</li>
            <li class="restaurants-filter__item"><span>🍔</span>Бургери</li>
            <li class="restaurants-filter__item"><span>🌯</span>Шаурма</li>
            <li class="restaurants-filter__item"><span>🍟</span>Фаст-фуд</li>
            <li class="restaurants-filter__item"><span>🐟</span>Риба</li>
            <li class="restaurants-filter__item"><span>🥦</span>Веган</li>
          </ul>
        </div>
      </Transition>
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
          <button v-if="!isMobile" class="restaurants__sort-btn">
            <SortIcon />
          </button>
        </div>
        <SkeletonApp v-if="isLoading" :type-skeleton="'restaurant'" />
        <div v-if="restaurants" class="restaurants__grid-layout">
          <RouterLink
            :to="{
              name: 'restaurant',
              params: { id: restaurant.id },
              query: { is_catalog: restaurant.is_catalog }
            }"
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
              <p v-if="restaurant.address">
                <img :src="LocationIconOrange" alt="" /> {{ restaurant.address }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
