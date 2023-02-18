<template>
  <div class="canvas__container">
    <canvas id="myChart" />
  </div>
</template>

<script setup>

import {inject, onMounted} from 'vue'
import {Chart, BarController, CategoryScale, LinearScale, BarElement} from 'chart.js'

Chart.register(BarController, CategoryScale, LinearScale, BarElement)

const CopyOfData = inject('actualData')

let ChartData

onMounted( async () => {
	const ctx = document.getElementById('myChart').getContext('2d')

	const gradient = ctx.createLinearGradient(350, 0, 350, 400)
	gradient.addColorStop(0, '#55D2FF')
	gradient.addColorStop(1, '#663CFC')

	fillData(gradient)

	new Chart(ctx, {
		type: 'bar',
		data: ChartData,
		options: {
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
						callback: (label) => {
							return label + '%'
						}
					}
				}
			}
		}
	})
})

const fillData = (gradient) => {
	const data = [...CopyOfData.value.sort((a, b) => b.id - a.id)]
	ChartData = {
		labels: getLabels(data),
		datasets: getDatasets(data, gradient)
	}
}

const getLabels = (data) => {
	return data.reduce((acc, el, idx) => {
		const date = dateStringFilter(el.date) + ' ' + el.date.split(' ').at(-1)
		if (idx === 0 ) return [...acc, '']
		return [
			...acc, acc.includes(date) ? '' : date
		]
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
  /*border: 1px solid red;*/
  @media screen and (max-width: 576px){
    width: 365px;
    height: 270px;
  }
}
</style>
