<script setup lang="ts">
import {useI18n} from "vue-i18n";
import AboutContributors from "./AboutContributors.vue";

const {t} = useI18n({
  messages: {
    zh: {
      "docs": "说明文档",
      "feedback": "意见反馈",
      "donate": "赞赏支持",
      "contributors": "开发团队",
    },
    en: {
      "docs": "Documentation",
      "feedback": "Feedback",
      "donate": "Sponsor development of Sillage",
      "contributors": "Contributors of Sillage",
    },
    fr: {
      "docs": "Documentation",
      "feedback": "Feedback",
      "donate": "Soutenir le développement de Sillage",
      "contributors": "Contributeurs de Sillage"
    },
  },
});
</script>

<template>
  <van-cell-group inset>
    <van-cell :title="t('docs')" url="http://docs.siae.top/" :title-style="{textAlign: 'left'}" is-link/>
    <van-cell :title="t('feedback')" to="/about/" :title-style="{textAlign: 'left'}" is-link/>
    <van-cell :title="t('donate')" to="/about/" :title-style="{textAlign: 'left'}" is-link/>
    <van-cell :title="`${t('contributors')}:`" :title-style="{textAlign: 'left'}">
      <template #label>
        <about-contributors/>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>

</style>