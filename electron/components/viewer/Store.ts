import {Module, Mutation} from "vuex";
import {Gallery} from "../gallery/Store";

// export interface ViewerNavTab {
//     label: string;
//     name: string;
// }

// Mutations
// const viewerGalleryAdd: Mutation<State> = function (state: State, gallery: Gallery) {
//     state.viewers.push(gallery);
//     state.activeViewerTab = gallery.id;
// };
//
// const viewerGalleryRemove: Mutation<State> = function (state: State, galleryId: string) {
//     let foundIndex = -1;
//     state.viewers.forEach((gallery: Gallery, index: number) => {
//         if (gallery.id === galleryId) {
//             foundIndex = index;
//         }
//     });
//
//     if (foundIndex !== -1) {
//         let nextGallery = state.viewers[foundIndex + 1] || state.viewers[foundIndex - 1];
//         state.viewers.splice(foundIndex, 1);
//         state.activeViewerTab = nextGallery ? nextGallery.id : '';
//     }
// };
// const viewerActivateTab: Mutation<State> = function (state: State, galleryId: string) {
//     state.activeTab = galleryId; // Gallery.id
// };

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
    // viewers: Array<Gallery>; // Viewer page, tabs
    // activeViewerTab: string; // Viewer page, activated tab id (gallery id)
}

// Store
export const Store: Module<State, {}> = {
    state: {
        // activeTab: '',
        // tabs: [],
        // viewers: [],
        // activeViewerTab: '',
    } as State,
    mutations: {
        // viewerActivateTab,
        // viewerTabAdd,
        // viewerTabRemove,
        // viewerGalleryAdd,
        // viewerGalleryRemove,
    },
    actions: {}
};