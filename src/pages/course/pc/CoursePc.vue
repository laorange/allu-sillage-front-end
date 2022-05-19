<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();

const semester = route.query.semester ?? -1;
</script>

<template>
  <h1>course-pc</h1>
  <h2>semester = {{ semester }}</h2>
</template>

<style scoped>

</style>