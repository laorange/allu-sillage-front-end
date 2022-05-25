<script setup lang="ts">
import {computed, ref} from "vue";
import {useStore} from "../../../../store/store";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import UserBookmarkEditDialog from "./UserBookmarkEditDialog.vue";

const store = useStore();
const route = useRoute();
const {t} = useI18n({
  messages: {
    zh: {
      star: "收藏本页",
      stared: "已收藏",
    },
    en: {
      star: "Star",
      stared: "Stared",
    },
    fr: {
      star: "Marquer",
      stared: "Marqué",
    },
  },
});

withDefaults(defineProps<{ activateColor?: string }>(), {activateColor: "red"});

const bookmarkPaths = computed(() => store.bookmarks.map(bm => bm.path));

const isBookmark = computed<boolean>({
  get: () => bookmarkPaths.value.indexOf(route.fullPath) > -1,
  set: (newValue) => {
    if (newValue) {
      store.bookmarks.push({path: route.fullPath, alias: route.path});
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

    <div class="set-bookmark-area" @click="isBookmark = !isBookmark">
      <van-icon name="star-o" size="20px" :color="isBookmark ? activateColor : 'black'"/>
      <div class="set-bookmark-area-text" v-if="isBookmark" :style="{color: activateColor}">{{ t("stared") }}</div>
      <div class="set-bookmark-area-text" v-else>{{ t("star") }}</div>
    </div>
  </div>
</template>

<style scoped>
.set-bookmark-area {
  display: flex;
}

.set-bookmark-area-text {
  padding-left: 4px;
  font-size: 12px;
}
</style>