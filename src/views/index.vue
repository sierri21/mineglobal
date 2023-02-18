<template>
  <main :key="device">
    <intro />
    <component
      :is="device ? PrinciplesSlider : Fund "
      :key="device"
    />
    <!--    <fund v-if="device" />-->
    <!--    <principles-slider v-else />-->
    <outcomes />
    <ledger />
    <about />
  </main>
</template>

<script setup>
import {inject, onMounted } from 'vue'

import Intro from '@/sections/intro.vue'
import Fund from '@/sections/fund.vue'
import PrinciplesSlider from '@/sections/principlesSlider.vue'
import Outcomes from '@/sections/outcomes.vue'
import Ledger from '@/sections/ledger.vue'
import About from '@/sections/about.vue'



const device = inject('device')



onMounted( () => {

	const intersectionObserver = new IntersectionObserver(observerCallBack, bottomOptions())
	document.querySelectorAll('.animated-bottom').forEach((el) => {
		intersectionObserver.observe(el)
	})

})

function bottomOptions () {
	return {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	}
}

function observerCallBack (entries) {
	entries.forEach((entry) => {
		const target = entry.target
		if (entry.isIntersecting) {
			target.classList.add('active')
		}
	})
}
</script>
<style lang="scss">
@import "../assets/style/vars";
@keyframes change-opacity {
  from {
    opacity: 1;
    display: block;
  }
  to {
    opacity: 0;
    display: none;
  }
}
@keyframes change-opacity1 {
  from {
    opacity: 0;
    display: block;
  }
  to {
    opacity: 1;
    display: none;
  }
}

</style>
