<script setup lang="ts">
import {computed, inject, ref} from "vue";
import GroupPicker from "../../user-input/GroupPicker.vue";
import {Classroom, Group} from "../../../../assets/ts/api";
import TrilingualButtonGroup from "../../languages/TrilingualButtonGroup.vue";
import ClassroomPicker from "../../user-input/ClassroomPicker.vue";
import MethodPicker from "../../user-input/MethodPicker.vue";
import {useI18n} from "vue-i18n";
import TrilingualTextInput from "../../user-input/TrilingualTextInput.vue";
import {useRouter} from "vue-router";

const groupsInStore = inject("groups") as Group[];
const classroomsInStore = inject("classrooms") as Classroom[];
const periodInStore = inject("period") as number;

const {t} = useI18n({
  messages: {
    zh: {
      tip: "提示：不选即全选",
      teacherNameInputPlaceholder: "根据授课教师姓名检索",
      lessonNameInputPlaceholder: "根据课程名检索",
    },
    en: {
      tip: "Tips: Select none = Select all",
      teacherNameInputPlaceholder: "Retrieve by professor's name",
      lessonNameInputPlaceholder: "Retrieve by lesson's name",
    },
    fr: {
      tip: "Astuce: sélectionner aucun = sélectionner tout",
      teacherNameInputPlaceholder: "Recherche par nom de professeur",
      lessonNameInputPlaceholder: "Recherche par nom de cours",
    },
  },
});

const router = useRouter();

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
    router.push({
      name: "course",
      query: {
        group: groupArray.value.map(group => group.group_id),
        room: roomArray.value.map(room => room.room_id),
        method: methodArray.value,
        teacher: teacherName.value,
      },
    });
  },
};

const groupArray = ref<Group[]>([]);
const roomArray = ref<Classroom[]>([]);
const methodArray = ref<string[]>([]);
const teacherName = ref<string>("");
const lessonName = ref<string>("");
</script>

<template>
  <n-drawer v-model:show="modelValueLocal" placement="top" height="600px">
    <n-drawer-content :title="description">
      <template #footer>
        <trilingual-button-group :on-confirm="handlers.confirm" :on-cancel="handlers.closeDialog"/>
      </template>

      <div class="filter-config-content">
        <div :style="{fontSize: 'large'}">{{ t("tip") }}</div>

        <group-picker v-model:group-array="groupArray" :candidates="groupsInStore" :period="periodInStore"/>

        <classroom-picker v-model:picked-rooms="roomArray" :candidates="classroomsInStore"/>

        <method-picker v-model:picked-methods="methodArray"/>

        <trilingual-text-input v-model:value="teacherName" :placeholder="t('teacherNameInputPlaceholder')"/>

        <trilingual-text-input v-model:value="lessonName" :placeholder="t('lessonNameInputPlaceholder')"/>
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