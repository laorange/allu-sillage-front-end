<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {weekText: "第{week}周"},
    en: {weekText: "Week {week}"},
    fr: {weekText: "Semaine {week}"},
  },
});

const props = withDefaults(defineProps<{ week: number, maxWeek?: number }>(), {maxWeek: 20});
const emits = defineEmits(["update:week"]);

const activeWeek = computed({
  // 真实的week是从1开始计数的；而activeWeek是van-tabs的索引，是从0开始计数的，需要做转换
  get: () => props.week - 1,
  set: (newValue) => emits("update:week", newValue + 1),
});
</script>

<template>
  <van-tabs v-model:active="activeWeek">
    <van-tab v-for="weekNum in maxWeek" :title="t('weekText', {week: weekNum})"/>
  </van-tabs>
</template>

<style scoped>

</style>