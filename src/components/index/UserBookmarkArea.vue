<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "../../store/store";
import {UserBookmark} from "../../assets/ts/types";
import {useRouter} from "vue-router";
import UserBookmarkEditDialog from "./UserBookmarkEditDialog.vue";

const store = useStore();
const router = useRouter();

const {t} = useI18n({
  messages: {
    zh: {
      "Bookmarks": "收藏夹",
    },
    en: {
      "Bookmarks": "Bookmarks",
    },
    fr: {
      "Bookmarks": "Favoris",
    },
  },
});

const showEditDialog = ref(false);
const editingBookmark = ref<UserBookmark>({path: " ", alias: " "});

function updateEditingBookmark(newBookmark: UserBookmark) {
  editingBookmark.value = newBookmark;
  showEditDialog.value = true;
}

function deleteBookmark(targetBookmark: UserBookmark) {
  store.bookmarks = store.bookmarks.filter(bm => bm.path !== targetBookmark.path);
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

    <user-bookmark-edit-dialog v-model:show="showEditDialog" v-model:bookmark="editingBookmark"/>

    <div class="user-bookmarks">
      <van-cell v-for="bookmark in store.bookmarks"
                :key="bookmark.path"
                :title-style="{textAlign: 'left'}">
        <template #title>
          <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false" :style="{height: '100%'}">
            {{ bookmark.alias }}
          </n-ellipsis>
        </template>
        <template #right-icon>
          <van-button icon="guide-o" type="success" size="small" @click="redirectWithRouter(bookmark.path)"></van-button>
          <van-button icon="edit" type="primary" size="small" @click="updateEditingBookmark(bookmark)"></van-button>
          <van-button icon="delete-o" type="danger" size="small" @click="deleteBookmark(bookmark)"></van-button>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.van-cell .van-cell__title {
  align-items: center;
}

button + button {
  margin-left: 20px;
}
</style>