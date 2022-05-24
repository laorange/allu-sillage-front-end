<script setup lang="ts">
withDefaults(defineProps<{ size?: string; }>(), {size: "200px"});
</script>

<template>
  <div class="title">
    <img src="/svg/sillage-title.svg" alt="sillage-title.svg" :style="{width: size}">
  </div>
</template>

<style scoped>
.title {

}
</style>