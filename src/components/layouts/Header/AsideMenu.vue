<script setup>
import CorrectIcon from '@/components/icons/CorrectIcon.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import CompanyLogo from '@/assets/img/company.png'
import LocationIcon from '@/assets/img/icons/location3.svg'
import PhoneIcon from '@/assets/img/icons/phone2.svg'
import TimeIcon from '@/assets/img/icons/time.svg'
import MessageIcon from '@/assets/img/icons/message.svg'

const emit = defineEmits(['closeMenu', 'openPopupLocation'])
</script>

<template>
  <div class="header__aside aside">
    <div class="aside__wrap">
      <button @click="emit('closeMenu')" class="aside__close">
        <CloseIcon />
      </button>
      <div class="aside__company">
        <img :src="CompanyLogo" alt="" />
        <p>
          Mafia ( Вадима <br />
          Гетьмана, 6 )
        </p>
      </div>
      <div @click="emit('openPopupLocation')" class="aside__address">
        <p>Моя адреса</p>
        <CorrectIcon />
      </div>
      <div class="aside__contacts">
        <div class="aside__contacts__title">Контакти</div>
        <ul class="aside__contacts-list">
          <li>
            <span class="aside__contacts-icon"> <img :src="PhoneIcon" alt="" /></span>
            <p><a href="tel:0660670158">066 067 01 58</a></p>
          </li>
          <li>
            <span class="aside__contacts-icon"> <img :src="LocationIcon" alt="" /></span>
            <p>Київ, вул. Вадима Гетьмана, 6, ТРЦ "COSMO MULTIMALL"</p>
          </li>
          <li>
            <span class="aside__contacts-icon"> <img :src="TimeIcon" alt="" /></span>
            <p>11:30 - 23:00</p>
          </li>
          <li>
            <span class="aside__contacts-icon"> <img :src="MessageIcon" alt="" /></span>
            <p><a href="">Телеграм/Вайбер</a></p>
          </li>
        </ul>
      </div>
      <div class="aside__socials">
        <h4 class="aside__socials-title">Соцмережі</h4>
        <ul class="aside__socials-list">
          <li>
            <a href="">
              <span class="aside__socials-icon"> <FacebookIcon /></span>
              <span>Фейсбук</span></a
            >
          </li>
          <li>
            <a href="">
              <span class="aside__socials-icon"> <InstagramIcon /></span>
              <span>Інстаграм</span></a
            >
          </li>
          <li>
            <a href="">
              <span class="aside__socials-icon"> <YoutubeIcon /></span>
              <span>Ютуб</span></a
            >
          </li>
          <li>
            <a href="">
              <span class="aside__socials-icon"> <TiktokIcon /></span>
              <span>ТікТок</span></a
            >
          </li>
        </ul>
      </div>
      <RouterLink @click="emit('closeMenu')" :to="{ name: 'policy' }" class="aside__politik">
        Політика конфіденційності <br />
        та публічна оферта
      </RouterLink>
    </div>
    <div @click="emit('closeMenu')" class="aside__overlay"></div>
  </div>
</template>
