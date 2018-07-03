import {Action, ActionContext, Module, Mutation} from "vuex";

import {GalleryImage, ImageSearchFilter, /*LocalImage*/} from '../../model/Image';
import {post} from "../../lib/Http";
import {LocalFile} from "../../model/Drop";

import * as uuidV4 from 'uuid/v4';

// State
export const GALLERY_DEFAULT    = 'gallery';
export const GALLERY_TYPE_FILES = 'files';
export const GALLERY_TYPE_DIR   = 'directory';
export const GALLERY_TYPE_ARCH  = 'archive';

export interface Gallery {
    id: string; // gallery id (uuid), default is 'gallery', means Gallery page, otherwise are Viewer tab pages
    type: string; // possible value: 'gallery' | 'files' | 'directory' | 'archive'
    name: string; // possible value: 'gallery' | files: first file path | dir: dir path | archive: archive file path
    files: Array<GalleryImage | LocalFile>;
    lastPageNum: number; // last pagination id number, used to recover page status rendering
    pageNum: number; // current page number, used to fetch data
    releasedFiles?: Array<GalleryImage | LocalFile>; // possibly exists when archive type, released tmp files
}

export interface State {
    gallery: Gallery, // Gallery page
    viewers: Array<Gallery>; // Viewer page: tabs
    activeViewerTab: string; // Viewer page: activated tab id (gallery id)
}

// Mutations
const galleryViewerTabAdd: Mutation<State> = function (state: State, gallery: Gallery) {
    state.viewers.push(gallery);
    state.activeViewerTab = gallery.id;
};

const galleryViewerTabRemove: Mutation<State> = function (state: State, galleryId: string) {
    let {index} = getTargetViewerData(state, galleryId);

    if (index !== -1) {
        let nextTab = state.viewers[index + 1] || state.viewers[index - 1];
        state.viewers.splice(index, 1);
        state.activeViewerTab = nextTab ? nextTab.id : '';
    }
};

const galleryPageNumPlus: Mutation<State> = function (state: State, galleryId: string) {
    let gallery: Gallery;

    if (galleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else {
        let {viewer} = getTargetViewerData(state, galleryId);
        gallery = viewer;
    }

    gallery.pageNum++;
};

const galleryPageNumReset: Mutation<State> = function (state: State, galleryId: string) {
    let gallery: Gallery;

    if (galleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else {
        let {viewer} = getTargetViewerData(state, galleryId);
        gallery = viewer;
    }

    gallery.pageNum = 0;
};

const galleryPageNumSync: Mutation<State> = function (state: State, galleryId: string) {
    let gallery: Gallery;

    if (galleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else {
        let {viewer} = getTargetViewerData(state, galleryId);
        gallery = viewer;
    }

    gallery.lastPageNum = gallery.pageNum;
};

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
        galleryViewerTabAdd,
        galleryViewerTabRemove,
        galleryPageNumPlus,
        galleryPageNumReset,
        galleryPageNumSync,
    },
    actions: {
        // fetchImages
    }
};

// Utility
const getTargetViewerData = function (state: State, galleryId: string) {
    let foundIndex = -1;
    state.viewers.forEach((gallery: Gallery, index: number) => {
        if (gallery.id === galleryId) {
            foundIndex = index;
        }
    });
    return {
        viewer: state.viewers[foundIndex],
        index: foundIndex
    };
};

export const createNewGallery = function (type: string, name: string, files: Array<GalleryImage | LocalFile>) {
    return {
        id: uuidV4(),
        type: type,
        name: name,
        files: files,
        lastPageNum: 0,
        pageNum: 0,
        imageNum: 0,
    } as Gallery;
};