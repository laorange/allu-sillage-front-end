<script setup lang="ts">
import {useI18n} from "vue-i18n";

import GradeList from "../../components/index/GradeList.vue";
import SillageTitle from "../../components/SillageTitle.vue";
import LanguageSwitch from "../../components/LanguageSwitch.vue";
import FunctionEntrance from "../../components/index/FunctionEntrance.vue";
import BrowseHistory from "../../components/index/UserBookmark.vue";


const {t} = useI18n()
</script>

<template>
  <div class="index-body">
    <div class="title-area">
      <sillage-title size="150px"></sillage-title>
      <language-switch></language-switch>
    </div>

    <grade-list/>
    <function-entrance/>
    <browse-history/>
  </div>
</template>

<style scoped>
.index-body {
  min-height: 100vh;
  background-image: linear-gradient(rgba(100, 200, 250, 30%) 10%, rgba(100, 200, 250, 10%), rgba(100, 200, 250, 30%));
}

.title-area {
  padding-top: 50px;
}
</style>
