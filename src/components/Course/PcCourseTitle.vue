<script setup lang="ts">
import {useI18n} from "vue-i18n";

defineProps<{ grade: string | number, week: number }>();

const {t} = useI18n({
  messages: {
    zh: {
      l1: "中欧航空工程师学院 GEA 天津",
      l2: "{grade}级第{week}周"
    },
    en: {
      l1: "Sino-European Institute of Aviation Engineering",
      l2: "{grade} - Week {week}"
    },
    fr: {
      l1: "Institut Sino-Européen d'Ingénierie de l'Aviation",
      l2: "{grade} - Week {week}"
    }
  }
});
</script>

<template>
  <div class="title-line">
    <div class="img"><img src="../../assets/images/GEA.png" alt="GEA"></div>
    <div style="flex: 1">
      <h2>{{ t('l1') }}</h2>
      <h3>{{ t('l2', {week: week, grade: grade}) }}</h3>
      <h2>Promotion SIAE 2017</h2>
    </div>
    <div class="img"><img  src="../../assets/images/CAUC.png" alt="CAUC"></div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0 auto;
}

.title-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
}


</style>