///<reference path="../../../node_modules/vue/types/vnode.d.ts"/>

import ImagesLoaded from 'imagesloaded'
import * as Masonry from 'masonry-layout';
import {VueConstructor} from "vue/types/vue";
import {DirectiveFunction} from "vue/types/options";
import {VNodeDirective} from "vue/types/vnode";

interface Options {
    columnWidth: number;
    transitionDuration: string;
    itemSelector: string;
    originLeft: boolean;
    originTop: boolean;
    fitWidth: boolean;
    stamp: string;
    gutter: number;
    percentPosition: boolean;
    horizontalOrder: boolean;

    [key: string]: ValidOptionValue;
}

type ValidOptionValue = number | string | boolean;

const attributesMap: { [key: string]: string } = {
    'column-width': 'columnWidth',
    'transition-duration': 'transitionDuration',
    'item-selector': 'itemSelector',
    'origin-left': 'originLeft',
    'origin-top': 'originTop',
    'fit-width': 'fitWidth',
    'stamp': 'stamp',
    'gutter': 'gutter',
    'percent-position': 'percentPosition',
    'horizontal-order': 'horizontalOrder',
};
const EVENT_ADD = 'vuemasonry.itemAdded';
const EVENT_REMOVE = 'vuemasonry.itemRemoved';
const EVENT_IMAGE_LOADED = 'vuemasonry.imageLoaded';
const EVENT_DESTROY = 'vuemasonry.destroy';

const collectOptions = function (attrs: NamedNodeMap) {
    let res = {} as Options;
    const attributesArray: Array<Attr> = Array.prototype.slice.call(attrs);
    attributesArray.forEach(function (attr: Attr) {
        if (Object.keys(attributesMap).indexOf(attr.name) > -1) {
            res[attributesMap[attr.name]] = attr.value;
        }
    });
    return res;
};

const install = function (Vue: VueConstructor) {
    const Events = new Vue();

    Vue.directive('masonry', {
        // props: ['transitionDuration', 'itemSelector'],
        inserted: function (el: HTMLElement, binding: VNodeDirective) {
            if (!Masonry) {
                throw new Error('Masonry plugin is not defined. Please check it\'s connected and parsed correctly.')
            }

            const options = collectOptions(el.attributes) as Options;
            const masonry = new Masonry(el, options);

            const masonryDraw = function () {
                (masonry as any).reloadItems();
                (masonry as any).layout();
            };

            // usage: <div v-masonry:complete="layoutCompleted" ...></div>
            const onLayoutCompleted = function (laidOutItems: Array<any>) {
                binding.value(laidOutItems);
            };
            if (binding.arg === 'complete' && typeof binding.value === 'function') {
                (masonry as any).on('layoutComplete', onLayoutCompleted);
            }

            Vue.nextTick(function () {
                masonryDraw();
            });
            const masonryRedrawHandler = function () {
                masonryDraw();
            };
            const masonryDestroyHandler = function () {
                Events.$off(EVENT_ADD, masonryRedrawHandler);
                Events.$off(EVENT_REMOVE, masonryRedrawHandler);
                Events.$off(EVENT_IMAGE_LOADED, masonryRedrawHandler);
                Events.$off(EVENT_DESTROY, masonryDestroyHandler);
                (masonry as any).off('layoutComplete', onLayoutCompleted);
                (masonry as any).destroy();
            };

            Events.$on(EVENT_ADD, masonryRedrawHandler);
            Events.$on(EVENT_REMOVE, masonryRedrawHandler);
            Events.$on(EVENT_IMAGE_LOADED, masonryRedrawHandler);
            Events.$on(EVENT_DESTROY, masonryDestroyHandler);
        } as DirectiveFunction,
        unbind: function () {
            Events.$emit(EVENT_DESTROY);
        } as DirectiveFunction
    });

    Vue.directive('masonryTile', {
        inserted: function (el: HTMLElement) {
            Events.$emit(EVENT_ADD, {
                'element': el
            });
            // eslint-disable-next-line
            new ImagesLoaded(el, function () {
                Events.$emit(EVENT_IMAGE_LOADED, {
                    'element': el
                });
            });
        } as DirectiveFunction,
        unbind: function (el: HTMLElement) {
            Events.$emit(EVENT_REMOVE, {
                'element': el
            });
        } as DirectiveFunction
    });

    Vue.prototype.$redrawVueMasonry = function () {
        Events.$emit(EVENT_ADD);
    };
};

export const VueMasonryPlugin = function () {
};
(VueMasonryPlugin as any).install = install;