<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{ whetherBookmark: boolean; activateColor?: string }>(),
    {activateColor: "red"});
const emits = defineEmits(["update:whetherBookmark"]);

const active = computed({
  get: () => props.whetherBookmark,
  set: (newValue) => emits("update:whetherBookmark", newValue),
});
</script>

<template>
  <van-nav-bar>
    <template #right>
      <div class="one-tool" @click="active = !active">
        <van-icon name="star-o" size="20px" :color="active ? activateColor : 'black'"/>
        <div class="tool-bar-label" v-if="active" :style="{color: activateColor}">已收藏</div>
        <div class="tool-bar-label" v-else>收藏本页</div>
      </div>
    </template>
    <template #left>
      <div class="one-tool">
        <van-icon name="setting-o" size="20px"/>
        <div class="tool-bar-label">设置信息</div>
      </div>
    </template>
  </van-nav-bar>
</template>

<style scoped>
.tool-bar {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  align-content: center;
}

.one-tool {
  display: flex;
}

.tool-bar-label {
  padding-left: 4px;
  font-size: 16px;
}
</style>