<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import TabBar from "./components/TabBar.vue";
import {onBeforeMount} from "vue";
import {useStore} from "./store/store";

const store = useStore();
onBeforeMount(() => store.updateInfoFromBackend());
</script>

<template>

  <router-view></router-view>
  <tab-bar></tab-bar>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.van-grid-item__content {
  background-color: transparent !important;
}
</style>
