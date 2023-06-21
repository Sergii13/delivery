<script setup>
import LocationIcon from '@/assets/img/icons/location.svg'
import PhoneIcon from '@/assets/img/icons/phone.svg'
import CopyIcon from '@/assets/img/icons/copy.svg'
import LogoIcon from '@/assets/img/icons/logo-order.svg'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import MapImg from '@/assets/img/map.jpg'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue'
import TiktokIcon from '@/components/icons/TiktokIcon.vue'
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__column">
          <div class="footer__title">Контакти</div>
          <ul class="footer__info">
            <li>
              <img :src="LocationIcon" alt="" />
              <p>
                Київ, вул. Вадима Гетьмана, 6, <br />
                ТРЦ "COSMO MULTIMALL"
              </p>
            </li>
            <li>
              <img :src="PhoneIcon" alt="" />
              <p>
                <a href="tel:0660670158">066 067 01 58</a>
              </p>
            </li>
          </ul>
          <div class="footer__time">
            <h4>Робочий час</h4>
            <p>11:30 - 23:00</p>
          </div>
        </div>
        <div class="footer__column">
          <div class="footer__title">Соцмережі</div>
          <ul class="footer__socials">
            <li>
              <a href="">
                <span class="footer__socials-icon"><FacebookIcon /></span>
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="">
                <span class="footer__socials-icon"> <InstagramIcon /></span>
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="">
                <span class="footer__socials-icon"> <YoutubeIcon /></span>
                <span> Youtube</span>
              </a>
            </li>
            <li>
              <a href="">
                <span class="footer__socials-icon"> <TiktokIcon /></span>
                <span>TikTok</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer__column">
          <div class="footer__title">Розташування</div>
          <div class="footer__map">
            <img :src="MapImg" alt="" />
          </div>
        </div>
      </div>
      <div class="footer__copy"><img :src="CopyIcon" alt="" /> 2023 Mimosa Restaurant</div>
      <a href="" class="footer__link">
        <img :src="LogoIcon" alt="" />
      </a>
    </div>
  </footer>
</template>
