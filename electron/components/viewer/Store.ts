import {Module, Mutation} from "vuex";

// export interface ViewerNavTab {
//     label: string;
//     name: string;
// }

// Mutations
const viewerActivateTab: Mutation<State> = function (state: State, payload: string) {
    state.activeTab = payload; // Gallery.id
};

// const viewerTabAdd: Mutation<State> = function (state: State, payload: ViewerNavTab) {
//     state.tabs.push(payload);
//     state.activeTab = payload.name;
// };
//
// const viewerTabRemove: Mutation<State> = function (state: State, payload: string) {
//     let foundIndex = -1;
//     state.tabs.forEach((tab: ViewerNavTab, index: number) => {
//         if (tab.name === payload) {
//             foundIndex = index;
//         }
//     });
//
//     if (foundIndex !== -1) {
//         let nextTab = state.tabs[foundIndex + 1] || state.tabs[foundIndex - 1];
//         state.tabs.splice(foundIndex, 1);
//         state.activeTab = nextTab ? nextTab.name : '';
//     }
// };

// State
export interface State {
    activeTab: string;
}

// Store
export const Store: Module<State, {}> = {
    state: {
        activeTab: '',
        // tabs: [],
    } as State,
    mutations: {
        viewerActivateTab,
        // viewerTabAdd,
        // viewerTabRemove,
    },
    actions: {}
};