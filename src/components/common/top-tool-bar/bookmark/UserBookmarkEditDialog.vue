<script setup lang="ts">
import {UserBookmark} from "../../../../assets/ts/types";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import TrilingualButtonGroup from "../../languages/TrilingualButtonGroup.vue";
import {useStore} from "../../../../store/store";
import TrilingualNaiveContainer from "../../languages/TrilingualNaiveContainer.vue";

const {t} = useI18n({
  messages: {
    zh: {
      title: "为这个网页取个名字吧",
      path: "网址",
      alias: "名称",
      willShowOnHomePage: "收藏后，您能在主页找到它的快捷方式。",
      tip: "为了方便下次访问，您可以对这个网址取个别名:",
    },
    en: {
      title: "Alias this website",
      path: "Path",
      alias: "Alias",
      willShowOnHomePage: "After stared, you can find its shortcut on the home page.",
      tip: "In order to facilitate your next visit, you can alias this website:",
    },
    fr: {
      title: "Prendre un alias",
      path: "Adresse",
      alias: "Alias",
      willShowOnHomePage: "Une fois marqué, vous pouvez trouver son raccourci sur la page d'accueil.",
      tip: "Pour faciliter la prochaine visite, vous pouvez prendre un alias à cette adresse:",
    },
  },
});
const store = useStore();

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

const localAlias = ref<string>("");

const handlers = {
  confirm() {
    editingBookmark.value.alias = localAlias.value;
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
  onMaskClick() {
    showEditDialog.value = true;
  },
};
</script>

<template>
  <n-drawer v-model:show="showEditDialog"
            :on-mask-click="handlers.onMaskClick"
            placement="top" height="60%">
    <n-drawer-content :title="t('title')">

      <template #footer>
        <trilingual-button-group :on-confirm="handlers.confirm" :on-cancel="handlers.cancel" :disable-confirm="localAlias.length===0"/>
      </template>

      <div :style="{padding: '0 16px'}">
        <n-space :vertical="true">
          <div :style="{marginBottom: '10px'}">{{ `${t("path")}: ${(bookmark.path)}` }}</div>
          <div :style="{marginBottom: '10px'}">{{ t("willShowOnHomePage") }}</div>
          <div :style="{marginBottom: '10px'}">{{ t("tip") }}</div>
        </n-space>
      </div>

      <trilingual-naive-container>
        <n-input-group>
          <n-input-group-label>
            <div :style="{width: '50px', textAlign: 'center'}">{{ t("alias") }}:</div>
          </n-input-group-label>
          <n-input v-model:value="localAlias"
                   type="text"
                   :maxlength="30"
                   :clearable="true"/>
        </n-input-group>
      </trilingual-naive-container>

    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>