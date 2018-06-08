import {Action, ActionContext, Module, Mutation} from "vuex";

import {GalleryImage, ImageSearchFilter, /*LocalImage*/} from '../../model/Image';
import {post} from "../../lib/Http";
import {LocalFile} from "../../model/Drop";

// State
export const GALLERY_DEFAULT    = 'gallery';
export const GALLERY_TYPE_FILES = 'files';
export const GALLERY_TYPE_DIR   = 'directory';
export const GALLERY_TYPE_ARCH  = 'archive';

export interface Gallery {
    id: string; // gallery id (uuid), default is 'gallery', means Gallery page, otherwise are Viewer tab pages
    type: string; // default is 'gallery', 'files' | 'directory' | 'archive'
    name: string; // default is 'gallery', files: first file path, dir: dir path, archive: archive file path
    files: Array<GalleryImage | LocalFile>;
    pageNum: number; // last pagination id number, used to recover page status rendering
    releasedFiles?: Array<GalleryImage | LocalFile>; // possibly exists when archive type, released tmp files
}

export interface State {
    gallery: Gallery, // Gallery page
    viewers: Array<Gallery>; // Viewer page, tabs
}

// Mutations
const galleryViewerAdd: Mutation<State> = function (state: State, payload: Gallery) {
    state.viewers.push(payload);
};

// Actions
// const fetchImages: Action<State, {}> = async function (context: ActionContext<State, {}>, payload: ImageSearchFilter): Promise<any> {
//     const images = await post('/image/fetch', {} as ImageSearchFilter);
//     console.log('image data fetched from remote: ', images);
//     context.commit('resetImages', images);
// };

// Store
export const Store: Module<State, {}> = {
    state: {
        gallery: {} as Gallery,
        viewers: []
    },
    mutations: {
        galleryViewerAdd
    },
    actions: {
        // fetchImages
    }
};