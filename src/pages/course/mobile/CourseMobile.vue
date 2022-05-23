<script setup lang="ts">
import dayjs from "dayjs";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "../../../store/store";

import TopToolBar from "../../../components/TopToolBar.vue";
import CourseBox from "../../../components/course/CourseBox.vue";
import WeekTab from "../../../components/course/WeekTab.vue";
import WhatDayTab from "../../../components/course/WhatDayTab.vue";
import DatePickerForWeekAndWhatDay from "../../../components/course/DatePickerForWeekAndWhatDay.vue";

const route = useRoute();
const store = useStore();

const semester = route.query.semester ?? -1;

const week = ref(0);
const whatDay = ref(0);
const date = ref<dayjs.Dayjs>(dayjs());
</script>

<template>
  <top-tool-bar/>
  <week-tab v-model:week="week" :max-week="store.max_week"/>
  <what-day-tab v-model:what-day="whatDay"/>
  <date-picker-for-week-and-what-day v-model:week="week" v-model:what-day="whatDay" v-model:date="date"/>

  <course-box :courses="[]"/>
  <template v-if="store.apiData.courses.length>300">
    <course-box :courses="[store.apiData.courses[150]]"/>
    <course-box :courses="[store.apiData.courses[150],store.apiData.courses[300]]"/>
    <course-box :courses="[store.apiData.courses[150],store.apiData.courses[200],store.apiData.courses[300]]"/>
    <course-box :courses="[store.apiData.courses[150],store.apiData.courses[200],store.apiData.courses[250],store.apiData.courses[300]]"/>
  </template>
</template>

<style scoped>
.course-box {
  margin-top: 10px;
}
</style>