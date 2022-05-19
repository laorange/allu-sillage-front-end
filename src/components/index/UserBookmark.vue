<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      'Bookmarks': "收藏夹",
      "underConstruction": "该组件尚未完成",
    },
    en: {
      'Bookmarks': "Bookmarks",
      "underConstruction": "this component is under construction...",
    },
    fr: {
      "Bookmarks": "Favoris",
      "underConstruction": "ce composant est en construction...",
    },
  }
});

const gradeNameList = computed(() => JSON.parse(t('gradeNameList')) as string[])

</script>

<template>
  <n-divider :dashed="true">{{ t("Bookmarks") }}</n-divider>

  <div>🚧 {{t('underConstruction')}}</div>
</template>

<style scoped>

</style>