<script setup lang="ts">
import AboutSillage from "../../components/about/AboutSillage.vue";
import AboutOptions from "../../components/about/AboutOptions.vue";

</script>

<template>
  <div class="about-body">
    <about-sillage/>
    <about-options/>
  </div>
</template>

<style scoped>
.about-body {
  min-height: calc(100vh - 50px);
  background-image: linear-gradient(rgba(100, 200, 250, 30%) 10%, rgba(100, 200, 250, 10%), rgba(100, 200, 250, 30%));
}


</style>