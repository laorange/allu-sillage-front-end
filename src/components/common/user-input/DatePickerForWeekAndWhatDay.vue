<script setup lang="ts">
import {useStore} from "../../../store/store";
import dayjs from "dayjs";
import {computed, onBeforeMount} from "vue";
import {getIsoWeekDay} from "../../../assets/ts/datetimeUtils";
import TrilingualNaiveContainer from "../languages/TrilingualNaiveContainer.vue";

const store = useStore();

const props = defineProps<{ week: number, whatDay: number, date: dayjs.Dayjs }>();
const emits = defineEmits(["update:week", "update:whatDay", "update:date"]);

const localDate = computed<dayjs.Dayjs>({
  get: () => store.week1_monday_date.add(props.week - 1, "week").add(props.whatDay - 1, "day"),
  set: (newDate) => {
    emits("update:week", store.getWeekNumOfSomeDay(newDate));
    emits("update:whatDay", getIsoWeekDay(newDate));
  },
});

const localDateTimestamp = computed<number>({
  get: () => localDate.value.valueOf(),
  set: (newTimestamp) => (localDate.value = dayjs(newTimestamp)),
});

function dateDisableValidator(timestamps: number): boolean {
  let _date = dayjs(timestamps);
  let endOfSemester = store.week1_monday_date.add(store.max_week, "week");
  return !(_date.isAfter(store.week1_monday_date.add(-1, "day")) && _date.isBefore(endOfSemester));
}

onBeforeMount(() => (localDate.value = props.date));
</script>

<template>
  <trilingual-naive-container>
    <n-date-picker v-model:value="localDateTimestamp"
                   type="date"
                   :first-day-of-week="0"
                   :input-readonly="true"
                   placement="bottom"
                   :is-date-disabled="dateDisableValidator"
                   :actions="['now']"/>
  </trilingual-naive-container>
</template>

<style scoped>

</style>