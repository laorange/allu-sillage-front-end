<script setup lang="ts">
defineProps<{ row: number; rest:string }>();
</script>

<template>
  <div class="line-row">
    <div>
      {{rest}}
    </div>
    <div v-for="col in 8" :key="col">
      {{row}} {{col}}
    </div>
  </div>
</template>

<style scoped>

</style>