<script setup lang="ts">
import {useRoute} from "vue-router";
import {useStore} from "../../../store/store";
import ToolBar from "../../../components/ToolBar.vue";
import {ref} from "vue";
import PcCourseTitle from "../../../components/Course/PcCourseTitle.vue";


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

<style scoped>

</style>