<script setup lang="ts">
import {computed, inject, ref} from "vue";
import GroupPicker from "../../user-input/GroupPicker.vue";
import {Group} from "../../../../assets/ts/api";
import TrilingualButtonGroup from "../../languages/TrilingualButtonGroup.vue";

const props = defineProps<{ modelValue: boolean, description: string }>();
const emits = defineEmits(["update:modelValue"]);

const modelValueLocal = computed<boolean>({
  get: () => props.modelValue,
  set: (newValue) => emits("update:modelValue", newValue),
});

const handlers = {
  closeDialog() {
    modelValueLocal.value = false;
  },
  confirm() {
    handlers.closeDialog();
  },
};

const groupArray = ref<Group[]>([]);
</script>

<template>
  <n-drawer v-model:show="modelValueLocal" placement="top" height="80%">
    <n-drawer-content :title="description">
      <template #footer>
        <trilingual-button-group :on-confirm="handlers.confirm" :on-cancel="handlers.closeDialog"/>
      </template>

      <group-picker v-model:group-array="groupArray" :candidates="inject('groups')" :period="inject('period')"/>

    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>