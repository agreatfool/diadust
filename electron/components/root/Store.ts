import Vue from "vue";
import Vuex, {Module} from "vuex";

import {State as GalleryState, Store as GalleryStore} from "../gallery/Store";
import {State as SettingState, Store as SettingStore} from "../setting/Store";
import {State as ViewerState, Store as ViewerStore} from "../viewer/Store";
import {ImageSearchFilter} from "../../model/Query";
import {DropItems} from "../../model/Drop";

Vue.use(Vuex);

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store types
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
interface ActionHistory {
    type: 'Gallery' | 'Setting' | 'Image' | 'Archive';
    data: ImageSearchFilter | SettingState | DropItems;
}

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store mutations & actions
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export interface State {
    histories: Array<ActionHistory>;
}

export const Store: Module<State, {}> = {
    state: {
        histories: [],
    },
    mutations: {},
    actions: {}
};

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Global
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export interface AppState {
    Root: State;
    Gallery: GalleryState;
    Setting: SettingState;
    Viewer: ViewerState;
}

export const store = new Vuex.Store({
    modules: {
        Root: Store,
        Gallery: GalleryStore,
        Setting: SettingStore,
        Viewer: ViewerStore,
    }
});