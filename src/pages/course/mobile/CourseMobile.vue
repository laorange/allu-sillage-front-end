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
import {useI18n} from "vue-i18n";

const route = useRoute();
const store = useStore();
const {locale} = useI18n();

const startAndEndTimeOfEachClass = {
  fr: [
    "08H00/09H35",
    "10H05/11H40",
    "13H30/15H05",
    "15H35/17H10",
    "18H30/20H05",
  ],
  en: [
    "08:00-09:35",
    "10:05-11:40",
    "13:30-15:05",
    "15:35-17:10",
    "18:30-20:05",
  ],
  zh: [
    "08:00~09:35",
    "10:05~11:40",
    "13:30~15:05",
    "15:35~17:10",
    "18:30~20:05",
  ],
};

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
    <n-divider>{{ startAndEndTimeOfEachClass[locale][whichLesson - 1] }}</n-divider>
    <course-box :courses="filteredCoursesInThisDay.filter(filters.course.byWhichLesson(whichLesson))"/>
  </div>
</template>

<style>
.n-drawer .n-drawer-content .n-drawer-body-content-wrapper {
  padding: 16px 0;
}

.n-divider:not(.n-divider--vertical) {
  margin-bottom: 0;
  margin-top: 10px;
  font-size: 12px;
}
</style>