<script setup lang="ts">

import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {locale} = useI18n()

const gradeNameList = computed(() => {
  switch (locale.value) {
    case "zh":
      return ["大一", "大二", "大三", "大四", "研一", "研二", "研三", "自定义"]
    case "en":
      return ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Master 1", "Master 2", "Master 3", "Others"]
    case "fr":
      return ["Année 0", "Année 1", "Année 2", "S1S2", "S3S4", "S5S6", "S7S8", "Les autres"]
  }
});

</script>

<template>
  <van-grid :column-num="4" icon-size="50px" :clickable="true">
    <van-grid-item v-for="index in 8" :key="`grade-list-${index}`"
                   :icon="`./timetable/timetable${index}.svg`"
                   :text="gradeNameList[index-1]"/>
  </van-grid>
</template>

<style scoped>

</style>