<script setup lang="ts">
import SetBookmarkButton from "./SetBookmarkButton.vue";
import FilterConfigButton from "./course/FilterConfigButton.vue";

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
          <filter-config-button/>
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