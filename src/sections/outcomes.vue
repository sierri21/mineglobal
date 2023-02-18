<template>
  <div
    id="outcomes"
    class="outcomes animated-bottom jump"
  >
    <h1
      class="h1 outcomes__heading"
      v-html="$t('sections.outcomes.heading')"
    />
    <p class="outcomes__text text">
      {{ $t('sections.outcomes.text') }}
    </p>
    <app-chart
      v-if="profitability.length"
      ref="chart"
      :key="isUserAuthorized"
      class="outcomes__chart"
      :is-user-authorized="isUserAuthorized"
      :mode-value="isUserAuthorized"
      :actual-data="profitability"
    />
    <div
      v-if="isUserAuthorized && profitability.length"
      class="outcomes__profitability profitability"
    >
      <h2 class="outcomes__aum">
        {{ $t('sections.outcomes.aum', {aum: profitability[0].aum }) }}
      </h2>
      <h2
        class="profitability__heading"
        v-html="$t('sections.outcomes.profitability.total', {percent: profitability[0].percent})"
      />
      <div class="profitability__table table">
        <div class="table__row table__row_head">
          <div class="table__cell table__cell_head">
            {{ $t('sections.outcomes.profitability.table-head.date') }}
          </div>
          <div class="table__cell table__cell_head">
            {{ $t('sections.outcomes.profitability.table-head.return') }}
          </div>
          <div class="table__cell table__cell_head">
            {{ $t('sections.outcomes.profitability.table-head.cap') }}
          </div>
        </div>
        <div class="table__data">
          <div
            v-for="row in reverseProfitability"
            :key="row.date"
            class="table__row"
          >
            <div class="table__cell">
              {{ row.date }}
            </div>
            <div class="table__cell">
              {{ row.amount }}%
            </div>
            <div class="table__cell">
              {{ row.cap }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!isUserAuthorized"
      id="auth"
      class="auth"
    >
      <p class="auth__text text">
        {{ $t('sections.outcomes.auth.text') }}
      </p>
      <form class="auth__form">
        <label
          class="auth__label"
          :class="{'notEmpty': password.length}"
          tabindex="0"
        >
          <input
            v-model="password"
            type="text"
            class="auth__input"
            required
            @focus="error = false"
          >
          <span
            class="auth__placeholder"
            tabindex="0"
          >{{ $t('sections.outcomes.auth.placeholder') }}</span>
        </label>
        <button
          type="submit"
          class="auth__button"
          @click.prevent="submitForm"
        >
          {{ $t('sections.outcomes.auth.submit') }}
        </button>
      </form>
      <div
        v-if="error"
        class="auth__error"
      >
        {{ $t('sections.outcomes.auth.error') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import AppChart from '@/components/appChart.vue'
import {ref, onMounted, provide, computed, onBeforeMount} from 'vue'

const chart = ref(null)

const password = ref('')

const profitability = ref([])

provide('actualData', profitability)

const error = ref(false)

const isUserAuthorized = ref(false)

const reverseProfitability = computed(() => {
	// eslint-disable-next-line vue/no-side-effects-in-computed-properties
	return [...profitability.value.sort((a, b) => a.id - b.id)]
})

function submitForm () {
	if (password.value === '5Your42Client245Key16') {
		localStorage.setItem('auth', '5Your42Client245Key16')
		isUserAuthorized.value = true
	} else {
		error.value = true
	}
}

onBeforeMount(async () => {
	const response = await fetch(
		'https://script.google.com/macros/s/AKfycbx9JxQtNfA9fsEHJBK912u3Tz5j3vqvlOHWYqvGuV6aYMLGmvpNv4LrD51eQvZOUGAdRQ/exec')

	const data = await response.json()
	profitability.value = data.result.map((el, idx) => {
		return {
			id: idx,
			date: el[0],
			amount: el[1].replace(/"/gi, ''),
			cap: el[2],
			aum: el[3],
			percent: el[4].replace(/"/gi, '')
		}
	})

})

onMounted( () => {
	if (localStorage.getItem('auth') === '5Your42Client245Key16') {
		isUserAuthorized.value = true
	}
})

</script>

<style scoped lang="scss">
.outcomes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 216px;
  padding-top: 30px;
  padding-bottom: 201px;
  @media screen and (max-width: 576px) {
    max-width: 343px;
    align-items: flex-start;
    margin-top: calc(175px - 20px);
    padding-top: calc(20px);
    padding-bottom: 92px;
  }
  &__heading {
    text-align: center;
    margin-bottom: 17px;
    line-height: 148%;
    @media screen and (max-width: 576px) {
      text-align: left;
      padding-left: 25px;
    }
  }
  &__text {
    max-width: 694px;
    text-align: center;
    margin-bottom: 44px;
    font-size: 18px;
    @media screen and (max-width: 576px) {
      max-width: 280px;
      text-align: left;
      padding-left: 25px;
    }
  }
  &__chart {
    margin-bottom: 14px;
    @media screen and (max-width: 576px) {
      max-width: 343px;
      overflow: hidden;
    }
  }
  &__aum {
    box-sizing: border-box;
    width: 826px;
    margin-bottom: 8px;
    text-align: left;
    font-family: 'IBM Plex Mono', monospace;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 36px;
    color: #131839;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
.profitability {
  max-width: calc(826px - 54px - 54px) ;
  width: 100%;
  background: #F2F5F8;
  box-shadow: 4px 4px 40px rgba(0, 17, 174, 0.08);
  border-radius: 10px;
  padding: 30px 54px 36px;
  @media screen and (max-width: 576px) {
    background: #F2F5F8;
    box-shadow: 4px 4px 40px rgba(0, 17, 174, 0.08);
    border-radius: 10px;
    width: 343px;
    padding-left: 25px;
    padding-right: 19px;
    box-sizing: border-box;
  }
  &__heading {
    font-family: 'IBM Plex Mono', monospace;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 36px;
    color: #131839;
    margin-bottom: 21px;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
.table {
  display: flex;
  flex-direction: column;
  font-family: 'IBM Plex Sans', serif;
  font-style: normal;
  font-weight: normal;
  @media screen and (max-width: 576px) {
    width: 343px;
  }
  &__data {
    max-height: 170px;
    overflow-y: scroll;

  }
  &__cell {
    flex-basis: 140px;
    text-align: right;
    font-size: 18px;
    line-height: 160%;
    color: #25306A;
    &:nth-of-type(1) {
      text-align: left;
      flex-basis: 170px;
    }
    &_head {
      font-size: 18px;
      line-height: 160%;
      color: #838AAF;
      &:nth-of-type(1) {
        text-align: left;
      }
    }
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 150%;
      &:nth-of-type(1) {
        flex-basis: 125px;
        margin-right: 5px;
      }
      &:nth-of-type(2) {
        flex-basis: 88px;
        margin-right: 10px;
      }
      &:nth-of-type(3) {
        flex-basis: 77px;
      }
    }
  }
  &__row {
    display: flex;
    grid-gap: 41px;
    margin-bottom: 4px;
    @media screen and (max-width: 576px) {
      grid-gap: 0;
    }
  }
}
.auth {
  padding-top: 42px;
  @media screen and (max-width: 576px) {
    max-width: 343px;
  }
  &__form {
    display: flex;
    grid-gap: 13px;
    @media screen and (max-width: 576px) {
      flex-direction: column;
    }
  }
  &__text {
    max-width: 432px;
    text-align: center;
    margin:0 auto 24px;
  }
  &__label {
    display: block;
    position: relative;
    width: 400px;
    height: 62px;
    box-sizing: border-box;
    overflow: hidden;
    border: none;
    background: #E4EBF2;
    border-radius: 4px;
    @media screen and (max-width: 576px) {
      width: 304px;
      height: 48px;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }
  &__error {
    padding-top: 6px;
    padding-left: 16px;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    display: flex;
    align-items: center;
    color: #FF3B3B;

  }
  &__button {
    width: 118px;
    background: linear-gradient(86.29deg, #663CFC 0%, #55D2FF 100%);
    border-radius: 4px;
    border: none;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 130%;
    text-align: center;
    text-transform: uppercase;
    color: #FFFFFF;
    cursor: pointer;
    @media screen and (max-width: 576px) {
      width: 304px;
      height: 48px;
      margin: 0 auto;
      font-size: 13px;
      line-height: 130%;
    }
    &:hover {
      background: #5736D6;
    }
  }
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 7px 8px 7px 16px;
    z-index: 10;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 130%;
    display: flex;
    align-items: center;
    color: #25306A;
    transition: all .3s linear;
    &:focus, &:valid {
      background: #FFFFFF;
    }
    @media screen and (max-width: 576px) {
      font-size: 14px;
    }
      &:focus {
      padding-top: 29px;
    }
    &:focus + .auth__placeholder {
      top: 0;
      padding-top: 7px;
      transform: translateY(0);
      font-weight: 500;
      font-size: 12px;
      line-height: 130%;
    }
  }
  &__placeholder {
    z-index: 20;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 16px;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 130%;
    display: flex;
    align-items: center;
    color: #25306A;
    transition: .3s ease;
    text-transform: capitalize;
    @media screen and (max-width: 576px) {
      font-size: 13px;
      line-height: 150%;
    }
  }
  &__label.notEmpty,
  &__label:focus+ {
    & .auth__placeholder,  {
      top: 0;
      padding-top: 7px;
      transform: translateY(0);
      font-weight: 500;
      font-size: 12px;
      line-height: 130%;
    }
    .auth__input {
      padding-top: 29px;
    }
  }
}
</style>
