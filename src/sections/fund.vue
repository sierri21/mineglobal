<template>
  <div
    id="fund"
    class="principles animation-delay animated-bottom jump"
  >
    <app-card
      v-for="item in principles"
      :key="item.gridRow"
      :title="$t(`sections.principles.${item.id}.title`)"
      :text="$t(`sections.principles.${item.id}.text`)"
      class="principles__item"
      :style="{
        gridRow: 'span ' + item.gridRow,
        gridColumn: item.gridCol
      }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppCard from '@/components/appCard.vue'

const principles = ref([
	{ id: 1, gridRow: 3, gridCol: 1},
	{ id: 2, gridRow: 2, gridCol: 2},
	{ id: 3, gridRow: 3, gridCol: 3},
	{ id: 4, gridRow: 2, gridCol: 2},
	{ id: 5, gridRow: 1, gridCol: 1},
	{ id: 6, gridRow: 1, gridCol: 3}
])

</script>

<style scoped lang="scss">
.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 130px);
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  grid-row-gap: 38px;
  grid-column-gap: 32px;
  padding-bottom: 130px;
  padding-top: 30px;
  @media screen and (max-width: 576px) {
    display: none;
  }
  ::v-deep &__item {
    flex: 0 0 290px;
    max-height: 475px;
  }
}

</style>
