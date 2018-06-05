import Vue from "vue";
import Vuex, {Module} from "vuex";

import {Store as GalleryStore} from "../gallery/Store";
import {Store as SettingStore} from "../setting/Store";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Gallery: GalleryStore,
        Setting: SettingStore,
    }
});

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root self store
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// State
export interface State {

}

// Store
export const Store: Module<State, {}> = {
    state: {

    },
    mutations: {

    },
    actions: {

    }
};