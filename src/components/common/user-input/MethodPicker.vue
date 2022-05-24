<script setup lang="ts">
import constants from "../../../assets/constants.json";

import {computed} from "vue";
import TrilingualNaiveContainer from "../languages/TrilingualNaiveContainer.vue";

const props = defineProps<{ pickedMethods: string[] }>();
const emits = defineEmits(["update:pickedMethods"]);

const candidates = constants.METHODS;

const pickedMethodsLocal = computed<string[]>({
  get: () => props.pickedMethods,
  set: (newValue) => emits("update:pickedMethods", newValue),
});

const methodOptions = computed<{ value: string, label: string }[]>(() => {
  return candidates.map(candidate => {
    return {value: candidate, label: candidate};
  });
});
</script>

<template>
  <div class="method-picker">
    <trilingual-naive-container>
      <n-select v-model:value="pickedMethodsLocal"
                :options="methodOptions"
                :clearable="true"
                placeholder="Course/TD/TP/Exam"
                :multiple="true"/>
    </trilingual-naive-container>
  </div>
</template>

<style>
.method-picker {
  width: 100%;
}
</style>