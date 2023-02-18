<template>
  <footer class="footer">
    <div class="footer__logo">
      <img
        src="/images/mineGlobal-logo.svg"
        alt="logo footer"
      >
    </div>
    <nav class="footer__nav nav">
      <div class="nav__column nav__column_links">
        <div class="nav__heading">
          {{ links[0].title }}
        </div>
        <ul class="nav__list">
          <li
            v-for="(link, idx) in links[0].links"
            :key="idx"
            class="nav__item"
          >
            <a
              :href="`#${link.id}`"
              class="nav__link"
              @click.prevent="scrollIntoView(link.id)"
            >
              {{ link.name }}
            </a>
            <font
              v-if="idx !== 3"
              style="color: #C3D5F0; margin-left: 5px"
            >
              |
            </font>
          </li>
        </ul>
      </div>
      <div class="nav__column nav__column_legal">
        <div class="nav__heading">
          {{ links[1].title }}
        </div>
        <ul class="nav__list">
          <li
            v-for="link in links[1].links"
            :key="link.name"
            class="nav__item"
          >
            <a
              :href="link.link"
              class="nav__link"
              target="_blank"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </div>
      <div class="nav__column nav__column_banking">
        <div class="nav__heading">
          {{ links[2].title }}
        </div>
        <ul class="nav__list">
          <li
            v-for="link in links[2].links"
            :key="link"
            class="nav__item"
          >
            <span class="nav__link">
              {{ link }}
            </span>
          </li>
        </ul>
      </div>
      <div class="nav__column nav__column_locales">
        <div class="nav__heading">
          {{ $t('footer.lang.title') }}
        </div>
        <ul class="nav__list">
          <li
            class="nav__item"
            @click="setLocale('en')"
          >
            <span class="nav__link">{{ $t('footer.lang.links.en') }}</span>
          </li>
          <font style="color: #C3D5F0; margin: 0 5px">
            |
          </font>
          <li
            class="nav__item"
            @click="setLocale('et')"
          >
            <span class="nav__link">{{ $t('footer.lang.links.et') }}</span>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const links = ref([
	{
		title: t('footer.company.title'),
		links: [
			{name: t('footer.company.links.fund'), id: 'fund'},
			{name: t('footer.company.links.outcomes'), id: 'outcomes'},
			{name: t('footer.company.links.features'), id: 'features'},
			{name: t('footer.company.links.contact'), id: 'contact'},
		]
	},
	{
		title: t('footer.legal.title'),
		links: [
			{name: t('footer.legal.links.authorization'), link: 'https://www.fi.ee/en/guides/fund-management-companies/investment-market/small-fund-managers-without-activity-licence/mineglobal-ou'},
			{name: t('footer.legal.links.privacy'), link: '/legal/Privacy policy.pdf'}
		]
	},
	{
		title: t('footer.banking.title'),
		links: [
			t('footer.banking.links.beneficiary'),
			t('footer.banking.links.account'),
			t('footer.banking.links.swift'),
			t('footer.banking.links.bank'),
			t('footer.banking.links.address')
		]
	},
	{
		title: 'CHANGE LANGUAGE',
		links: [
			'Русский',
			'Estonian'
		]
	}
])
function scrollIntoView(id) {
	document.getElementById(id).scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	})
}
function setLocale(localeValue) {
	localStorage.setItem('defaultLocale', localeValue)
	locale.value = localeValue
	this.scrollIntoView('header')
}
</script>

<style lang="scss" scoped>

.footer {
  margin-top: auto;
  margin-bottom: 0;
  padding: 32px 0 48px;
  &__logo {
    margin-bottom: 50px;
    @media screen and (max-width: 576px) {
      margin-bottom: 28px;
      width: 137px;
      img {
        width: 100%;
      }
    }
  }
}
.nav {
  display: flex;
  flex-wrap: nowrap;
  grid-gap: 81px;
  justify-content: space-between;
  @media screen and (max-width: 576px) {
    flex-direction: column;
    padding-left: 25px;
    grid-gap: 16px;
  }
  &__list {

  }
  &__column {
    flex: 0 0 235px;
    @media screen and (max-width: 576px) {
      flex-basis: auto;
      &_links {
        .nav__list {
          display: flex;
          flex-wrap: wrap;
          grid-gap: 6px;
        }
      }
    }
    &_legal {
      .nav__link {
        text-decoration: underline;
        @media screen and (max-width: 576px) {
          display: flex;
          flex-wrap: wrap;
          grid-gap: 6px;
        }
        &::after {
          display: inline-block;
          width: 11px;
          height: 12px;
          content: '';
          margin-left: 6px;
          background-image: url("/images/footer-link-icon.svg");
          background-size: cover ;
          @media screen and (max-width: 576px) {
            content: '';
            background-image: none;
          }
        }
      }
    }
    &_banking {
      flex-basis: 327px;
      @media screen and (max-width: 576px) {
        max-width: 264px;
        flex-basis: auto;
      }
      .nav__item {
        margin-bottom: 0 ;
      }
    }
    &_locales {
      .nav__link {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      font {
        display: none;
        @media screen and (max-width: 576px) {
          display: inline;
        }
      }
    }
  }
  &__heading {
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #C3D5F0;
    margin-bottom: 16px;
    @media screen and (max-width: 576px) {
      font-size: 11px;
      line-height: 200%;
      letter-spacing: 0.2em;
      margin-bottom: 4px;
    }
  }
  &__item {
    margin-bottom: 16px;
    @media screen and (max-width: 576px) {
      margin-bottom: 0;
      display: inline-flex;
      align-items: center;
    }
    font {
      display: none;
      @media screen and (max-width: 576px) {
        display: block;
      }
    }

  }
  &__link {
    display: inline-block;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 160%;
    color: #C3D5F0;
    text-decoration: none;
    @media screen and (max-width: 576px) {
      font-weight: 300;
      font-size: 13px;
      line-height: 200%;
    }
  }
}
</style>
