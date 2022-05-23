<script setup lang="ts">
import {Course} from "../assets/ts/api";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import dayjs from "dayjs";
import {formatDate} from "../assets/ts/datetimeUtils";

const props = withDefaults(defineProps<{ course: Course, displayDate?: boolean; }>(), {displayDate: false});
const {t, locale} = useI18n({
  messages: {
    zh: {
      method: {
        Course: "理论课",
        TD: "习题课",
        TP: "实验课",
        Exam: "考试",
      },
    },
    en: {
      method: {
        Course: "",
        TD: "TD",
        TP: "TP",
        Exam: "Exam",
      },
    },
    fr: {
      method: {
        Course: "",
        TD: "TD",
        TP: "TP",
        Exam: "Exam",
      },
    },
  },
});

const courseName = computed<string>(() => {
  let chName = props.course.ch_name ?? "Unknown Course";
  switch (locale.value) {
    case "en":
      // 优先级: en > fr > ch
      return props.course.en_name ? props.course.en_name : (props.course.fr_name ? props.course.fr_name : chName);
    case "fr":
      // 优先级: fr > en > ch
      return props.course.fr_name ? props.course.fr_name : (props.course.en_name ? props.course.en_name : chName);
    default:
      return chName;
  }
});

const methodAndTeacher = computed<string>(() => [t(`method.${props.course.method}`), props.course.teacher_name].filter(i => !!i).join("-"));
const groupsAndRoomName = computed<string>(() => [props.course.groups_name, props.course.room_name].filter(i => !!i).join("-"));
</script>

<template>
  <div class="course-card" :style="{backgroundColor: course.color}">
    <!--<div v-if="course.code">{{ course.code }}</div>-->
    <div>{{ courseName }}</div>
    <div v-if="displayDate">{{ formatDate(dayjs(course.date)) }}</div>
    <div v-if="methodAndTeacher"> {{ methodAndTeacher }}</div>
    <div v-if="groupsAndRoomName">{{ groupsAndRoomName }}</div>
    <div v-if="course.note">{{ course.note }}</div>
  </div>
</template>

<style scoped>
.course-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
</style>