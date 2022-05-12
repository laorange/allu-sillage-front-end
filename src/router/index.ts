import {createRouter, createWebHashHistory} from 'vue-router'
import Index from "../pages/index/Index.vue";


const routes = [
    {
        path: '/',
        component: Index,
        query: {},
        name: 'index',
        alias: '/index/'
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
