<script setup lang="ts">
import {useI18n} from "vue-i18n";

const languageDict = {
  "zh": "简体中文",
  "en": "English",
  "fr": "Français"
};

const {locale, availableLocales} = useI18n()
</script>

<template>
  <div class="language-switch">
    <template v-for="lang in availableLocales" :key="lang">
      <van-button size="small"
                  v-if="locale !== lang"
                  @click="locale=lang"
                  type="success">{{ languageDict[lang] }}
      </van-button>
    </template>
  </div>
</template>

<style scoped>
.language-switch {

}

button+button {
  margin-left: 20px;
}
</style>