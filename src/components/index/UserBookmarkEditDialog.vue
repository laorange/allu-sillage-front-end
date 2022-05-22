<script setup lang="ts">
import {UserBookmark} from "../../assets/ts/types";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const {t} = useI18n({
  messages: {
    zh: {
      path: "网址",
      alias: "名称",
      tip: "为了方便下次访问，您可以对这个网址取个别名",
    },
    en: {
      path: "Path",
      alias: "Alias",
      tip: "In order to facilitate your next visit, you can alias this website",
    },
    fr: {
      path: "Adresse",
      alias: "Alias",
      tip: "Pour faciliter la prochaine visite, vous pouvez prendre un alias à cette adresse",
    },
  },
});


const props = defineProps<{ show: boolean, bookmark: UserBookmark }>();
const emits = defineEmits(["update:show", "update:bookmark"]);


const editingBookmark = computed({
  get: () => props.bookmark,
  set: (newValue) => emits("update:bookmark", newValue),
});

const showEditDialog = computed({
  get: () => props.show,
  set: (newValue) => emits("update:show", newValue),
});

function onAliasInputBlur() {
  if (editingBookmark.value.alias.length === 0) {
    editingBookmark.value.alias = editingBookmark.value.path;
  }
}
</script>

<template>
  <n-drawer v-model:show="showEditDialog" placement="top">
    <n-drawer-content :title="`${t('path')}: ${bookmark.path}`">
      <template #footer>
        <n-space>
          <van-button type="success" @click="showEditDialog=false" size="small">确定</van-button>
        </n-space>
      </template>

      <n-space>
        <div :style="{marginBottom: '10px'}">{{ t("tip") }}</div>
      </n-space>

      <n-input-group>
        <n-input-group-label>
          <div :style="{width: '50px', textAlign: 'center'}">{{ t("alias") }}:</div>
        </n-input-group-label>
        <n-input v-model:value="editingBookmark.alias"
                 type="text"
                 :placeholder="t('alias')"
                 :clearable="true"
                 :on-blur="onAliasInputBlur"/>
      </n-input-group>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>