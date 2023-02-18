<template>
  <div class="wrapper">
    <div class="container">
      <app-header :key="$i18n.locale" />
      <IndexPage
        :key="$i18n.locale"
        class="main"
      />
      <app-footer
        id="footer"
        :key="$i18n.locale"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted, provide, computed} from 'vue'

import  AppHeader from './components/appHeader.vue'
import AppFooter from './components/appFooter.vue'
import IndexPage from './views/index.vue'

const device = computed(() => {

	const isDev = window.innerWidth === document.body.clientWidth && window.innerHeight === document.body.clientHeight

	if (!isDev) {
		return window.innerWidth < 575
	}

	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
})

provide('device', device)


onMounted( () => {

	const preloader = document.querySelector('.preloader')

	if (window.scrollY > 0 && preloader) {
		preloader.remove()
	} else if (preloader) {
		document.body.style.overflow = 'hidden'
		setTimeout( () => {
			document.body.style.overflow = ''
			preloader.remove()
			sessionStorage.setItem('preloaderHasBeenShown', '1')
		}, 2000)
	}
})
</script>

<style lang="scss">
@import "assets/style/main";
#app {
  background-color: #E5E5E5;
}
.container {
  z-index: 50;
}
.wrapper {
  max-width: 100vw;
  width: 100%;
  overflow: hidden;
  z-index: -2;
  background:
      url('/images/background-rings.png') center 0 no-repeat,
      linear-gradient(41.86deg, #18141C 0%, #0C1D58 99.51%) 0 0 / 100% 1832px no-repeat,
      linear-gradient(54.98deg, #18141C 19.12%, #0C1D58 99.61%) bottom / 100% 451px no-repeat,
      #F2F5F8;

  }
@media screen and (max-width: 576px) {
  .wrapper {
    background:
        url('/images/background-rings-mobile.png') center 850px no-repeat,
        linear-gradient(41.86deg, #18141C 0%, #0C1D58 99.51%) 0 0 / 100% 1252px no-repeat,
        linear-gradient(54.98deg, #18141C 19.12%, #0C1D58 99.61%) bottom / 100% 555px no-repeat,
        #F2F5F8;
  }
}

</style>

