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
    <!-- refer https://cloud.tencent.com/developer/article/1987419 -->
    <van-grid-item icon="https://q.qlogo.cn/g?b=qq&k=f4PA69kRTtvgkgKCA1KfkQ&s=100" :text="`17-${t('yzc')}`"/>
    <van-grid-item icon="https://q.qlogo.cn/g?b=qq&k=tnhSKwKt6XpicficiawHNcAPw&s=100" :text="`17-${t('dh')}`"/>
    <van-grid-item icon="https://q.qlogo.cn/g?b=qq&k=Oy8vtaJOpYL5xx5blcUAoA&s=100" :text="`17-${t('zyb')}`"/>
  </van-grid>
</template>

<style scoped>

</style>