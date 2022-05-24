<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import FilterConfigButton from "./FilterConfigButton.vue";
import {ref} from "vue";
import FilterConfigDialog from "./FilterConfigDialog.vue";
import {useStore} from "../../../store/store";

const router = useRouter();
const route = useRoute();
const store = useStore();

const {t} = useI18n({
  messages: {
    zh: {
      setFilter: "设置信息",
    },
    en: {
      setFilter: "Filter options",
    },
    fr: {
      setFilter: "Options du filtre",
    },
  },
});

const showDialog = ref(false);
</script>

<template>
  <filter-config-button v-model="showDialog" :description="t('setFilter')"/>
  <filter-config-dialog v-model="showDialog" :description="t('setFilter')"/>
</template>

<style scoped>

</style>