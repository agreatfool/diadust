import {Module, Mutation} from "vuex";

export interface NavTab {
    label: string;
    name: string;
}

// Mutations
const viewerTabAdd: Mutation<State> = function (state: State, payload: NavTab) {
    state.tabs.push(payload);
    state.activeTab = payload.name;
};

const viewerTabRemove: Mutation<State> = function (state: State, payload: string) {
    let foundIndex = -1;
    state.tabs.forEach((tab: NavTab, index: number) => {
        if (tab.name === payload) {
            foundIndex = index;
        }
    });

    if (foundIndex !== -1) {
        let nextTab = state.tabs[foundIndex + 1] || state.tabs[foundIndex - 1];
        state.tabs.splice(foundIndex, 1);
        state.activeTab = nextTab.name ? nextTab.name : '';
    }
};

// State
export interface State {
    activeTab: string;
    tabs: Array<NavTab>;
}

// Store
export const Store: Module<State, {}>  = {
    state: {
        activeTab: '',
        tabs: [],
    } as State,
    mutations: {
        viewerTabAdd,
        viewerTabRemove,
    },
    actions: {

    }
};