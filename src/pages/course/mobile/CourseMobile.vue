<script setup lang="ts">
import dayjs from "dayjs";
import {computed, nextTick, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "../../../store/store";

import TopToolBar from "../../../components/common/top-tool-bar/TopToolBar.vue";
import CourseBox from "../../../components/course/CourseBox.vue";
import WeekTab from "../../../components/common/user-input/WeekTab.vue";
import WhatDayTab from "../../../components/common/user-input/WhatDayTab.vue";
import DatePickerForWeekAndWhatDay from "../../../components/common/user-input/DatePickerForWeekAndWhatDay.vue";
import {filters} from "../../../assets/ts/api/filters";
import {Course} from "../../../assets/ts/api";
import {getIsoWeekDay} from "../../../assets/ts/datetimeUtils";

const route = useRoute();
const store = useStore();

const semester = route.query.semester ?? -1;

const week = ref<number>(1);
const whatDay = ref<number>(1);
const date = computed<dayjs.Dayjs>(() => store.getDateForGivenWeekAndWhatDay(week.value, whatDay.value));

const teacherName = computed(() => store.filterOptions.teacher);
const lessonName = computed(() => store.filterOptions.lesson);

const coursesFilteredByFilterConfig = computed<Course[]>(() => store.apiData.courses
    .filter(filters.course.byGroupIds(store.filterOptions.groups.map(group => group.group_id)))
    .filter(filters.course.byRoomIds(store.filterOptions.rooms.map(room => room.room_id)))
    .filter(filters.course.byMethods(store.filterOptions.methods))
    .filter(filters.course.byTeacherName(teacherName.value))
    .filter(filters.course.byLessonName(lessonName.value)));

const filteredCoursesInThisDay = computed<Course[]>(() => coursesFilteredByFilterConfig.value.filter(filters.course.byDate(date.value)));

onMounted(() => {
  nextTick(() => {
    week.value = store.getWeekNumOfSomeDay(dayjs());
    whatDay.value = getIsoWeekDay(dayjs());
  });
});
</script>

<template>
  <top-tool-bar/>
  <week-tab v-model:week="week" :max-week="store.max_week"/>
  <what-day-tab v-model:what-day="whatDay"/>
  <date-picker-for-week-and-what-day v-model:week="week" v-model:what-day="whatDay" :date="date"/>

  <div class="course-box-container" v-for="whichLesson in 5" :key="`whichLesson${whichLesson}`">
    <course-box :courses="filteredCoursesInThisDay.filter(filters.course.byWhichLesson(whichLesson))"/>
  </div>
</template>

<style>
.course-box {
  margin-top: 10px;
}

.n-drawer .n-drawer-content .n-drawer-body-content-wrapper {
  padding: 16px 0;
}
</style>