<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Virtual } from 'swiper'
import BannerImg from '@/assets/img/banner.jpg'

import 'swiper/css'
import 'swiper/css/navigation'

const prevArrow = ref(null)
const nextArrow = ref(null)
</script>
<template>
  <div class="banner">
    <div class="banner__container">
      <div class="banner__slider">
        <swiper
          :modules="[Navigation, Virtual]"
          :slides-per-view="1"
          :space-between="50"
          :loop="true"
          :navigation="{
            prevEl: prevArrow,
            nextEl: nextArrow
          }"
        >
          <swiper-slide>
            <div class="banner__image">
              <img :src="BannerImg" alt="" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="banner__image">
              <img
                src="https://api.getorder.biz/pwa_bg/763096/image_id/18/1150/300/r1est_763096.webp?v=2023063015"
                alt=""
              />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="banner__image">
              <img
                src="https://api.getorder.biz/pwa_bg/763093/image_id/18/1150/300/r1est_763093.webp?v=2023063015"
                alt=""
              />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="banner__image">
              <img :src="BannerImg" alt="" />
            </div>
          </swiper-slide>
        </swiper>
        <div class="banner__arrows">
          <button ref="prevArrow" class="banner__arrow">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button ref="nextArrow" class="banner__arrow">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
