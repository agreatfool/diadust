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

export interface NavTab {
    label: string;
    name: string;
}

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store mutations & actions
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const addTab: Mutation<State> = function (state: State, payload: NavTab) {
    state.tabs.push(payload);
};

const removeTab: Mutation<State> = function (state: State, payload: string) {
    state.tabs.forEach((tab, index) => {
        if (tab.name === payload) {
            let nextTab = state.tabs[index + 1] || state.tabs[index - 1];
            if (nextTab) {
                state.activeTab = nextTab.name;
            }
        }
    });
};

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Root store
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export interface State {
    activeTab: string;
    histories: Array<ActionHistory>;
    tabs: Array<NavTab>;
}

export const Store: Module<State, {}> = {
    state: {
        activeTab: 'gallery',
        histories: [],
        tabs: [],
    },
    mutations: {
        addTab,
        removeTab,
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