import Vue from "vue";
import Vuex from "vuex";

import {Store as GalleryStore} from "../gallery/Store";
import {Store as SettingStore} from "../setting/Store";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Gallery: GalleryStore,
        Setting: SettingStore,
    }
});