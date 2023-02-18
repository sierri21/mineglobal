<template>
  <div class="canvas__container">
    <div class="periods-selector">
      <button
        v-for="button in periodsButtons"
        :key="button"
        class="periods-selector__button"
        :class="{'periods-selector__button_active': activePeriod === button}"
        :data-period-value="button"
      >
        {{ button }}
      </button>
    </div>
    <canvas id="myChart" />
  </div>
</template>

<script setup>

import {inject, onDeactivated, onMounted, ref} from 'vue'
import {BarController, BarElement, CategoryScale, Chart, LinearScale} from 'chart.js'

Chart.register(BarController, CategoryScale, LinearScale, BarElement)

const CopyOfData = inject('actualData')
const options = {
	layout: {
		padding: {
			left: 10,
			right: window.innerWidth < 576 ? 20 : 0
		}
	},
	maintainAspectRatio: false,
	responsive: true,
	legend: {
		display: false
	},
	// animation: {
	// 	duration: 0
	// },
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
				callback: (label) => {
					return label + '%'
				}
			}
		}
	},
	transitions: {
		duration: 1000,
		show: {
			animations: {
				x: {
					from: 0
				},
				y: {
					from: 0
				}
			}
		},
		hide: {
			animations: {
				x: {
					to: 0
				},
				y: {
					to: 0
				}
			}
		}
	}
}

let ChartData

const periodsButtons = ['1M', '6M', 'YTD', 'All']

const activePeriod = ref(periodsButtons[3])

let chart

onMounted( async () => {
	const ctx = document.getElementById('myChart').getContext('2d')

	const gradient = ctx.createLinearGradient(350, 0, 350, 400)
	gradient.addColorStop(0, '#55D2FF')
	gradient.addColorStop(1, '#663CFC')

	fillData(gradient)

	chart = new Chart(ctx, {
		type: 'bar',
		data: ChartData,
		options
	})

	document.querySelectorAll('.periods-selector__button').forEach(el => {
		el.onclick = ({target}) => {
			activePeriod.value = target.dataset.periodValue
			fillData(gradient)
			chart.data = ChartData
			chart.update()
		}
	})
})

onDeactivated(() => {
	chart.destroy()
})

const fillData = (gradient) => {
	const
		data = [...CopyOfData.value.sort((a, b) => b.id - a.id)],
		last = data.at(-1),
		first = {
			// '1M': data.find(el => dateStringFilter(el.date) === dateStringFilter(last.date)).id,
			'1M': data.at(-4).id,
			'6M': data.at(-1 * 4 * 6).id,
			'YTD': data.find(el => el.date.slice(-2) === last.date.slice(-2)).id,
			'All': data[0].id
		},
		device = window.innerWidth > 576 ? 'desktop' : 'mobile',
		labelsPerScreen = Math.round(data.length / (device === 'mobile' ?  3 :  8)),
		from = data.findIndex(el => el.id === first[activePeriod.value])

	ChartData = {
		labels: getLabels(data.slice(from), labelsPerScreen),
		datasets: getDatasets(data.slice(from), gradient)
	}
}

const getLabels = (data, labelsPerScreen) => {
	return data.reduce((acc, el, idx) => {
		const
			formattedDate = dateStringFilter(el.date) + ' ' + el.date.split(' ').at(-1),
			date = [
				...acc,
				formattedDate
			],
			emptyResult = [...acc, '']

		if (activePeriod.value === '1M') return [...acc, el.date.slice(0, el.date.length-3).split('—').at(-1)]
		if (acc.some(el => el === formattedDate)) return emptyResult
		if (idx === 0 || idx === data.length - 1 || idx % labelsPerScreen === 0) return date
		return emptyResult
	}, [])
}

const dateStringFilter = (str) => {
	const matches = str.match(/\s[A-Za-z]*/gi)
	return matches.length > 2 ? matches[1] : matches[0]
}

const getDatasets = (data, gradient) => {
	return [
		{
			data: data.map( el => parseFloat(el.amount)).splice(0, data.length),
			borderColor: 'transparent',
			backgroundColor: gradient,
			pointBorderColor: 'transparent',
			pointBackgroundColor: 'transparent',
			borderJoinStyle: 'round'
		}
	]
}

</script>

<style scoped lang="scss">
.canvas__container {
  position: relative;
  width: 100%;
  height: 400px;

  @media screen and (max-width: 576px){
    padding-top: 22px;
    width: 365px;
    height: 270px;
  }

  .periods-selector {
    position: absolute;
    top: -50px;
    right: 0;

    display: flex;
    grid-gap: 4px;

    padding: 5px 8px;

    background: #E4EBF2;
    border-radius: 8px;

    @media screen and (max-width: 576px) {
      top: -5px;
      left: 5px;
      right: unset;

      padding: 4px 8px;
    }

    &__button {
      padding: 4px 8px;

      font-family: 'IBM Plex Sans', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 125%;
      text-align: center;
      color: #131839;

      position: relative;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      z-index: 0;
      &:after {
        width: 0;
        display: block;
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        transform: translateX(-50%);
      }
      &_active::after {
        width: 100%;
        background: #FFFFFF;
        border-radius: 8px;
        transition: width .3s ease;
      }
    }
  }
}
</style>
