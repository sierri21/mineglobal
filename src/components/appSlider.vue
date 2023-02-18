<template>
  <swiper
    :modules="modules"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :navigation="navigation"
    :pagination="pagination"
    :bullet-class="'bullet'"
    :loop="loop"
    :width="width"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <slot />
  </swiper>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
	name: 'AppSlider',
	components: {
		// eslint-disable-next-line vue/no-unused-components
		SwiperSlide,
		Swiper
	},
	props: {
		loop: {
			type: Boolean,
			default: false
		},
		pagination: {
			type: Boolean,
			default: false
		},
		navigation: {
			type: Boolean,
			default: false
		},
		spaceBetween: {
			type: Number,
			default: 0
		},
		width: {
			type: Number,
			default: null
		},
		slidesPerView: {
			type: String || Number,
			default: 'auto'
		}
	},
	setup () {
		// eslint-disable-next-line no-unused-vars
		const onSwiper = (swiper) => {
		}
		const onSlideChange = () => {
		}
		return {
			onSwiper,
			onSlideChange,
			modules: [Pagination, Navigation],
		}
	}
}
</script>

<style lang="scss">
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  margin: 0 calc(35px / 2)!important;
}
.swiper-pagination {
  bottom: -180px!important;
}
.swiper-slide {
  height: 537px;
  @media screen and (max-width: 576px) {
    height: auto;
  }
}
.swiper-pagination-bullet-active {
  background: #131839;
}
.swiper-button-prev, .swiper-button-next {
  color: #D7DEE4;
  width: 42.21px;
  height: 84.42px;
  &::after {
    font-size: 42px;
  }
}
.swiper {
  overflow: visible;
}

</style>