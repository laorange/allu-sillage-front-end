<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "../store/store";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const store = useStore();
const route = useRoute();
const {t} = useI18n({
  messages: {
    zh: {
      star: "收藏本页",
      stared: "已收藏",
      setFilter: "设置信息",
    },
    en: {
      star: "Star",
      stared: "Stared",
      setFilter: "Filter options",
    },
    fr: {
      star: "Marquer",
      stared: "Marqué",
      setFilter: "Options du filtre ",
    },
  },
});

withDefaults(defineProps<{ activateColor?: string }>(), {activateColor: "red"});

const bookmarkPaths = computed(() => store.bookmarks.map(bm => bm.path));

const isBookmark = computed<boolean>({
  get: () => bookmarkPaths.value.indexOf(route.fullPath) > -1,
  set: (newValue) => {
    if (newValue) {
      store.bookmarks.push({path: route.fullPath, alias: route.fullPath});
    } else {
      store.bookmarks = store.bookmarks.filter(bm => (bm.path !== route.fullPath));
    }
  },
});
</script>

<template>
  <van-nav-bar>
    <template #right>
      <div class="one-tool" @click="isBookmark = !isBookmark">
        <van-icon name="star-o" size="20px" :color="isBookmark ? activateColor : 'black'"/>
        <div class="tool-bar-label" v-if="isBookmark" :style="{color: activateColor}">{{ t("stared") }}</div>
        <div class="tool-bar-label" v-else>{{ t("star") }}</div>
      </div>
    </template>
    <template #left>
      <div class="one-tool">
        <van-icon name="setting-o" color="black" size="20px"/>
        <div class="tool-bar-label">{{ t("setFilter") }}</div>
      </div>
    </template>
  </van-nav-bar>
</template>

<style scoped>
.one-tool {
  display: flex;
}

.tool-bar-label {
  padding-left: 4px;
  font-size: 16px;
}
</style>