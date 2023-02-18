<template>
  <div class="card">
    <h2 class="card__heading">
      {{ props.title }}
    </h2>
    <p
      class="card__text"
      v-html="props.text"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	text: {
		type: String,
		default: ''
	}
})
</script>

<style scoped lang="scss">
  .card {
    padding: 32px 22px 40px 37px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(100px);
    border-radius: 16px;
    @-moz-document url-prefix() {
      background: rgba(21, 22, 43, .8);
    }
    @media screen and (max-width: 576px) {
      max-width: 260px;
      padding: 24px 19px 24px 25px;
      backdrop-filter: none;
      background: url('/images/card-background.png') center / cover;
    }
    &__heading {
      font-family: 'IBM Plex Mono', monospace;
      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 36px;
      color: #FFFFFF;
      margin-bottom: 25px;
      z-index: 10;
      @media screen and (max-width: 576px) {
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
      }
    }
    &__text {
      padding-right: 15px;
      font-family: 'IBM Plex Sans', serif;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 160%;
      color: #FFFFFF;
      z-index: 10;
      @media screen and (max-width: 576px) {
        font-size: 15px;
        line-height: 150%;
      }
    }
  }
</style>
