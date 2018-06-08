import {Action, ActionContext, Module, Mutation} from "vuex";

import {GalleryImage, ImageSearchFilter, /*LocalImage*/} from '../../model/Image';
import {post} from "../../lib/Http";

// State
export interface Gallery {
    id: string; // gallery id, default is 'gallery', means Gallery page, otherwise are Viewer tab pages
    files: Array<GalleryImage /*| LocalImage*/>;
    pageId: number; // last pagination id, used to recover page status rendering
    directory?: string; // shall have value when dir dropped | added
}

export interface State {
    lastGalleryId: string;
    galleries: Array<Gallery>;
}

// // Mutations
// const resetImages: Mutation<State> = function (state: State, payload: Array<GalleryImage>) {
//     state.images = payload;
// };
//
// // Actions
// const fetchImages: Action<State, {}> = async function (context: ActionContext<State, {}>, payload: ImageSearchFilter): Promise<any> {
//     const images = await post('/image/fetch', {} as ImageSearchFilter);
//     console.log('image data fetched from remote: ', images);
//     context.commit('resetImages', images);
// };

// Store
export const Store: Module<State, {}> = {
    state: {
        lastGalleryId: '',
        galleries: []
    },
    mutations: {
        // resetImages
    },
    actions: {
        // fetchImages
    }
};