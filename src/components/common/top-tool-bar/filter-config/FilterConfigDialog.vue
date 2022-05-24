<script setup lang="ts">
import {computed, inject, ref} from "vue";
import GroupPicker from "../../user-input/GroupPicker.vue";
import {Classroom, Group} from "../../../../assets/ts/api";
import TrilingualButtonGroup from "../../languages/TrilingualButtonGroup.vue";
import ClassroomPicker from "../../user-input/ClassroomPicker.vue";
import MethodPicker from "../../user-input/MethodPicker.vue";
import {useI18n} from "vue-i18n";
import TeacherNameInput from "../../user-input/teacher-name-input.vue";

const {t} = useI18n({
  messages: {
    zh: {
      tip: "提示：不选即全选",
      teacherNameInputPlaceholder: "根据授课教师姓名检索",
    },
    en: {
      tip: "Tips: Select none = Select all",
      teacherNameInputPlaceholder: "Retrieve by professor's name",
    },
    fr: {
      tip: "Astuce: sélectionner aucun = sélectionner tout",
      teacherNameInputPlaceholder: "Recherche par nom de professeur",
    },
  },
});

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
const roomArray = ref<Classroom[]>([]);
const methodArray = ref<string[]>([]);
const teacherName = ref<string>("");
</script>

<template>
  <n-drawer v-model:show="modelValueLocal" placement="top" height="550px">
    <n-drawer-content :title="description">
      <template #footer>
        <trilingual-button-group :on-confirm="handlers.confirm" :on-cancel="handlers.closeDialog"/>
      </template>

      <div class="filter-config-content">
        <div :style="{fontSize: 'large'}">{{ t("tip") }}</div>

        <group-picker v-model:group-array="groupArray" :candidates="inject('groups')" :period="inject('period')"/>

        <classroom-picker v-model:picked-rooms="roomArray" :candidates="inject('classrooms')"/>

        <method-picker v-model:picked-methods="methodArray"/>

        <teacher-name-input v-model:teacher-name="teacherName" :placeholder="t('teacherNameInputPlaceholder')"/>
      </div>

    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.filter-config-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filter-config-content > * {
  margin-bottom: 15px;
}
</style>