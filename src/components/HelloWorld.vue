<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
</script>

<template>
  <h1 class="title"><span class="title-sillage">Si</span>ll<span class="title-sillage">a</span>g<span class="title-sillage">e</span></h1>
  <h2>{{ t("title") }}</h2>
</template>

<style scoped>
.title {
  color: rgb(100, 200, 255);
  font-size: 80px;
}

.title-sillage {
  color: #183765;
}
</style>
