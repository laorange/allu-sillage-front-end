<script setup lang="ts">
import CourseBox from "../CourseBox.vue";
import {Course} from "../../../assets/ts/api";
import {filters} from "../../../assets/ts/api/filters";
import dayjs from "dayjs";

defineProps<{ startTime: string, breakTime: string, endTime: string, courses: Course[], dateOfThisMonday: dayjs.Dayjs }>();
</script>

<template>
  <div class="line-row">
    <div class="time-cell date-time-cell">
      <div>{{ startTime }}</div>
      <div>{{ breakTime }}</div>
      <div>{{ endTime }}</div>
    </div>
    <div class="day-cell" v-for="whatDay in 7" :key="whatDay">
      <course-box :courses="courses.filter(filters.course.byDate(dateOfThisMonday.add(whatDay-1, 'day')))"/>
    </div>
  </div>
</template>

<style scoped>
.time-cell {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.course-box {
  flex: 0 0 13%;
}
</style>