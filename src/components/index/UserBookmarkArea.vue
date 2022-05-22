<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "../../store/store";
import {UserBookmark} from "../../assets/ts/types";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const {t} = useI18n({
  messages: {
    zh: {
      "Bookmarks": "收藏夹",
      "path": "网址",
      "alias": "名称",
    },
    en: {
      "Bookmarks": "Bookmarks",
      "path": "Path",
      "alias": "Alias",
    },
    fr: {
      "Bookmarks": "Favoris",
      "path": "Adresse",
      "alias": "Alias",
    },
  },
});

const showEditDialog = ref(false);
const editingBookmark = ref<UserBookmark>({path: " ", alias: " "});

function editBookmark(newBookmark: UserBookmark) {
  editingBookmark.value = newBookmark;
  showEditDialog.value = true;
}

function onAliasInputBlur() {
  if (editingBookmark.value.alias.length === 0) {
    editingBookmark.value.alias = editingBookmark.value.path;
  }
}

function redirectWithRouter(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="user-bookmark-area">
    <n-divider :dashed="true">{{ t("Bookmarks") }}</n-divider>

    <n-drawer v-model:show="showEditDialog" placement="top">
      <n-drawer-content :title="`${t('path')}: ${editingBookmark.path}`">
        <n-input-group>
          <n-input-group-label>
            <div :style="{width: '50px', textAlign: 'center'}">{{ t("alias") }}:</div>
          </n-input-group-label>
          <n-input v-model:value="editingBookmark.alias" type="text" :placeholder="t('alias')"
                   :clearable="true" :on-blur="onAliasInputBlur"/>
        </n-input-group>
      </n-drawer-content>
    </n-drawer>

    <div class="user-bookmarks">
      <van-cell v-for="bookmark in store.bookmarks"
                :key="bookmark.path"
                :title-style="{textAlign: 'left'}">
        <template #title>
          <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
            {{bookmark.alias}}
          </n-ellipsis>
        </template>
        <template #right-icon>
          <van-button icon="guide-o" type="success" size="small" @click="redirectWithRouter(bookmark.path)"></van-button>
          <van-button icon="edit" type="primary" size="small" @click="editBookmark(bookmark)"></van-button>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.van-cell {
  align-items: center;
}

button + button {
  margin-left: 20px;
}
</style>