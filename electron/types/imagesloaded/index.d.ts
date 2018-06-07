// There is official "@types/imagesloaded" signature, but it's not good.
// Use current self defined signature only when need to corporate with directive "../../components/plugin/Masonry.ts".
// Do not use this signature directly in production.
// If you use official lib "imagesloaded", please use official signature, current file is not fully completed.

declare module "imagesloaded" {
    type ElementSelector = Element | NodeList | Array<Element> | string;

    interface ImagesLoadedCallback {
        (instance?: ImagesLoaded): void;
    }

    export default class ImagesLoaded {
        constructor(elem: ElementSelector, callback?: ImagesLoadedCallback);
    }
}