<script setup lang="ts">
withDefaults(defineProps<{ fontSize?: string; }>(), {fontSize: "xxx-large"});
</script>

<template>
  <div class="title" :style="{fontSize: fontSize}">
    <span class="title-sillage">Si</span>ll<span class="title-sillage">a</span>g<span class="title-sillage">e</span>
  </div>
</template>

<style scoped>
.title {
  font-family: "Consolas", serif;
  font-weight: bolder;
  color: #183765;
}

.title-sillage {
  color: black;
}
</style>