<script setup lang="ts">
import {useRoute} from "vue-router";
import TopToolBar from "../../../components/TopToolBar.vue";
import {useStore} from "../../../store/store";
import CourseBox from "../../../components/course/CourseBox.vue";

const route = useRoute();
const store = useStore();

const semester = route.query.semester ?? -1;

</script>

<template>
  <top-tool-bar/>
  <h1>course-mobile</h1>
  <h2>semester = {{ semester }}</h2>
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