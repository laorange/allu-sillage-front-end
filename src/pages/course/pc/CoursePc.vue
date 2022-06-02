<script setup lang="ts">
import {useRoute} from "vue-router";
import {useStore} from "../../../store/store";
import ToolBar from "../../../components/common/top-tool-bar/TopToolBar.vue";
import {computed, provide, ref} from "vue";
import PcCourseTitle from "../../../components/course/pc/PcCourseTitle.vue";
import MainLine from "../../../components/course/pc/MainLine.vue";


const route = useRoute();
const store = useStore();

import {Classroom, Course, Group} from "../../../assets/ts/api";
import dayjs from "dayjs";
import {filters} from "../../../assets/ts/api/filters";

provide<number>("period", store.current_period);
provide<Group[]>("groups", store.apiData.groups);
provide<Classroom[]>("classrooms", store.apiData.classrooms);
provide<Course[]>("courses", store.apiData.courses);

const semester = route.query.semester ?? -1;

const week = ref<number>(1);
const whatDay = ref<number>(1);
const date = computed<dayjs.Dayjs>(() => store.getDateForGivenWeekAndWhatDay(week.value, whatDay.value));

const dateOfThisMonday = computed(() => store.getMondayDateOfSomeWeek(week.value));

const teacherName = computed(() => store.filterOptions.teacher);
const lessonName = computed(() => store.filterOptions.lesson);

const coursesFilteredByFilterConfig = computed<Course[]>(() => store.apiData.courses
    .filter(filters.course.byGroupIds(store.filterOptions.groups.map(group => group.group_id)))
    .filter(filters.course.byRoomIds(store.filterOptions.rooms.map(room => room.room_id)))
    .filter(filters.course.byMethods(store.filterOptions.methods))
    .filter(filters.course.byTeacherName(teacherName.value))
    .filter(filters.course.byLessonName(lessonName.value)));

const startAndBreakAndEndTimeList: { startTime: string, breakTime: string, endTime: string }[] = [
  {startTime: "8:00", breakTime: "8:45~8:50", endTime: "9:35"},
  {startTime: "10:05", breakTime: "10:50~10:55", endTime: "11:40"},
  {startTime: "13:30", breakTime: "14:15~14:20", endTime: "15:05"},
  {startTime: "15:35", breakTime: "16:20~16:25", endTime: "17:10"},
  {startTime: "18:30", breakTime: "19:15~19:20", endTime: "20:05"},
];
</script>

<template>
  <tool-bar></tool-bar>
  <pc-course-title :date-of-this-monday="dateOfThisMonday" :week="18" grade="2017"></pc-course-title>
  <template v-for="whichLesson in 5" :key="whichLesson">
    <main-line :date-of-this-monday="dateOfThisMonday"
               :courses="coursesFilteredByFilterConfig.filter(filters.course.byWhichLesson(whichLesson))"
               :start-time="startAndBreakAndEndTimeList[whichLesson-1].startTime"
               :break-time="startAndBreakAndEndTimeList[whichLesson-1].breakTime"
               :end-time="startAndBreakAndEndTimeList[whichLesson-1].endTime"/>
  </template>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0 auto;
}

div[class^="line-row"] {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid black;
  border-bottom: 0;
}

div.line-col {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid black;
  border-bottom: 0;
}

.date {
  border-bottom: .5px solid gray;
}

.date-time-cell {
  flex: 0 0 9%;
}

.day-cell {
  flex: 0 0 13%;
}
</style>