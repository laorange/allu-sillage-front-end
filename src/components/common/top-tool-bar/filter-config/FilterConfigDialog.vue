<script setup lang="ts">
import {computed, onBeforeMount} from "vue";
import GroupPicker from "../../user-input/GroupPicker.vue";
import TrilingualButtonGroup from "../../languages/TrilingualButtonGroup.vue";
import ClassroomPicker from "../../user-input/ClassroomPicker.vue";
import MethodPicker from "../../user-input/MethodPicker.vue";
import {useI18n} from "vue-i18n";
import TrilingualTextInput from "../../user-input/TrilingualTextInput.vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "../../../../store/store";

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

const route = useRoute();
const router = useRouter();
const store = useStore();

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
      name: route.name ?? "course-pc",
      query: {
        groups: JSON.stringify(store.filterOptions.groups.map(group => group.group_id)),
        rooms: JSON.stringify(store.filterOptions.rooms.map(room => room.room_id)),
        methods: JSON.stringify(store.filterOptions.methods),
        teacher: store.filterOptions.teacher,
        lesson: store.filterOptions.lesson,
      },
    });
  },
  onMaskClick() {
    modelValueLocal.value = true;
  },
};

onBeforeMount(() => {
  try {
    // 读取 semester, 转化为 Group[], 存到 store.filterOptions 中
    let semester = parseInt(route.query.semester?.toString() ?? "0");
    store.filterOptions.groups = store.filterOptions.groups.concat(store.apiData.groups.filter(group => {
      return group.semester === semester;
    }) ?? []);

    // 读取 groups, 并排除 semester 所属的 Group[]，避免重复添加, 存到 store.filterOptions 中
    let groupIds = JSON.parse(route.query.groups?.toString() ?? "[]") as number[];
    for (const groupId of groupIds) {
      store.filterOptions.groups = store.filterOptions.groups.concat(store.apiData.groups.filter(group => {
        return group.semester !== semester && group.group_id === groupId;
      })[0] ?? []);
    }

    // 读取 rooms, 转化为 Classroom[], 存到 store.filterOptions 中
    let roomIds = JSON.parse(route.query.rooms?.toString() ?? "[]") as number[];
    for (const roomId of roomIds) {
      store.filterOptions.rooms = store.filterOptions.rooms.concat(store.apiData.classrooms.filter(room => room.room_id === roomId)[0] ?? []);
    }

    // 读取 methods / teacher / lesson, 存到 store.filterOptions 中
    store.filterOptions.methods = JSON.parse(route.query.methods?.toString() ?? "[]") as string[];
    store.filterOptions.teacher = route.query.teacher?.toString() ?? "";
    store.filterOptions.lesson = route.query.lesson?.toString() ?? "";
  } catch (e) {
    console.warn(e);
  }
});

</script>

<template>
  <n-drawer v-model:show="modelValueLocal"
            placement="top"
            height="600px"
            :on-mask-click="handlers.onMaskClick">
    <n-drawer-content :title="description">
      <template #footer>
        <trilingual-button-group :on-confirm="handlers.confirm" :on-cancel="handlers.closeDialog"/>
      </template>

      <div class="filter-config-content">
        <div :style="{fontSize: 'large'}">{{ t("tip") }}</div>

        <group-picker v-model:group-array="store.filterOptions.groups" :candidates="store.apiData.groups" :period="store.current_period"/>

        <classroom-picker v-model:picked-rooms="store.filterOptions.rooms" :candidates="store.apiData.classrooms"/>

        <method-picker v-model:picked-methods="store.filterOptions.methods"/>

        <trilingual-text-input v-model:value="store.filterOptions.teacher" :placeholder="t('teacherNameInputPlaceholder')"/>

        <trilingual-text-input v-model:value="store.filterOptions.lesson" :placeholder="t('lessonNameInputPlaceholder')"/>
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