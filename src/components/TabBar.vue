<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const activeIndex = ref(0)

const {t} = useI18n({
  messages: {
    "zh": {
      "home": "首页",
      "about": "关于"
    },
    "en": {
      "home": "Home",
      "about": "About"
    },
    "fr": {
      "home": "Accueil",
      "about": "Info"
    }
  }
})
</script>
<template>
  <van-tabbar v-model="activeIndex">
    <van-tabbar-item icon="wap-home-o">{{ t("home") }}</van-tabbar-item>
    <van-tabbar-item icon="contact">{{ t("about") }}</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>