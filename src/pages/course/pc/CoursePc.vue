<script setup lang="ts">
import {useRoute} from "vue-router";
import {useStore} from "../../../store/store";
import ToolBar from "../../../components/ToolBar.vue";
import {ref} from "vue";
import PcCourseTitle from "../../../components/Course/pc/PcCourseTitle.vue";


const route = useRoute();
const store = useStore();

const semester = route.query.semester ?? -1;

const isBookmark = ref(true);
</script>

<template>
  <tool-bar v-model:whether-bookmark="isBookmark"></tool-bar>
  <pc-course-title :week="18" grade="2017"></pc-course-title>
  <h2>semester = {{ semester }}</h2>
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

div[class^="line-col"] {
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
</style>