<script setup lang="ts">
import {useI18n} from "vue-i18n";

import GradeList from "../../components/index/GradeList.vue";
import SillageTitle from "../../components/SillageTitle.vue";
import LanguageSwitch from "../../components/LanguageSwitch.vue";


const {t} = useI18n()
</script>

<template>
  <div class="index-body">
    <div class="title-area">
      <sillage-title></sillage-title>
      <language-switch></language-switch>
    </div>

    <div>{{ t("title") }}</div>

    <grade-list></grade-list>
  </div>
</template>

<style scoped>
.index-body {
  min-height: 100vh;
  background-image: linear-gradient(#e6e5f7 30%, #fad0da, #dbc0da);
}

.title-area {
  padding-top: 50px;
  padding-bottom: 30px;
}
</style>
