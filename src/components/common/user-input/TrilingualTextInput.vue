<script setup lang="ts">
import {computed} from "vue";
import TrilingualNaiveContainer from "../languages/TrilingualNaiveContainer.vue";

const props = withDefaults(defineProps<{ value: string, placeholder?: string, maxLength?: number, clearable?:boolean}>(),
    {maxLength: 50, clearable:true});
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});

</script>

<template>
  <trilingual-naive-container>
    <n-input v-model:value="valueLocal"
             :placeholder="placeholder"
             :maxlength="maxLength"
             :clearable="clearable"/>
  </trilingual-naive-container>
</template>

<style scoped>

</style>