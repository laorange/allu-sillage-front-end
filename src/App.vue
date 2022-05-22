<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import TabBar from "./components/TabBar.vue";
import {onBeforeMount, watch} from "vue";
import {useStore} from "./store/store";
import {useStorage} from "vue3-storage";
import {useI18n} from "vue-i18n";
import {Bookmark, LanguageOptions} from "./assets/ts/types";

const store = useStore();
const storage = useStorage();
const {locale} = useI18n();

/** 读取 localstorage 中的数据 */
function loadDataFromLocalstorage() {
  storage.getStorage({
    key: "language",
    success: result => (locale.value = result.data ?? "zh" as LanguageOptions),
  }).catch(() => undefined);

  storage.getStorage({
    key: "bookmarks",
    success: result => (store.bookmarks = JSON.parse(result.data ?? "[]") as Bookmark[]),
  }).catch(() => undefined);
}

onBeforeMount(async () => {
  store.updateInfoFromBackend();
  loadDataFromLocalstorage();
});

/** 监听 store.bookmarks 的变化，并记录于 localstorage */
watch(() => store.bookmarks, async (newBookmarks) => {
  await storage.setStorage({
    key: "bookmarks",
    data: JSON.stringify(newBookmarks),
  });
}, {deep: true});

/** 监听 locale.value 的变化，并记录于 localstorage */
watch(() => locale.value, async (newLocale) => {
  console.log("更新language");
  await storage.setStorage({
    key: "language",
    data: newLocale,
  });
});
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
