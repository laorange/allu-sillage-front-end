<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {'gradeNameList': JSON.stringify(["大一", "大二", "大三", "大四", "研一", "研二", "研三", "自定义"])},
    en: {'gradeNameList': JSON.stringify(["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Master 1", "Master 2", "Master 3", "Others"])},
    fr: {'gradeNameList': JSON.stringify(["Année 1", "Année 2", "Année 3", "Année 4", "Année 5", "Année 6", "Année 7", "Les autres"])},
  }
})

const gradeNameList = computed(() => JSON.parse(t('gradeNameList')) as string[])

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