import {createRouter, createWebHashHistory} from "vue-router";
import Index from "../pages/index/Index.vue";
import About from "../pages/about/About.vue";


const routes = [
    {
        path: "/",
        component: Index,
        query: {},
        name: "index",
        alias: "/index/",
    },
    {
        path: "/about/",
        component: About,
        query: {},
        name: "about",
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
