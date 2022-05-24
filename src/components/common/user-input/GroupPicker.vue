<script setup lang="ts">
import {computed} from "vue";
import {ElementCascaderOption, LanguageOptions} from "../../../assets/ts/types";
import useSemesterOptions from "../../../assets/ts/hooks/useSemesterOptions";
import {useI18n} from "vue-i18n";
import {useStore} from "../../../store/store";
import {Group} from "../../../assets/ts/api";

const {locale} = useI18n();
const store = useStore();

const props = defineProps<{ groupArray: Group[] }>();
const emits = defineEmits(["update:groupArray"]);

const groupArrayLocal = computed<Group[]>({
  get: () => props.groupArray,
  set: (newValue) => emits("update:groupArray", newValue),
});

const rawSelectedGroups = computed<[number, number][]>({
  get: () => (groupArrayLocal.value.map(group => [group.semester, group.group_id] as [number, number])),
  set: (newRSG) => (groupArrayLocal.value = newRSG.map(rsg => store.apiData.groups.filter(g => g.group_id === rsg[1])[0])),
});

const {getSemesterElOptions} = useSemesterOptions();

const groupOptions = computed<ElementCascaderOption[]>(() => {
  let semesterElOptionsNow = getSemesterElOptions(locale.value as LanguageOptions)
      // 根据当前学期戳，过滤非本学期的选项
      .filter(op => op.value % 2 === store.current_period % 2);

  for (const semesterElOption of semesterElOptionsNow) {
    semesterElOption.children = [];
    for (const group of store.apiData.groups.filter(groupCandidate => groupCandidate.semester === semesterElOption.value)) {
      semesterElOption.children.push({
        value: group.group_id,
        label: group.name,
      });
    }
  }
  return semesterElOptionsNow;
});

const multiple = {multiple: true};
</script>

<template>
  <div class="group-picker">
    <el-cascader-panel
        expandTrigger="hover"
        :options="groupOptions"
        :props="multiple"
        v-model="rawSelectedGroups"
    />
  </div>
</template>

<style scoped>

</style>