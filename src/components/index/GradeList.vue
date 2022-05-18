<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      'gradeNameList': JSON.stringify(["大一", "大二", "大三", "大四", "研一", "研二", "研三", "自定义"]),
      'GradeListTitle': "SIAE-课程管理系统"
    },
    en: {
      'gradeNameList': JSON.stringify(["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Master 1", "Master 2", "Master 3", "Others"]),
      'GradeListTitle': "SIAE Course Manager"
    },
    fr: {
      'gradeNameList': JSON.stringify(["Année 1", "Année 2", "Année 3", "Année 4", "Année 5", "Année 6", "Année 7", "Les autres"]),
      "GradeListTitle": "SIAE - Administrateur de cours"
    },
  }
});

const gradeNameList = computed(() => JSON.parse(t('gradeNameList')) as string[])

</script>

<template>
  <n-divider :dashed="true">{{ t("GradeListTitle") }}</n-divider>

  <van-grid :column-num="4" icon-size="50px" :clickable="true">
    <van-grid-item v-for="num in 8" :key="`grade-list-${num}`"
                   :icon="`./svg/timetable${num}.svg`"
                   :text="gradeNameList[num-1]"/>
  </van-grid>
</template>

<style scoped>

</style>