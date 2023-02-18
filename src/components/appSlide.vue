<template>
  <div class="slide">
    <slot name="title" />
    <div class="slide__image">
      <slot name="img" />
    </div>
    <div class="slide__content">
      <slot name="title" />
      <p
        class="slide__text text"
        v-html="props.text"
      />
    </div>
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
	},
	src: {
		type: String,
		default: ''
	}
})
</script>

<style lang="scss">
  .slide {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: calc(510px + 15px + 560px);
    padding-bottom: 180px;
    margin: 0 auto;
    grid-gap: 15px;
    height: 100%;
    @media screen and (max-width: 576px) {
      max-width: 300px;
      overflow: hidden;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 24px 24px 25px;
      background: #FFFFFF;
      border-radius: 8px;
      justify-content: flex-start;
      height: auto;
    }
    .h1 {
      display: none;
      @media screen and (max-width: 576px) {
        display: block;
      }
    }
    &__content {
      flex-basis: 580px;
      flex-grow: 1;
      flex-shrink: 0;
      .h1 {
        display: block;
        @media screen and (max-width: 576px) {
          .h1 {
            display: none;
          }
        }
      }
      @media screen and (max-width: 576px) {
        flex-basis: unset;
        .h1 {
          display: none;
        }
      }
    }
    &__image {
      flex-shrink: 1;
      flex-grow: 0;
      @media screen and (max-width: 576px) {
        text-align: left;
        img {
          max-width: 180px;
          object-fit: cover;
        }
      }
      img {
        object-fit: contain;
        @media screen and (max-width: 576px) {
          max-width: 180px;
          object-fit: cover;
        }
      }
    }
    &__title-mobile {
      display: none;
      @media screen and (max-width: 576px) {
        display: block;
      }
    }
    &__title {
      max-width: 500px;
      margin-bottom: 38px;

    }
    &__text, &__text p {
      margin-top: 38px;
    }
    &__text {
      @media screen and (max-width: 576px) {
        margin-top: 0;
      }
    }
  }
</style>
