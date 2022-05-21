<script setup lang="ts">
import SillageTitle from "../../components/SillageTitle.vue";
import config from "../../../package.json";
</script>

<template>
  <div class="about-sillage">
    <n-space :vertical="true">
      <img class="logo" src="/svg/sillage-logo.svg" alt="logo"/>
      <sillage-title size="100px"/>
      <div class="version">v{{ config.version }}</div>
    </n-space>
  </div>
</template>

<style scoped>
.about-sillage {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.logo {
  width: 100px;
}
</style>