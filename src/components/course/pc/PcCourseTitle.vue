<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import dayjs from "dayjs";
import {formatDate} from "../../../assets/ts/datetimeUtils";

defineProps<{ grade: string | number, week: number ,dateOfThisMonday: dayjs.Dayjs}>();

const {t} = useI18n({
  messages: {
    zh: {
      l1: "中欧航空工程师学院 GEA 天津",
      l2: "{grade}级第{week}周",
      l3: "日期",
      whatDay: JSON.stringify(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]),
    },
    en: {
      l1: "Sino-European Institute of Aviation Engineering",
      l2: "{grade} - Week {week}",
      l3: "date",
      whatDay: JSON.stringify(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    },
    fr: {
      l1: "Institut Sino-Européen d'Ingénierie de l'Aviation",
      l2: "{grade} - Week {week}",
      l3: "date",
      whatDay: JSON.stringify(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]),
    },
  },
});
const whatDayList = computed(() => JSON.parse(t("whatDay")) as string[]);
</script>

<template>
  <!--  第一行-->
  <div class="line-row">
    <div class="img"><img src="../../../assets/images/GEA.png" alt="GEA"></div>
    <div style="flex: 1;">
      <h2>{{ t("l1") }}</h2>
      <h3>{{ t("l2", {week: week, grade: grade}) }}</h3>
      <h2>Promotion SIAE 2017</h2>
    </div>
    <div class="img"><img src="../../../assets/images/CAUC.png" alt="CAUC"></div>
  </div>
  <!--  第二行-->
  <div class="line-row">
    <div class="date-time-cell">
      {{ t("l3") }}
    </div>
    <div class="date day-cell" v-for="(whatDay, index) in whatDayList" :key="whatDay">
      <!-- TODO -->
      <div>{{ formatDate(dateOfThisMonday.add(index, 'day')) }}</div>
      {{ whatDay }}
    </div>
  </div>
</template>

<style scoped>

</style>