<script setup lang="ts">
import SetBookmarkButton from "./bookmark/SetBookmarkButton.vue";
import FilterConfig from "./filter-config/FilterConfig.vue";

</script>

<template>
  <div class="tool-bar">
    <van-nav-bar>

      <template #right>
        <slot name="right">
          <set-bookmark-button/>
        </slot>
      </template>

      <template #title>
        <slot name="title"></slot>
      </template>

      <template #left>
        <slot name="left">
          <filter-config/>
        </slot>
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