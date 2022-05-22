<script setup lang="ts">
import {computed, ref} from "vue";
import {useStore} from "../store/store";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import UserBookmarkEditDialog from "./index/UserBookmarkEditDialog.vue";

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
      showEditDialog.value = true;
    } else {
      store.bookmarks = store.bookmarks.filter(bm => (bm.path !== route.fullPath));
    }
  },
});

const showEditDialog = ref(false);
</script>

<template>
  <div class="tool-bar">
    <user-bookmark-edit-dialog v-model:show="showEditDialog" v-model:bookmark="store.bookmarks[store.bookmarks.length-1]"/>

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
  </div>
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