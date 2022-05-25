<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ modelValue: boolean, description:string }>();
const emits = defineEmits(["update:modelValue"]);

const modelValueLocal = computed<boolean>({
  get: () => props.modelValue,
  set: (newValue) => emits("update:modelValue", newValue),
});

</script>

<template>
  <div class="filter-config-button" @click="modelValueLocal=!modelValueLocal">
    <van-icon name="setting-o" color="black" size="20px"/>
    <div class="filter-config-text">{{ description }}</div>
  </div>
</template>

<style scoped>
.filter-config-button {
  display: flex;
}

.filter-config-text {
  padding-left: 4px;
  font-size: 12px;
}
</style>