<template>
  <div class="line-chart">
    <div class="line-chart__controls __btn-container">
      <button
        v-for="(button, idx) in buttons"
        :key="button.name"
        class="line-chart__button"
        :style="{
          background: !button.isActive ? '#F2F5F8' : button.color,
          color: !button.isActive ? '#4C4C4C' : '#FFFFFF',
          border: !button.isActive ? '1px solid #CECEDD' : '',
          paddingTop: !button.isActive ? '6px' : '7px',
          paddingBottom: !button.isActive ? '6px' : '7px'
        }"
        :disabled="idx === 0"
        @click="button.isActive = !button.isActive"
      >
        <img
          v-if="button.isActive"
          src="/images/Subtract.svg"
          alt=""
        >
        <span>{{ button.name }}</span>
      </button>
    </div>
    <div class="canvas__container">
      <canvas
        id="myChart"
      />
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import { Chart, LinearScale, LineController, CategoryScale, LineElement, PointElement } from 'chart.js'
import {ref, onMounted, inject} from 'vue'
import {useI18n} from 'vue-i18n'

Chart.register(LinearScale, LineController, CategoryScale, LineElement, PointElement)

const { locale } = useI18n()

let CopyOfData

let chartData

const device = inject('device')

const buttons = ref([
	{name: 'Usaldusfond', class: 'fund', color: 'linear-gradient(86.27deg, #663CFC 0%, #55D2FF 99.91%) center center / 100% 100% no-repeat', isActive: true},
	{name: 'S&P 500', class: 'sp500', color: '#C97EA2', isActive: true},
	{name: 'ARKK', class: 'arkk', color: '#A0B4BF', isActive: true},
	{name: 'Gold', class: 'gold', color: '#DCA654', isActive: true},
])

const options = {
	layout: {
		padding: {
			left: 0,
			right: 20,
			top: !device ? 50 : 0
		}
	},
	elements: {
		line: {
			lineTension: 0.5,
			borderJoinStyle: 'round'
		}
	},
	maintainAspectRatio: false,
	responsive: true,
	legend: {
		display: false
	},
	animation: {
		duration: 0
	},
	scales: {
		xAxis: {
			padding: 0,
			grid: {
				display: false,
			},
			ticks: {
				maxRotation: 0, // наклон даты
				minRotation: 0, // наклон даты
				crossAlign: 'start',
				autoSkip: false,
				color: '#7C7C7C',
				fontSize: 18,
				align: 'center'
			}
		},
		yAxis: {
			display: true,
			beginAtZero: true,
			// height: 343,
			position: 'right',
			grid: {
				drawBorder: false,
			},
			ticks: {
				beginAtZero:true,
				padding: 10, // отступ относительно оси
				fontSize: 18,
				color: '#7C7C7C',
				// z: 999,
				callback: (label) => {
					return label + '%'
				}
			}
		}
	}
}

onMounted(async () => {
	const { data } = await import('./data.js')
	CopyOfData = data

	const ctx = document.getElementById('myChart').getContext('2d')

	const gradient = ctx.createLinearGradient(0, 0, 0, 400)
	gradient.addColorStop(0, '#55D2FF')
	gradient.addColorStop(1, '#663CFC')

	// Object.values(CopyOfData).forEach((arr, idx) => {
	// 	arr = arr.filter(el => Number.isInteger(el.y))
	// 	CopyOfData[idx] = arr
	// })

	fillData(gradient)

	const lineChart = new Chart(ctx, {
		type: 'line',
		data: chartData,
		options: options,
	})

	document.querySelectorAll('.line-chart__button').forEach((el, idx) => {
		el.onclick = () => {
			changeVisibility(idx, lineChart)
		}
	})

})

function fillData (gradient) {
	chartData = {
		labels: chartTicksFormatter(),
		datasets: Object.values(CopyOfData).map((el, idx) => {
			return {
				data: el.map(item => item.y || 0),
				borderColor: idx > 0 ? buttons.value[idx].color : gradient,
				backgroundColor: 'transparent',
				borderRadius: 3,
				lineTension: 0.8,
				pointBorderColor: 'transparent',
				pointBackgroundColor: 'transparent',
				borderWidth: idx > 0 ? 3 : 6
			}
		})
	}
}

function changeVisibility (idx, lineChart) {
	lineChart.data.datasets.forEach((el, i) => {
		if (i === idx) {
			if (el.borderColor === 'transparent') {
				el.borderColor = buttons.value[idx].color
			} else {
				el.borderColor = 'transparent'
			}
		}
	})
	lineChart.update()
}

function chartTicksFormatter () {
	const data = CopyOfData[0].reduce((acc, el) => ([...acc, el.x]), [])

	const dates = data.map(item => {

		const result = moment(new Date(item))

		return result.month() === 0
			? result.locale(locale.value).format('MMM\'YY')
			: result.locale(locale.value).format('MMM')[0].toUpperCase() + result.format('MMM').slice(1, 3)
	})

	return dates.reduce((acc, el) => (acc.includes(el) ? [...acc, ''] : [...acc, el]), [])

}

</script>

<style lang="scss" scoped>
  .line-chart {
    position: relative;
    height: 389px;
    width: 100%;
    &__controls {
      position: absolute;
      top: -4px;
      left: 0;
      display: flex;
      flex-wrap: nowrap;
      z-index: 50;
    }
    &__button {
      display: inline-flex;
      padding: 6px 13px;
      margin-right: 14px;
      border-radius: 20px;
      align-items: center;
      grid-gap: 6px;
      border: none;
      font-family: 'IBM Plex Sans', serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 150%;
      cursor: pointer;
      background-repeat: no-repeat;
    }
    &__chart {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 40;
      &-mobile {
        display: none;
      }
    }
  }
  .canvas__container {
    position: relative;
    width: 105%;
    height: 100%;
  }

  canvas#myChart {
    margin-top: 20px;
  }
  @media screen and (max-width: 576px) {
    .canvas__container {
      width: 365px;
      height: 270px;
    }
    .line-chart {
      margin-top: 20px;
      height: 325px;
      width: 343px;
      &__controls {
        position: static;
        top: 0;
        overflow: scroll;
        grid-gap: 8px;
        max-width: unset;
        height: 36px;
        flex-wrap: nowrap;
        padding: 0 18px;
        display: flex;
      }
      &__button {
        font-weight: 500;
        font-size: 13px;
        line-height: 150%;
        padding: 6px 13px;
        white-space: nowrap;
        margin-right: 0;
      }
      &__chart {
        display: none;
      }
      &__chart-mobile {
        display: block;
        position: absolute;
        top: 65px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 40;
      }
    }

    canvas#myChart {
      position: absolute;
      //margin-top: 20px;
      //margin-left: 10px;
      //margin-right: -15%;
    }
  }
</style>
