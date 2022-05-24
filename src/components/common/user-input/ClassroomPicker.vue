<script setup lang="ts">
import {Classroom} from "../../../assets/ts/api";
import {computed} from "vue";
import TrilingualNaiveContainer from "../languages/TrilingualNaiveContainer.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      placeholder: "教室",
    },
    en: {
      placeholder: "classroom",
    },
    fr: {
      placeholder: "Salles de classe",
    },
  },
});
const props = defineProps<{ pickedRooms: Classroom[], candidates: Classroom[] }>();
const emits = defineEmits(["update:pickedRooms"]);

const pickedRoomsLocal = computed<Classroom[]>({
  get: () => props.pickedRooms,
  set: (newValue) => emits("update:pickedRooms", newValue),
});

const classroomOptions = computed<{ value: Classroom, label: string }[]>(() => {
  return props.candidates.map(candidate => {
    return {value: candidate, label: candidate.name};
  });
});
</script>

<template>
  <div class="classroom-picker">
    <trilingual-naive-container>
      <n-select v-model:value="pickedRoomsLocal"
                :options="classroomOptions"
                :placeholder="t('placeholder')"
                :clearable="true"
                :multiple="true"/>
    </trilingual-naive-container>
  </div>
</template>

<style scoped>
.classroom-picker {
  width: 100%;
}
</style>