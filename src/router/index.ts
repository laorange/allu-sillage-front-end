import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Index from "../pages/index/Index.vue";
import About from "../pages/about/About.vue";
import CourseMobile from "../pages/course/mobile/CourseMobile.vue";
import CoursePc from "../pages/course/pc/CoursePc.vue";

import constants from "../assets/constants.json";

const THRESHOLD_WIDTH_OF_PC = constants.THRESHOLD_WIDTH_OF_PC;

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Index,
        name: "index",
        alias: "/index/",
    },
    {
        path: "/about/",
        component: About,
        name: "about",
    },
    {
        path: "/course/",
        component: CoursePc,
        name: "course-pc",
        alias: "/course/pc/",
        beforeEnter(to, from) {
            if (from.name === "course-mobile") {
                // 如果是从手机端界面跳转过来的，则允许小屏幕设备访问`course-pc`
                return true;
            }
            if (window.innerWidth <= THRESHOLD_WIDTH_OF_PC) {
                // 屏幕宽度小于`THRESHOLD_WIDTH_OF_PC`时，跳转到手机端
                return {name: "course-mobile", query: to.query, params: to.params};
            }
        },
    },
    {
        path: "/course/mobile/",
        component: CourseMobile,
        name: "course-mobile",
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
