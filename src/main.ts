import {createApp} from "vue";
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";
import {languages} from "./languages";
import router from "./router";
import App from "./App.vue";

createApp(App)
    .use(createPinia())
    .use(createI18n({
        legacy: false,
        locale: "zh",
        fallbackLocale: "en",
        messages: languages,
    }))
    .use(router)
    .mount("#app");