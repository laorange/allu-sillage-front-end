<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import constants from "../../assets/constants.json";

const {t} = useI18n({
  messages: {
    zh: {
      FunctionEntranceTitle: "拓展功能",
      classrooms: "空闲教室",
      exams: "考试列表",
    },
    en: {
      FunctionEntranceTitle: "Extensions",
      classrooms: "Classrooms",
      exams: "Exams",
    },
    fr: {
      FunctionEntranceTitle: "Extensions",
      classrooms: "Salles de classe",
      exams: "Examens",
    },
  },
});


interface Entrance {
  text: string;
  icon: string;
  trigger?: () => any;
}

const entrances: Entrance[] = [
  {
    text: t("classrooms"),
    icon: "./svg/classroom.svg",
    trigger: () => window.open("http://new.siae.top/#/classroom"),
  },
  {
    text: t("exams"),
    icon: "./svg/exam.svg",
    trigger: () => window.open("http://new.siae.top/#/exam"),
  },
];

const maxColumnNum = window.innerWidth < constants.THRESHOLD_WIDTH_OF_PC ? 4 : 8;

const columnNum = computed(() => entrances.length < maxColumnNum ? entrances.length : maxColumnNum);
</script>

<template>
  <n-divider :dashed="true">{{ t("FunctionEntranceTitle") }}</n-divider>

  <van-grid :column-num="columnNum" icon-size="50px" :clickable="true">
    <van-grid-item v-for="(entrance, index) in entrances" :key="`function-${index}`"
                   :icon="entrance.icon"
                   :text="entrance.text"
                   @click="entrance.trigger"/>
  </van-grid>
</template>

<style scoped>

</style>