<template>
  <div class="chart__wrapper">
    <div class="controls">
      <button
        class="controls__btn"
        :class="{'active': mode === 'historical'}"
        @click="changeMode('historical')"
      >
        {{ $t('sections.outcomes.chart.header.historical') }}
      </button>
      <button
        v-if="isUserAuthorized"
        class="controls__btn"
        :class="{'active': mode === 'actual'}"
        @click="changeMode('actual')"
      >
        {{ $t('sections.outcomes.chart.header.actual') }}
      </button>
      <a
        v-else
        href="#auth"
        class="controls__btn"
        @click="scrollIntoView"
      >
        {{ $t('sections.outcomes.chart.header.actual') }}
      </a>
    </div>
    <div>
      <line-chart
        v-if="mode === 'historical'"
        :key="mode"
        class="line-chart"
        :mode="mode"
      />
      <bar-chart v-else />
    </div>
  </div>
</template>

<script setup>
import LineChart from '@/components/lineChart.vue'
import BarChart from '@/components/barChart.vue'
import { ref, defineProps } from 'vue'

const props = defineProps({
	isUserAuthorized: {
		type: Boolean,
		default: false
	}
})
const mode =  ref(props.isUserAuthorized ? 'actual' : 'historical')
function scrollIntoView(e) {
	e.preventDefault()
	const blockID = e.target.getAttribute('href').substr(1)
	document.getElementById(blockID).scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	})
}
function changeMode(value) {
	mode.value = value
}
</script>

<style scoped lang="scss">
.chart__wrapper {
  width: calc(826px - 41px - 41px);
  //height: 498px;
  background: #F2F5F8;
  box-shadow: 4px 4px 40px rgba(0, 17, 174, 0.08);
  border-radius: 10px;
  padding: 24px 41px 42px;
  @media screen and (max-width: 576px){
    width: 343px;
    padding: 0;
    background: #F2F5F8;
    box-shadow: 4px 4px 40px rgba(0, 17, 174, 0.08);
    border-radius: 10px;
  }
}
.controls {
  margin-bottom: 14px;
  @media screen and (max-width: 576px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E5E5ED;
  }
  &__btn {
    border: none;
    margin-right: 22px;
    font-family: 'IBM Plex Sans', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #131839;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    @media screen and (max-width: 576px) {
      text-align: center;
      display: flex;
      align-items: center;
      padding-top: 0;
      padding-left: 12px;
      padding-bottom: 0;
      height: 35px;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 150%;
      color: #575D87;
      flex-basis: 50%;
      margin-right: 0;
      background: #E4EBF2;
    }
   &.active {
     background: #E4EBF2;
     border-radius: 8px;
     padding: 7px 12px 8px;
     @media screen and (max-width: 576px) {
       border-radius: 0;
       background: #F2F5F8;
       white-space: nowrap;
     }
   }
  }
}

</style>
