import Vue from "vue";
import Vuex, {Module} from "vuex";

import {Store as GalleryStore} from "../gallery/Store";
import {Store as SettingStore, Options as SettingOptions} from "../setting/Store";
import {ImageSearchFilter} from "../../model/Query";
import {DropItems} from "../../model/Drop";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Gallery: GalleryStore,
        Setting: SettingStore,
    }
});

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store types
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
interface ActionHistory {
    type: 'Gallery' | 'Setting' | 'Image' | 'Archive';
    data: ImageSearchFilter | SettingOptions | DropItems;
}

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store mutations & actions
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root self store
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// State
export interface State {
    histories: Array<ActionHistory>;
}

// Store
export const Store: Module<State, {}> = {
    state: {
        histories: []
    },
    mutations: {

    },
    actions: {

    }
};