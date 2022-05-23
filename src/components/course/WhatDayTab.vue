<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      whatDays: JSON.stringify(["周一", "周二", "周三", "周四", "周五", "周六", "周日"])
    },
    en: {
      whatDays: JSON.stringify(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    },
    fr: {
      whatDays: JSON.stringify(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"])
    }
  }
});
const whatDays = computed(() => JSON.parse(t("whatDays")) as string[]);

const props = defineProps<{ whatDay: number}>();
const emits = defineEmits(["update:whatDay"]);

const activeWhatDay = computed({
  // 真实的 whatDay 是从 1 开始计数的；而 activeWhatDay 是 van-tabs 的索引，是从 0 开始计数的，需要做转换
  get: () => props.whatDay - 1,
  set: (newValue) => emits("update:whatDay", newValue + 1),
});
</script>

<template>
  <van-tabs v-model:active="activeWhatDay">
    <van-tab v-for="whatDay in whatDays" :title="whatDay"/>
  </van-tabs>
</template>

<style scoped>

</style>