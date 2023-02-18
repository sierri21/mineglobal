<template>
  <div
    id="fund"
    class="principles-slider animated-bottom jump"
  >
    <app-slider
      :loop="true"
      :width="260"
      :space-between="-16"
    >
      <swiper-slide
        v-for="slide in principles"
        :key="slide.id"
      >
        <app-card
          :title="$t(`sections.principles.${slide.id}.title`)"
          :text="$t(`sections.principles.${slide.id}.text`)"
          class="principles-slider__item"
        />
      </swiper-slide>
    </app-slider>
  </div>
</template>

<script setup>
import AppCard from '@/components/appCard.vue'
import AppSlider from '@/components/appSlider.vue'
import { SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

const principles = ref([
	{ id: 1, gridRow: 3, gridCol: 1},
	{ id: 2, gridRow: 2, gridCol: 2},
	{ id: 3, gridRow: 3, gridCol: 3},
	{ id: 4, gridRow: 2, gridCol: 2},
])
</script>

<style scoped lang="scss">
.principles-slider {
  display: none;
  @media screen and (max-width: 576px) {
    display: block;
    &__item {
      height: auto;
      width: 260px;
    }
  }
}
</style>
