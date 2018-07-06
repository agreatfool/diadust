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
    pageNum: number; // current page number, used to fetch data
    imageNum: number; // current viewing image position number
    releasedFiles?: Array<GalleryImage | LocalFile>; // possibly exists when archive type, released tmp files
}

export interface State {
    gallery: Gallery, // Gallery page
    viewers: Array<Gallery>; // Viewer page: tabs
    activeViewerTab: string; // Viewer page: activated tab id (gallery id)
    viewingImagePath: string; // Current viewing image path
    viewingGalleryId: string; // Current viewing image belongs to which gallery
}

// Mutations
// Viewer Mutations
const galleryViewerTabAdd: Mutation<State> = function (state: State, gallery: Gallery) {
    state.viewers.push(gallery);
    state.activeViewerTab = gallery.id;
};

const galleryViewerTabRemove: Mutation<State> = function (state: State, galleryId?: string) {
    if (galleryId === undefined) {
        galleryId = state.activeViewerTab;
    }

    let {index} = getTargetViewerData(state, galleryId);

    if (index !== -1) {
        let nextTab = state.viewers[index + 1] || state.viewers[index - 1];
        state.viewers.splice(index, 1);
        state.activeViewerTab = nextTab ? nextTab.id : '';
    }
};

const galleryViewerTabNext: Mutation<State> = function (state: State) {
    let {index} = getTargetViewerData(state, state.activeViewerTab);

    if (index !== -1) {
        let nextIndex = index + 1;
        if (nextIndex >= state.viewers.length) {
            nextIndex = 0;
        }

        state.activeViewerTab = state.viewers[nextIndex].id;
    }
};

const galleryViewerTabPrev: Mutation<State> = function (state: State) {
    let {index} = getTargetViewerData(state, state.activeViewerTab);

    if (index !== -1) {
        let nextIndex = index - 1;
        if (nextIndex < 0) {
            nextIndex = state.viewers.length - 1;
        }

        state.activeViewerTab = state.viewers[nextIndex].id;
    }
};

// Gallery Mutations
export interface PageNumSet {
    galleryId: string;
    pageNum: number;
}
const galleryPageNumSet: Mutation<State> = function (state: State, query: PageNumSet) {
    let gallery: Gallery;

    if (query.galleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else {
        let {viewer} = getTargetViewerData(state, query.galleryId);
        gallery = viewer;
    }

    if (!gallery) {
        return;
    }

    gallery.pageNum = query.pageNum;
};

export interface ViewingImageQuery {
    filePath: string;
    galleryId: string;
}

const gallerySetViewingImage: Mutation<State> = function (state: State, query: ViewingImageQuery) {
    let gallery: Gallery;

    if (query.galleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else if (query.galleryId === '' && state.viewingGalleryId) {
        let {viewer} = getTargetViewerData(state, state.viewingGalleryId);
        gallery = viewer;
    } else {
        let {viewer} = getTargetViewerData(state, query.galleryId);
        gallery = viewer;
    }

    if (!gallery) {
        return;
    }

    if (query.filePath === '') {
        gallery.imageNum = 0;
        state.viewingImagePath = '';
        state.viewingGalleryId = '';
    } else {
        let foundIndex = -1;
        gallery.files.forEach((file: GalleryImage | LocalFile, index: number) => {
            if (file.path === query.filePath) {
                foundIndex = index;
            }
        });

        gallery.imageNum = foundIndex;
        state.viewingImagePath = query.filePath;
        state.viewingGalleryId = query.galleryId;
    }
};

const galleryNextImage: Mutation<State> = function (state: State) {
    let gallery: Gallery;

    if (state.viewingGalleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else {
        let {viewer} = getTargetViewerData(state, state.viewingGalleryId);
        gallery = viewer;
    }

    if (!gallery) {
        return;
    }

    gallery.imageNum < gallery.files.length - 1 ? gallery.imageNum++ : '';
    state.viewingImagePath = gallery.files[gallery.imageNum].path;
};

const galleryPrevImage: Mutation<State> = function (state: State) {
    let gallery: Gallery;

    if (state.viewingGalleryId === GALLERY_DEFAULT) {
        gallery = state.gallery;
    } else {
        let {viewer} = getTargetViewerData(state, state.viewingGalleryId);
        gallery = viewer;
    }

    if (!gallery) {
        return;
    }

    gallery.imageNum > 0 ? gallery.imageNum-- : '';
    state.viewingImagePath = gallery.files[gallery.imageNum].path;
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
        viewingImagePath: '',
        viewingGalleryId: '',
    },
    mutations: {
        galleryViewerTabAdd,
        galleryViewerTabRemove,
        galleryViewerTabNext,
        galleryViewerTabPrev,
        galleryPageNumSet,
        gallerySetViewingImage,
        galleryNextImage,
        galleryPrevImage,
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
        pageNum: 0,
        imageNum: 0,
    } as Gallery;
};