<script setup lang="ts">
import {UserBookmark} from "../../assets/ts/types";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import TrilingualButtonGroup from "../languages/TrilingualButtonGroup.vue";

const {t} = useI18n({
  messages: {
    zh: {
      path: "网址",
      alias: "名称",
      willShowOnHomePage: "收藏后，您能在主页找到它的快捷方式。",
      tip: "为了方便下次访问，您可以对这个网址取个别名:",
    },
    en: {
      path: "Path",
      alias: "Alias",
      willShowOnHomePage: "After stared, you can find its shortcut on the home page.",
      tip: "In order to facilitate your next visit, you can alias this website:",
    },
    fr: {
      path: "Adresse",
      alias: "Alias",
      willShowOnHomePage: "Une fois marqué, vous pouvez trouver son raccourci sur la page d'accueil.",
      tip: "Pour faciliter la prochaine visite, vous pouvez prendre un alias à cette adresse:",
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


const handlers = {
  confirm() {
    showEditDialog.value = false;
  },
  cancel() {

    showEditDialog.value = false;
  },
  onAliasInputBlur() {
    if (editingBookmark.value.alias.length === 0) {
      editingBookmark.value.alias = editingBookmark.value.path;
    }
  },
};
</script>

<template>
  <n-drawer v-model:show="showEditDialog" placement="top" height="60%">
    <n-drawer-content :title="`${t('path')}: ${(bookmark.path).replace(/\?[\s\S]*/, '?...')}`">
      <template #footer>
        <trilingual-button-group :on-confirm="handlers.confirm" :on-cancel="handlers.cancel"/>
      </template>

      <div :style="{padding: '0 16px'}">
        <n-space :vertical="true">
          <div :style="{marginBottom: '10px'}">{{ t("willShowOnHomePage") }}</div>
          <div :style="{marginBottom: '10px'}">{{ t("tip") }}</div>
        </n-space>
      </div>

      <n-input-group>
        <n-input-group-label>
          <div :style="{width: '50px', textAlign: 'center'}">{{ t("alias") }}:</div>
        </n-input-group-label>
        <n-input v-model:value="editingBookmark.alias"
                 type="text"
                 :placeholder="t('alias')"
                 :clearable="true"
                 :on-blur="handlers.onAliasInputBlur"/>
      </n-input-group>

    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>