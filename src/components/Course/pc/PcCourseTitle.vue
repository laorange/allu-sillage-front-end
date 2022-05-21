<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import GrayLine from "./GrayLine.vue";
import WhiteLine from "./WhiteLine.vue";

defineProps<{ grade: string | number, week: number }>();

const {t} = useI18n({
  messages: {
    zh: {
      l1: "中欧航空工程师学院 GEA 天津",
      l2: "{grade}级第{week}周",
      l3: "日期",
      week: JSON.stringify(["周一", "周二", "周三", "周四", "周五", "周六", "周日"])
    },
    en: {
      l1: "Sino-European Institute of Aviation Engineering",
      l2: "{grade} - Week {week}",
      l3: "date",
      week: JSON.stringify(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    },
    fr: {
      l1: "Institut Sino-Européen d'Ingénierie de l'Aviation",
      l2: "{grade} - Week {week}",
      l3: "date",
      week: JSON.stringify(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"])
    }
  }
});
const weekList = computed(() => JSON.parse(t("week")) as string[]);
</script>

<template>
  <!--  第一行-->
  <div class="line-row1">
    <div class="img"><img src="../../../assets/images/GEA.png" alt="GEA"></div>
    <div style="flex: 1">
      <h2>{{ t('l1') }}</h2>
      <h3>{{ t('l2', {week: week, grade: grade}) }}</h3>
      <h2>Promotion SIAE 2017</h2>
    </div>
    <div class="img"><img src="../../../assets/images/CAUC.png" alt="CAUC"></div>
  </div>
  <!--  第二行-->
  <div class="line-row2">
    <div>
      {{ t('l3') }}
    </div>
    <div v-for="week in weekList" :key="week">
      <!-- TODO -->
      <div class="date">
        date
      </div>
      {{ week }}
    </div>
  </div>
  <!--第三行-->
  <gray-line :text="`08:00`"/>
  <white-line :row="1" rest="08:45~08:50"/>
  <gray-line :text="`09:45-10:05`"/>
  <white-line :row="2" rest="10:50~10:55"/>
  <gray-line :text="`11:40`"/>
  <gray-line :text="`11:40`"/>
  <white-line :row="3" rest="10:50~10:55"/>
  <gray-line :text="`11:40`"/>
  <white-line :row="4" rest="10:50~10:55"/>
  <gray-line :text="`11:40`"/>
</template>

<style scoped>

</style>