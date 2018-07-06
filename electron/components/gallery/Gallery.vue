<template>
    <div class="gallery"
         v-on:dragover.prevent
         v-on:drop="drop">
        <div v-masonry
             column-width=".grid-sizer"
             transition-duration="0.3s"
             item-selector=".grid-item"
             gutter=".gutter-sizer"
             fit-width=true
             class="grid">
            <div class="grid-sizer"></div>
            <div class="gutter-sizer"></div>
            <div v-masonry-tile class="grid-item" v-for="file in files">
                <img class="grid-item-img" :src="`file://${file.path}`" @click="imgClick" alt="">
            </div>
        </div>
        <el-pagination
                class="pagination"
                v-if="shallDisplayPagination()"
                :current-page.sync="currentPageNum"
                @current-change="handlePageChanged"
                :page-size="itemsPerPage"
                layout="prev, pager, next, jumper"
                :total="totalItemsCount">
        </el-pagination>
    </div>
</template>

<style>
    .gallery {
        height: 100%;
        overflow-y: auto;
    }

    .grid {
        margin: 0 auto;
    }

    .grid-sizer,
    .grid-item {
        width: 200px;
    }

    .grid-item-img {
        max-width: 100%;
        user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .grid-item-img:hover {
        cursor: pointer;
    }

    .gutter-sizer {
        width: 10px;
    }

    .pagination {
        float: right;
        margin-right: 20px;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import fetch from 'node-fetch';
    import {Combo, Listener as KeypressListener} from 'keypress.js';

    import {VueMasonryPlugin} from '../plugin/Masonry';
    import {Gallery as GalleryState, PageNumSet} from './Store';
    import {LocalFile} from '../../model/Drop';
    import {GalleryImage} from '../../model/Image';
    import {convertSrcFilePathToLocalFilePath} from '../../lib/File';
    import {registerMultiKeyCombo, MultiKeyCombo} from '../../lib/Keyboard';
    import {EventBus} from "../../lib/Event";

    Vue.use(VueMasonryPlugin);

    @Component
    export default class Gallery extends Vue {
        @Prop({
            required: false,
            default: 'gallery'
        }) id: string; // gallery id, mapping to $store.state.Gallery.viewers{id, ...}
        @Prop({
            required: false,
            default: 100
        }) itemsPerPage: number;

        private currentPageNum: number = 0;
        private totalItemsCount: number = 0;
        private pageNumChangeList: Array<number> = [];
        private fetchingData: boolean = false;

        private files: Array<GalleryImage | LocalFile> = [];

        private keypress: KeypressListener;
        private keypressCombos: Array<MultiKeyCombo>;

        constructor() {
            super();

            this.keypress = new KeypressListener();
            this.keypressCombos = [
                {
                    mutliKey: ['.'], // '>' next page
                    event: () => {
                        this.onNextPage();
                    },
                    is_solitary: true,
                } as MultiKeyCombo,
                {
                    mutliKey: [','], // '<' previous page
                    event: () => {
                        this.onPrevPage();
                    },
                    is_solitary: true,
                } as MultiKeyCombo,
            ];
        }

        shallDisplayPagination() {
            return this.totalItemsCount > this.itemsPerPage && this.files.length > 0;
        }

        handlePageChanged(pageNum: number) {
            pageNum--; // pageNum in pagination is from 1, shall be from 0 in programming
            this.pageNumChangeList.push(pageNum);
            this.handleAsyncPageChanged();
        }

        handleAsyncPageChanged() {
            if (this.fetchingData || this.pageNumChangeList.length === 0) {
                return; // already handling || nothing to handle
            }

            this.fetchingData = true;
            let targetPageNum = this.pageNumChangeList.shift();
            this.fetchData(targetPageNum).then(() => {
                this.fetchingData = false;
                this.handleAsyncPageChanged();
            });
        }

        onNextPage() {
            const gallery: GalleryState = this.getCurrentGalleryState() as GalleryState;
            if (gallery === null) {
                return;
            }

            let maxPossiblePageNum = this.calcMaxPossiblePageNum();
            let pageNum = gallery.pageNum + 1; // next page
            if (pageNum > maxPossiblePageNum) {
                pageNum = 0;
            }
            this.handlePageChanged(pageNum + 1); // programming => readable
        }

        onPrevPage() {
            const gallery: GalleryState = this.getCurrentGalleryState() as GalleryState;
            if (gallery === null) {
                return;
            }

            let maxPossiblePageNum = this.calcMaxPossiblePageNum();
            let pageNum = gallery.pageNum - 1; // prev page
            if (pageNum < 0) {
                pageNum = maxPossiblePageNum;
            }
            this.handlePageChanged(pageNum + 1); // programming => readable
        }

        async fetchData(pageNum?: number) {
            if (this.id === 'gallery') {
                // await this.fetchGallery(pageNum);
                await this.fetchLocal(pageNum);
            } else {
                await this.fetchLocal(pageNum);
            }
        }

        onImageViewingNext() {
            let foundIndex: number = -1;
            this.files.forEach((file: LocalFile | GalleryImage, index: number) => {
                if (file.path === this.$store.state.Gallery.viewingImagePath) {
                    foundIndex = index;
                }
            });

            if (foundIndex === -1) {
                return; // not found
            }

            let nextIndex = foundIndex + 1;
            if (nextIndex > (this.files.length - 1)) {
                nextIndex = 0;
            }

            this.$store.commit('galleryViewingImageSet', this.files[nextIndex].path);
        }

        onImageViewingPrev() {
            let foundIndex: number = -1;
            this.files.forEach((file: LocalFile | GalleryImage, index: number) => {
                if (file.path === this.$store.state.Gallery.viewingImagePath) {
                    foundIndex = index;
                }
            });

            if (foundIndex === -1) {
                return; // not found
            }

            let nextIndex = foundIndex - 1;
            if (nextIndex < 0) {
                nextIndex = this.files.length - 1;
            }

            this.$store.commit('galleryViewingImageSet', this.files[nextIndex].path);
        }

        mounted() {
            registerMultiKeyCombo(this.keypress, this.keypressCombos);
            EventBus.$on('img-viewing-next', this.onImageViewingNext);
            EventBus.$on('img-viewing-prev', this.onImageViewingPrev);
            this.fetchData().then(_ => _);
        }

        beforeDestroy() {
            this.keypress.reset();
            EventBus.$off('img-viewing-next', this.onImageViewingNext);
            EventBus.$off('img-viewing-prev', this.onImageViewingPrev);
        }

        async fetchGallery(pageNum?: number) {
            // this.isLoading = true;
            // console.log('start fetching');
            //
            // return fetch('https://api.github.com/users?since=' +
            //     `${(this.users.length > 0 && this.users[this.users.length - 1].id) || null}`)
            //     .then(_ => _.json())
            //     .then(result => {
            //         console.log('fetch done');
            //         this.users = [...this.users, ...result];
            //         this.count++;
            //         this.isLoading = false;
            //     });
        }

        async fetchLocal(pageNum?: number) {
            const gallery: GalleryState = this.getCurrentGalleryState() as GalleryState;
            if (gallery === null) {
                return;
            }

            if (pageNum === undefined) {
                pageNum = gallery.pageNum;
            }
            let totalFiles: Array<LocalFile> = gallery.files as Array<LocalFile>;
            this.totalItemsCount = totalFiles.length;

            let maxPossiblePageNum = this.calcMaxPossiblePageNum();
            if (pageNum > maxPossiblePageNum) {
                pageNum = maxPossiblePageNum;
            } else if (pageNum < 0) {
                pageNum = 0;
            }
            this.currentPageNum = pageNum + 1; // programming => readable

            let startPos: number = this.itemsPerPage * pageNum;
            let endPos: number = this.itemsPerPage * (pageNum + 1);
            this.files = totalFiles.slice(startPos, endPos);

            this.$store.commit('galleryPageNumSet', {
                galleryId: this.id,
                pageNum: pageNum,
            } as PageNumSet);
        }

        drop(event: DragEvent) {
            event.preventDefault();
            if (this.id !== 'gallery') {
                return; // only gallery supports drop adding event
            }

            alert('Gallery dropped');
            // TODO 在这里触发往gallery添加图片的事件
        }

        imgClick(event: MouseEvent) {
            // TODO 查看图片
            const filePath = (event.srcElement as any).src;
            if (filePath) {
                this.$store.commit('galleryViewingImageSet', convertSrcFilePathToLocalFilePath(filePath));
            }
        }

        getCurrentGalleryState(): GalleryState | null {
            const id = this.id;
            const viewers = this.$store.state.Gallery.viewers;
            let gallery: GalleryState | null = null;

            viewers.forEach((viewer: GalleryState) => {
                if (viewer.id === id) {
                    gallery = viewer;
                }
            });

            return gallery;
        }

        calcMaxPossiblePageNum() {
            return Math.floor(this.totalItemsCount / this.itemsPerPage);
        }
    }
</script>