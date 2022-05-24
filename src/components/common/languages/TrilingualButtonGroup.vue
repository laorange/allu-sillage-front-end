<script setup lang="ts">
import {useI18n} from "vue-i18n";

withDefaults(defineProps<{
      onConfirm: () => any, onCancel: () => any,
      needConfirm?: boolean, needCancel?: boolean;
      size?: "tiny" | "small" | "medium" | "large"
    }>(),
    {needConfirm: true, needCancel: true, size: "small"});

const {t} = useI18n({
  messages: {
    zh: {
      confirm: "确认",
      cancel: "取消",
    },
    en: {
      confirm: "confirm",
      cancel: "cancel",
    },
    fr: {
      confirm: "confirmer",
      cancel: "annuler",
    },
  },
});
</script>

<template>
  <n-space>
    <van-button type="success" @click="onConfirm()" :size="size" v-if="needConfirm">{{ t("confirm") }}</van-button>
    <van-button type="warning" @click="onCancel()" :size="size" v-if="needCancel">{{ t("cancel") }}</van-button>
  </n-space>
</template>

<style scoped>

</style>