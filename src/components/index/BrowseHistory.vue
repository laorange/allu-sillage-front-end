<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      'BrowserHistoryTitle': "历史记录",
      "underConstruction": "该组件尚未完成",
    },
    en: {
      'BrowserHistoryTitle': "Browser History",
      "underConstruction": "this component is under construction...",
    },
    fr: {
      "BrowserHistoryTitle": "Historique du Navigateur",
      "underConstruction": "ce composant est en construction...",
    },
  }
});

const gradeNameList = computed(() => JSON.parse(t('gradeNameList')) as string[])

</script>

<template>
  <n-divider :dashed="true">{{ t("BrowserHistoryTitle") }}</n-divider>

  <div>🚧 {{t('underConstruction')}}</div>
</template>

<style scoped>

</style>