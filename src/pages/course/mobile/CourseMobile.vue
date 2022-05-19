<script setup lang="ts">
import {useRoute} from "vue-router";
import ToolBar from "../../../components/ToolBar.vue";
import {ref} from "vue";

const route = useRoute();

const semester = route.query.semester ?? -1;

const whetherBookmark = ref(false)
</script>

<template>
  <tool-bar v-model:whether-bookmark="whetherBookmark"/>
  <h1>course-mobile</h1>
  <h2>semester = {{ semester }}</h2>
</template>

<style scoped>

</style>