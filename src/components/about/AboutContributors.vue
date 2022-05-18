<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n({
  messages: {
    zh: {
      "yzc": "尹章程",
      "dh": "杜航",
      "zyb": "赵宇勃",
    },
    en: {
      "yzc": "Paul",
      "dh": "Etienne",
      "zyb": "Frédéric",
    },
    fr: {
      "yzc": "Paul",
      "dh": "Etienne",
      "zyb": "Frédéric",
    },
  },
});
</script>

<template>
  <van-grid :column-num="3" icon-size="40px">
    <van-grid-item icon="https://avatars.githubusercontent.com/u/68316902?s=64&v=4" :text="`17-${t('yzc')}`"/>
    <van-grid-item icon="https://avatars.githubusercontent.com/u/69333241?s=64&v=4" :text="`17-${t('dh')}`"/>
    <van-grid-item icon="https://avatars.githubusercontent.com/u/73748887?s=64&v=4" :text="`17-${t('zyb')}`"/>
  </van-grid>
</template>

<style scoped>

</style>