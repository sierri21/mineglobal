<template>
  <section>
    <div
      v-if="!preloaderShown"
      class="preloader"
    >
      <span class="preloader__text h1">
        {{ $t('sections.preloader.crypto') }}
      </span>
    </div>
    <div class="intro">
      <div class="intro__info">
        <h1 class="h1 intro__heading">
          {{ $t('sections.intro.heading', {timer: timer}) }}
        </h1>
        <p class="text intro__text">
          {{ $t('sections.intro.text') }}
        </p>
        <button
          class="intro__btn"
          @click="scrollIntoView('contact')"
        >
          <img
            src="/images/rhomb.svg"
            alt="rhomb"
          >
          {{ $t('sections.intro.button') }}
        </button>
      </div>
      <div class="intro__image">
        <app-intro-image />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AppIntroImage from '@/components/appIntroImage.vue'

const timer = ref(1)

const preloaderShown = computed(() => {
	return sessionStorage.getItem('preloaderHasBeenShown')
})

function scrollIntoView (blockId) {
	document.getElementById(blockId).scrollIntoView({
		behavior: 'smooth',
		block: window.innerHeight < 800 ? 'start' : 'center'
	})
}

onMounted(() => {
	setInterval( () => {
		timer.value++
	}, 1000)
})

</script>

<style lang="scss" scoped>
@import '@/assets/style/vars';
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
.preloader {
    & body {
      overflow: hidden;
    }
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding-top: 313px;
    padding-left: calc(((100vw - 1160px) / 2) + 180px);
    background: rgba(0, 0, 0, 1);
    z-index: 100;
    animation-name: change-opacity;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    &__text {
     color: #FFFFFF;
     position: absolute;
     z-index: 200;
      font-size: 60px;
     animation-name: change-opacity1;
     animation-duration: 1s;
     animation-timing-function: linear;
     animation-fill-mode: forwards;
    }
    @media screen and (max-width: 576px) {
      //width: calc(100vw - ((100vw - 343px) / 2 + 162px));
      padding-top: 350px;
      padding-left: calc((100vw - 343px) / 2 + 162px);
      &__text {
        font-size: 32px;
      }
    }
}
.intro {
  padding-bottom: calc(209px - 30px);
  position: relative;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 100px;
  }
  &__info {
    width: 566px;
    flex-grow: 0;
    flex-basis: 566px;
    @media screen and (max-width: 576px) {
      width: 100%;
      margin: 300px auto 0;
      flex-basis: auto;
    }
  }
  &__image {
    position: absolute;
    top: 65px;
    right: -13px;
    @media screen and (max-width: 576px) {
      position: static;
      text-align: center;
      margin: 0 auto;
    }
    img {
      max-width: 691px;
      object-fit: cover;
      transform: translateX(50px);
      @media screen and (max-width: 576px) {
        width: 431px;
        transform: translateX(calc((343px - 431px) / 2));
      }
    }
  }
  &__heading {
    margin-bottom: 27px;
    color: $color-white;
    font-size: 60px;
    @media screen and (max-width: 576px) {
      text-align: center;
      font-size: 32px;
    }
  }
  &__text {
    color: $color-lightblue;
    max-width: 432px;
    margin-bottom: 34px;
    font-size: 20px;
    @media screen and (max-width: 576px) {
      text-align: center;
      max-width: 293px;
      margin: 0 auto 18px;
      font-size: 16px;
    }
  }
  &__btn, &__btn:active {
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 55px;
    padding: 14px 17px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 18px;
    color: $color-white;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 160%;
    cursor: pointer;
    @media screen and (max-width: 576px) {
      width: 100%;
      padding: 12px 35px;
      font-size: 1rem;
      line-height: 150%;
      white-space: nowrap;
      grid-gap: 8px;
      background: transparent!important;
      border: 1px solid #FFFFFF!important;
    }
  }
  &__btn:hover {
    background: linear-gradient(86.29deg, #663CFC 0%, #55D2FF 100%) no-repeat;
    border-color: transparent;
    img {
      transform: rotate(90deg);
      transition: all .5s ease;
    }
  }
}

</style>
