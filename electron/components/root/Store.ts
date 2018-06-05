import Vue from "vue";
import Vuex, {Module, Mutation} from "vuex";

import {Store as GalleryStore, State as GalleryState} from "../gallery/Store";
import {Store as SettingStore, State as SettingState} from "../setting/Store";
import {Store as ViewerStore, State as ViewerState} from "../viewer/Store";
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
    mutations: {

    },
    actions: {

    }
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