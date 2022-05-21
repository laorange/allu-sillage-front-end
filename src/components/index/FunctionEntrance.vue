<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import constants from "../../assets/constants.json";

const {t} = useI18n({
  messages: {
    zh: {"gradeNameList": JSON.stringify(["空闲教室", "考试列表"]), "FunctionEntranceTitle": "拓展功能"},
    en: {"gradeNameList": JSON.stringify(["Classrooms", "Exams"]), "FunctionEntranceTitle": "Extensions"},
    fr: {"gradeNameList": JSON.stringify(["Salles de classe", "Examens"]), "FunctionEntranceTitle": "Extensions"},
  },
});

const svgList = ["./svg/classroom.svg", "./svg/exam.svg"];

const gradeNameList = computed(() => JSON.parse(t("gradeNameList")) as string[]);

const maxColumnNum = window.innerWidth < constants.THRESHOLD_WIDTH_OF_PC ? 4 : 8;

const columnNum = computed(() => svgList.length < maxColumnNum ? svgList.length : maxColumnNum);
</script>

<template>
  <n-divider :dashed="true">{{ t("FunctionEntranceTitle") }}</n-divider>

  <van-grid :column-num="columnNum" icon-size="50px" :clickable="true">
    <van-grid-item v-for="num in svgList.length" :key="`function-${num}`"
                   :icon="svgList[num-1]"
                   :text="gradeNameList[num-1]"/>
  </van-grid>
</template>

<style scoped>

</style>