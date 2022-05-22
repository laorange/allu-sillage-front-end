<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "../store/store";
import {useRoute} from "vue-router";

const store = useStore();
const route = useRoute();

withDefaults(defineProps<{ activateColor?: string }>(), {activateColor: "red"});

const isBookmark = computed<boolean>({
  get: () => store.bookmarks.indexOf(route.fullPath) > -1,
  set: (newValue) => {
    if (newValue) {
      store.bookmarks.push(route.fullPath);
    } else {
      store.bookmarks = store.bookmarks.filter(bm => (bm !== route.fullPath));
    }
  },
});
</script>

<template>
  <van-nav-bar>
    <template #right>
      <div class="one-tool" @click="isBookmark = !isBookmark">
        <van-icon name="star-o" size="20px" :color="isBookmark ? activateColor : 'black'"/>
        <div class="tool-bar-label" v-if="isBookmark" :style="{color: activateColor}">已收藏</div>
        <div class="tool-bar-label" v-else>收藏本页</div>
      </div>
    </template>
    <template #left>
      <div class="one-tool">
        <van-icon name="setting-o" color="black" size="20px"/>
        <div class="tool-bar-label">设置信息</div>
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