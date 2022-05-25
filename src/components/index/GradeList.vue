<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useStore} from "../../store/store";
import constants from "../../assets/constants.json";
import useSemesterOptions from "../../assets/ts/hooks/useSemesterOptions";
import {computed} from "vue";
import {LanguageOptions} from "../../assets/ts/types";

const router = useRouter();
const store = useStore();

const {getGradeNames} = useSemesterOptions();

const {t, locale} = useI18n({
  messages: {
    zh: {
      "GradeListTitle": "SIAE-课程管理系统",
      "filters": "过滤器设置",
    },
    en: {
      "GradeListTitle": "SIAE course Manager",
      "filters": "Filter options",
    },
    fr: {
      "GradeListTitle": "SIAE - Administrateur de cours",
      "filters": "Options du filtre",
    },
  },
});

const maxColumnNum = window.innerWidth < constants.THRESHOLD_WIDTH_OF_PC ? 4 : 8;

const gradeNameList = computed(() => getGradeNames(locale.value as LanguageOptions));
</script>

<template>
  <n-divider :dashed="true">{{ t("GradeListTitle") }}</n-divider>

  <van-grid :column-num="maxColumnNum" icon-size="50px" :clickable="true">
    <van-grid-item v-for="grade in 7" :key="`grade-list-${grade}`"
                   :icon="`./svg/timetable${grade}.svg`"
                   @click="router.push({name: 'course-pc', query:{semester: store.getSemesterOfGrade(grade)}})"
                   :text="gradeNameList[grade-1]"/>
    <van-grid-item :icon="`./svg/searchWithFilter.svg`"
                   :text="t('filters')"/>
  </van-grid>
</template>

<style scoped>

</style>