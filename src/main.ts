import {createApp} from "vue";
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";
import {languages} from "./languages";
import router from "./router";
import Vue3Storage from "vue3-storage";

import App from "./App.vue";

createApp(App)
    .use(createPinia())
    .use(createI18n({
        legacy: false,
        locale: "zh",
        fallbackLocale: "en",
        messages: languages,
    }))
    .use(Vue3Storage)
    .use(router)
    .mount("#app");