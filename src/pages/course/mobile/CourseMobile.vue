<script setup lang="ts">
import {useRoute} from "vue-router";
import ToolBar from "../../../components/ToolBar.vue";

const route = useRoute();

const semester = route.query.semester ?? -1;

</script>

<template>
  <tool-bar/>
  <h1>course-mobile</h1>
  <h2>semester = {{ semester }}</h2>
</template>

<style scoped>

</style>