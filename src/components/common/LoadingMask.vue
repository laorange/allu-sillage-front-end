<script setup lang="ts">
import {useI18n} from "vue-i18n";

const props = defineProps<{ isLoading: boolean }>();

const {t} = useI18n({
  messages: {
    zh: {
      "requestingData": "正在请求数据...",
    },
    en: {
      "requestingData": "Requesting data...",
    },
    fr: {
      "requestingData": "En train de obtenir des informations",
    },
  },
});
</script>


<template>
  <div v-show="isLoading">
    <div class="Mask"></div>
    <div id="canvasContainer">
      <!-- region: Forked from https://codepen.io/aurer/details/ZEJxpO -->
      <svg id="loading-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           width="40px" height="40px" viewBox="0 0 50 50" xml:space="preserve"
      >
          <path
              fill="#000"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
          >
            <animateTransform attributeType="xml"
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="0.6s"
                              repeatCount="indefinite"/>
          </path>
      </svg>
      <!-- endregion -->

      <div class="LoadingContent">{{ t("requestingData") }}</div>
    </div>
  </div>
</template>


<style scoped>
.Mask {
  background-color: grey;
  opacity: 10%;
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998
}

#canvasContainer {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.LoadingContent {
  margin-top: 10px;
}
</style>