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
    activeViewerTab: string; // Viewer page, activated tab id (gallery id)
}

// Mutations
const galleryViewerAdd: Mutation<State> = function (state: State, gallery: Gallery) {
    state.viewers.push(gallery);
    state.activeViewerTab = gallery.id;
};

const galleryViewerRemove: Mutation<State> = function (state: State, galleryId: string) {
    let foundIndex = -1;
    state.viewers.forEach((gallery: Gallery, index: number) => {
        if (gallery.id === galleryId) {
            foundIndex = index;
        }
    });

    if (foundIndex !== -1) {
        let nextTab = state.viewers[foundIndex + 1] || state.viewers[foundIndex - 1];
        state.viewers.splice(foundIndex, 1);
        state.activeViewerTab = nextTab ? nextTab.id : '';
    }
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
        viewers: [],
        activeViewerTab: '',
    },
    mutations: {
        galleryViewerAdd,
        galleryViewerRemove
    },
    actions: {
        // fetchImages
    }
};