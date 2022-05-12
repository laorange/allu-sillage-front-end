import {defineStore} from "pinia";

type State = {}

export const useStore = defineStore('store', {
    state(): State {
        return {}
    },
    getters: {},
    actions: {},
})