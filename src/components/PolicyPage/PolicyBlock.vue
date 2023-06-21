<script setup>
import BackIcon from '@/components/icons/BackIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div class="policy">
    <div class="policy__container">
      <div class="policy__head">
        <button @click="router.go(-1)" class="policy__back">
          <BackIcon />
        </button>
        <div class="policy__title">Політика конфіденційності та публічна оферта</div>
      </div>
      <div class="policy__wrap">
        <div class="policy__block">
          <p>
            At [Company Name], we are committed to protecting the privacy and security of our users'
            personal information. This Privacy Policy outlines how we collect, use, disclose, and
            protect the information you provide when using our food delivery service.
          </p>
        </div>
        <div class="policy__block">
          <p>Information We Collect</p>
          <p>
            1.1 Personal Information: When you create an account and use our food delivery service,
            we may collect personal information such as your name, email address, phone number,
            delivery address, and payment details. This information is necessary to process your
            orders and provide you with a seamless delivery experience.
          </p>
          <p>
            1.2 Usage Information: We may collect information about your interactions with our
            platform, including your orders, preferences, location data, device information, IP
            address, and browsing history. This information helps us improve our service,
            personalize your experience, and ensure the security of our platform.
          </p>
        </div>
        <div class="policy__block">
          <p>Use of Information</p>
          <p>
            2.1 Service Delivery: We use the collected information to process and deliver your food
            orders, communicate with you regarding your orders, and provide customer support.
          </p>
          <p>
            2.2 Personalization: We may use your information to personalize your experience,
            including suggesting relevant restaurants, recommending food options, and displaying
            tailored promotions or discounts.
          </p>
          <p>
            2.3 Improvements and Analytics: We analyze the collected data to improve our service,
            enhance the user interface, develop new features, conduct research, and perform
            statistical analysis.
          </p>
          <p>
            2.4 Marketing and Communication: With your consent, we may send you promotional offers,
            updates, newsletters, and other relevant communications. You can opt-out of these
            communications at any time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
