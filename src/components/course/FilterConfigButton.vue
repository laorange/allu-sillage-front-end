<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      setFilter: "设置信息",
    },
    en: {
      setFilter: "Filter options",
    },
    fr: {
      setFilter: "Options du filtre ",
    },
  },
});
</script>

<template>
  <div class="filter-config-button">
    <van-icon name="setting-o" color="black" size="20px"/>
    <div class="filter-config-text">{{ t("setFilter") }}</div>
  </div>
</template>

<style scoped>
.filter-config-button {
  display: flex;
}

.filter-config-text {
  padding-left: 4px;
  font-size: 16px;
}
</style>