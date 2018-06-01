import {Action, ActionContext, Module, Mutation} from "vuex";

import {Image} from '../../model/Image';
import {ImageSearchFilter} from '../../model/Query';
import {post} from "../../http/Http";

// State
export interface State {
    images: Array<Image>;
}

// Mutations
const resetImages: Mutation<State> = function (state: State, payload: Array<Image>) {
    state.images = payload;
};

// Actions
const fetchImages: Action<State, {}> = async function (context: ActionContext<State, {}>, payload: ImageSearchFilter): Promise<any> {
    const images = await post('/image/fetch', {} as ImageSearchFilter);
    console.log('image data fetched from remote: ', images);
    context.commit('resetImages', images);
};

// Store
export const Store: Module<State, {}> = {
    state: {
        images: []
    },
    mutations: {
        resetImages
    },
    actions: {
        fetchImages
    }
};