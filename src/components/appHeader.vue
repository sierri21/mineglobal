<template>
  <header
    id="header"
    class="header"
  >
    <div class="header__logo">
      <img
        src="/images/mineGlobal-logo.svg"
        alt="mineglobal logo"
      >
    </div>
    <div
      v-if="device"
      class="burger nav-click-elem"
      :class="{'open': burger}"
      @click="burger = !burger"
    >
      <span class="nav-click-elem" />
    </div>
    <transition name="slidedown">
      <nav
        v-if="burger || !device"
        class="header__nav nav nav-click-elem"
      >
        <ul class="nav__list nav-click-elem">
          <li
            v-for="link in links"
            :key="link"
            class="nav__item nav-click-elem"
          >
            <a
              :href="'#' + link.id"
              class="nav__link nav-click-elem"
              @click.prevent.stop="scrollIntoView(link.id, $event)"
            >
              {{ link.name }}
            </a>
          </li>
          <li class="nav__item nav__item_locale nav-click-elem">
            <span
              v-for="localization in locales"
              :key="localization.text"
              class="nav__link nav-click-elem"
              @click.stop="setLocale(localization.value)"
            >{{ localization.text }}</span>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import {ref, inject, onMounted} from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const burger = ref (false)

const device = inject('device')

const links = ref([
	{name: t('header.links.fund'), id: 'fund'},
	{name: t('header.links.outcomes'), id: 'outcomes'},
	{name: t('header.links.features'), id: 'features'},
	{name: t('header.links.contact'), id: 'contact'},
	{name: t('header.links.legal'), id:'footer'}
])

const locales = ref([
	{ text: 'English', value: 'en' },
	{ text: 'Estonian', value: 'et' },
])

onMounted(() => {
	window.addEventListener('click', clickHandler)
})

function clickHandler (e) {
	const condition = e.target.classList.contains('nav-click-elem')
	if (!condition && burger.value) {
		burger.value = false
	}
}

function scrollIntoView(id) {

	if (burger.value) burger.value = !burger.value

	const timeout = device.value ? 500 : 0

	setTimeout(() => {
		document.getElementById(id).scrollIntoView({
			behavior: 'smooth',
			block: window.innerHeight < 800 ? 'start' : 'center'
		})
	}, timeout)
}

function setLocale(localeValue) {
	burger.value = !burger.value

	setTimeout(() => {
		localStorage.setItem('defaultLocale', localeValue)
		locale.value = localeValue
	}, 500)

}
</script>
<style lang="scss" scoped>

  .slidedown-enter-active,
  .slidedown-leave-active {
    transition: max-height 0.5s linear;
  }

  .slidedown-enter-to,
  .slidedown-leave-from {
    overflow: hidden;
    max-height: 1000px;
  }

  .slidedown-enter-from,
  .slidedown-leave-to {
    overflow: hidden;
    max-height: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 132px 0 146px;
    @media screen and(max-width: 576px) {
      padding: 27px 27px 0 16px;
      background: transparent;
    }
    &__logo {
      @media screen and (max-width: 576px) {
        z-index: 700;
        img {
          width: 137px;
          height: 21px;
          object-fit: cover;
        }
      }
    }
  }
  .nav {
    @media screen and (max-width: 576px) {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 600;
      background: #0C1C55;
      border-radius: 0 0 16px 16px;
    }
    &__item_locale {
      display: none;
      @media screen and (max-width: 576px) {
        display: block;
        margin-top: 32px;
        & span:first-child, & span:last-child {
          text-decoration: underline;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 150%;
        }
        & span:first-child::after {
          content: '/';
          display: inline-block;
          text-decoration: none;
          margin: 0 5px ;
        }
      }
    }
    &__list {
      display: flex;
      flex-wrap: nowrap;
      grid-gap: 64px;
      @media screen and (max-width: 576px) {
        flex-direction: column;
        grid-gap: 16px;
        padding: 95px 0 48px 43px ;

      }
    }
    &__link {
      font-family: 'IBM Plex Sans', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 160%;
      color: #C3D5F0;
      text-decoration: none;
      @media screen and (max-width: 576px) {
        font-weight: 500;
        font-size: 16px;
      }
      &:hover {
        //border-bottom: 2px solid #C3D5F0;
        //opacity: .6;
        transition: .3s ease;
        text-decoration: underline;
      }
    }
  }
  .burger {
    width: 22px;
    height: 16px;
    position: relative;
    transition-duration: 1s;
    transform: translateY(3px);
    z-index: 750;
  }
  .burger span {
    height: 2px;
    width: 22px;
    background-color: #E5E5ED;
    border-radius: 20px;
    position: absolute;
    transition-duration: .25s;
    transition-delay: .25s;
    z-index: 750;
  }
  .burger span:before {
    left: 0;
    position: absolute;
    top: -7px;
    height: 2px;
    width: 22px;
    background-color: #E5E5ED;
    content: "";
    border-radius: 20px;
    transition-duration: .25s;
    transition: transform .25s, top .25s .25s;
    z-index: 750;
  }
  .burger span:after {
    left: 0;
    position: absolute;
    top: 7px;
    height: 2px;
    width: 22px;
    background-color: #E5E5ED;
    content: "";
    border-radius: 20px;
    transition-duration: .25s;
    transition: transform .25s, top .25s .25s;
  }
.burger.open span {
 transition-duration: 0.1s;
 transition-delay: .25s;
 background: transparent;
}
.burger.open span:before {
  transition: top .25s, transform .25s .25s;
  top: 0;
  transform: rotateZ(-45deg);
}
  .burger.open span:after {
    transition: top 0.4s, transform .25s .25s;
    top: 0;
    transform: rotateZ(45deg);
  }

</style>
