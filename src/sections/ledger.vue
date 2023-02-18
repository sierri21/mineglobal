<template>
  <div
    id="features"
    class="ledger animated-bottom jump"
  >
    <app-slider
      :slides-per-view="'auto'"
      :space-between="16"
      :navigation="!device"
      :pagination="!device"
      :loop="true"
    >
      <swiper-slide
        v-for="idx in [1, 2, 3]"
        :key="idx"
      >
        <app-slide
          :text="$t(`sections.ledger.cards.${idx}.text`)"
        >
          <template #img>
            <img
              :src="'/images/slider-image' + idx + '.png'"
              alt=""
            >
          </template>
          <template #title>
            <h1 class="h1">
              {{ $t(`sections.ledger.cards.${idx}.title-start`) }}
              <span :class="`background-gradient-${idx}`">
                {{ $t(`sections.ledger.cards.${idx}.highlight`) }}
              </span>
              {{ $t(`sections.ledger.cards.${idx}.title-end`) }}
            </h1>
          </template>
        </app-slide>
      </swiper-slide>
    </app-slider>
  </div>
</template>
<script setup>

import { inject } from 'vue'
import AppSlider from '@/components/appSlider.vue'
import { SwiperSlide } from 'swiper/vue'
import AppSlide from '@/components/appSlide.vue'


const device = inject('device')

</script>

<style scoped lang="scss">
@import "@/assets/style/vars";

.background-gradient-1  {
  display: inline-block;
  position: relative;
  &::after {
   display: block;
   position: absolute;
   top: 0;
   left: 0;
   content: '';
   width: calc(100% + 30px);
   height: 85px;
   background: linear-gradient(99.5deg, rgba(255, 255, 255, 0) 39.75%, #CA4BFF 92.65%), radial-gradient(79.91% 883.46% at 4.96% 15%, #E3F8FF 0%, #C6BFFF 100%) no-repeat;
   box-shadow: inset -8px -8px 17px rgba(2, 0, 107, 0.15);
   border-radius: 800px;
   transform: rotate(2.53deg) translate(-20px, 0);
   z-index: -1;
  }
  @media screen and (max-width: 576px) {
    z-index: 500;
    &::after {
      //width: 176px;
      height: 45px;
    }
  }
}
.background-gradient-2 {
  display: inline-block;
  position: relative;
  &::after {
   display: block;
   position: absolute;
   top: 0;
   left: 0;
   content: '';
   width: calc(100% + 30px);
   height: 85px;
   z-index: -1;
   background: linear-gradient(99.5deg, rgba(255, 255, 255, 0) 39.75%, #4BBEFF 92.65%), radial-gradient(79.91% 883.46% at 4.96% 15%, #FFEAE3 0%, #BFFFFB 100%) no-repeat;
   box-shadow: inset -8px -8px 17px rgba(2, 0, 107, 0.15);
   border-radius: 800px;
   transform: rotate(-2deg) translateX(-13px) translateY(-3px);
 }
  @media screen and (max-width: 576px) {
    z-index: 500;
    &::after {
      height: 45px;
    }
  }
}
.background-gradient-3 {
  display: inline-block;
  position: relative;
  &::after {
   display: block;
   position: absolute;
   top: 0;
   left: 0;
   content: '';
   width: calc(100% + 30px);
   height: 85px;
   z-index: -1;
   background: radial-gradient(106.64% 1589.87% at 4.96% 15%, #E3F8FF 0%, #F56AF0 100%) no-repeat;
   box-shadow: inset -8px -8px 17px rgba(2, 0, 107, 0.15);
   border-radius: 800px;
   transform: rotate(-2.3deg) translateX(-10px);
 }
  @media screen and (max-width: 576px) {
    z-index: 500;
    &::after {
      //width: 213px;
      height: 45px;
    }
  }
}

.ledger {
  width: 100vw;
  background: #FFFFFF;
  margin: 0 calc(-1 * ((100vw - $container-width) / 2)) 168px;
  padding-top: 230px;
  padding-bottom: 258px;
  @media screen and (max-width: 576px) {
    z-index: 500;
    &::after {
      width: 213px;
      height: 45px;
    }
    max-width: 318px;
    margin: 0 auto 158px;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 0;
    padding-bottom: 0;
    background: transparent;
    &__image {
      text-align: left;
      img {
        max-width: 295px;
        object-fit: cover;
        text-align: center;
      }
    }
    &__text {
      max-width: 280px;
      margin-bottom: 0;
    }
    &__heading {
      display: none;
      &_mobile {
        display: block;
        max-width: 318px;
        margin: 0 auto;
      }
    }
  }

}
</style>
