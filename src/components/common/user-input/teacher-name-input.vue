<script setup lang="ts">
import {computed} from "vue";
import TrilingualNaiveContainer from "../languages/TrilingualNaiveContainer.vue";

const props = defineProps<{ teacherName: string, placeholder: string }>();
const emits = defineEmits(["update:teacherName"]);

const teacherNameLocal = computed<string>({
  get: () => props.teacherName,
  set: (newValue) => emits("update:teacherName", newValue),
});

</script>

<template>
  <trilingual-naive-container>
    <n-input :placeholder="placeholder" v-model:value="teacherNameLocal"/>
  </trilingual-naive-container>
</template>

<style scoped>

</style>