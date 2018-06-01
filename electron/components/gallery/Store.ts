import {Action, ActionContext, Module, Mutation} from "vuex";

import {Image} from '../../model/Image';
import {ImageSearchFilter} from '../../model/Query';

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
    // FIXME dummy implementation
    return new Promise(resolve => {
        setInterval(() => {
            context.commit('resetImages', [
                {
                    id: 1,
                    uuid: 'uuid1',
                    originalName: 'originalName1',
                    path: 'path1',
                    tagsList: [],
                    created: 123,
                },
                {
                    id: 2,
                    uuid: 'uuid2',
                    originalName: 'originalName2',
                    path: 'path2',
                    tagsList: [],
                    created: 123,
                },
                {
                    id: 3,
                    uuid: 'uuid3',
                    originalName: 'originalName3',
                    path: 'path3',
                    tagsList: [],
                    created: 123,
                },
            ]);
            resolve();
        }, 200); // 200ms
    });
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