<template>
  <div class="image__wrapper">
    <img
      v-for="image in images"
      :key="image.src"
      :class="image.class"
      :src="image.src"
    >
    <img
      v-for="light in lights"
      :key="light"
      class="lights"
      :class="['light-' + light]"
      src="/images/introImage/lights.svg"
    >
    <img
      v-for="light in lights"
      :key="light"
      class="lights-right"
      :class="['light-' + light]"
      src="/images/introImage/lights.svg"
    >
  </div>
</template>

<script setup>
const lights = [1, 2, 3, 4, 5, 6, 7, 8]
const images = [
	{class: 'static', src: '/images/introImage/static.svg'},
	{class: 'platform', src: '/images/introImage/platform-top.svg'},
	{class: 'left-bottom', src: '/images/introImage/left-bottom.svg'},
	{class: 'left-middle', src: '/images/introImage/left-middle.svg'},
	{class: 'left-top', src: '/images/introImage/left-top.svg'},
	{class: 'right-top', src: '/images/introImage/right-top.svg'},
	{class: 'right-bottom', src: '/images/introImage/right-bottom.svg'},
	{class: 'main-image', src: '/images/introImage/main.svg'},
]
</script>

<style scoped lang="scss">
.image__wrapper {
  width: 600px;
  @media screen and (max-width: 576px) {
    width: 300px;
    transform: scale(0.6) translateX(50%);
  }
  img {
    position: absolute;
  }
  .static {
    top: 130px;
    right: -90px;
  }
  $animation-params: infinite linear 5s;
  .platform {
    top: 205px;
    right: 25px;
    animation: platform-animation-down-5 $animation-params;
  }
  .left-bottom {
    top: 140px;
    right: 463px;
    animation: platform-animation-down-10 $animation-params;
  }
  .left-middle {
    top: 130px;
    right: 463px;
    animation: platform-animation-down-15 $animation-params;
  }
  .left-top {
    top: 90px;
    right: 463px;
    animation: platform-animation-down-15 $animation-params;
  }
  .right-bottom {
    top: 50px;
    right: 388px;
    animation: platform-animation-down-20 $animation-params;
  }
  .right-top {
    top: 100px;
    right: 388px;
    animation: platform-animation-down-10 $animation-params;
  }
  .main-image {
    top: 75px;
    right: 195px;
    animation: platform-animation-up-5 $animation-params;
  }
  .lights {
    top: 146px;
    right: 148px;
    opacity: 0;
    animation: lights-animation infinite ease-in 2s;
  }
  .lights-right {
    top: 210px;
    right: 85px;
    opacity: 0;
    animation: lights-animation infinite ease-in 2s;
  }

  @for $i from 1 through 8 {
    .light-#{$i} {
      transform: translateY(-1 * 20px * $i) translateY(20px);
      animation-delay: ($i*0.1s);
    }
  }

  @each $i in 20, 15, 10, 5 {
    @keyframes platform-animation-down-#{$i} {
      50% {
        transform: translateY(-#{$i}px);
      }
    }
  }

  @keyframes platform-animation-up-5 {
    50% {
      transform: translateY(5px);
    }
  }

  @keyframes lights-animation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .3;
    }
    50% {
      opacity: 0;
    }
    65% {
      opacity: .3;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
