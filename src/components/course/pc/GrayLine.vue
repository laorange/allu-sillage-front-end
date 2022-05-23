<script setup lang="ts">
withDefaults(defineProps<{ text: string; }>(), {text: ""});
</script>

<template>
  <div class="line-row" style="background-color: gray">
    <div class="gray">
      {{text}}
    </div>
    <div class="blank"></div>
  </div>

</template>

<style scoped>
.gray{
  flex: 0 0 13%;
}
.blank{
  flex: 1;
}
</style>