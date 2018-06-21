<template>
    <div class="gallery" ref="ref"
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
        <mugen-scroll
                class="mugen"
                :handler="fetchData"
                :should-handle="shouldHandleScroll"
                scroll-container="ref">
            {{isOutofData ? `no more data ... ${files.length}` : `loading ... ${files.length}`}}
        </mugen-scroll>
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

    .mugen {
        position: relative;
        padding: 10px;
        font-size: 18px;
        background-color: #F0F0F0;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import fetch from 'node-fetch';
    import MugenScroll from 'vue-mugen-scroll';

    import {VueMasonryPlugin} from '../plugin/Masonry';
    import {Gallery as GalleryState} from './Store';
    import {LocalFile} from '../../model/Drop';
    import {GalleryImage} from '../../model/Image';

    Vue.use(VueMasonryPlugin);

    @Component({
        components: {
            'mugen-scroll': MugenScroll,
        }
    })
    export default class Gallery extends Vue {
        @Prop({
            required: false,
            default: 'gallery'
        }) id: string; // gallery id, mapping to $store.state.Gallery.viewers{id, ...}

        @Prop({
            required: false,
            default: 50
        }) itemsPerFetch: number;

        private isOutofData: boolean = false;
        private isLoading: boolean = false;
        private isMounted: boolean = false;

        private files: Array<GalleryImage | LocalFile> = [];

        constructor() {
            super();
        }

        get shouldHandleScroll() {
            if (this.isOutofData) {
                return false; // run out of data, never handle scroll again
            }

            return !this.isLoading; // handle if not loading
        }

        async fetchData() {
            if (this.id === 'gallery') {
                // await this.fetchGallery();
                await this.fetchLocal();
            } else {
                await this.fetchLocal();
            }
        }

        mounted() {
            this.isMounted = true;
        }

        beforeDestroy() {
            const gallery: GalleryState = this.getCurrentGalleryState();

            if (gallery === null || (gallery.pageNum === 1 && gallery.lastPageNum === 0)) {
                // only loaded data once on page initialized, shall not sync lastPageNum,
                // since next page load shall also be treated as new page init,
                // also do't forget reset current page number
                this.$store.commit('galleryViewerPageNumReset', this.id); // reset
                return;
            }

            this.$store.commit('galleryViewerPageNumSync', this.id); // sync page num when leave
        }

        async fetchGallery() {
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

        async fetchLocal() {
            this.isLoading = true;

            const gallery: GalleryState = this.getCurrentGalleryState();
            if (gallery === null) {
                console.log('fetchLocal, no gallery found');
                this.isOutofData = true;
                return;
            }

            let lastPageNum: number = gallery.lastPageNum;
            let pageNum: number = gallery.pageNum;
            let files: Array<LocalFile> = gallery.files as Array<LocalFile>;

            const initialized = this.isMounted || (lastPageNum === 0 && pageNum === 0);

            let startPos: number;
            let endPos: number;
            if (initialized) {
                startPos = this.itemsPerFetch * pageNum;
                endPos = this.itemsPerFetch * (pageNum + 1);
            } else {
                startPos = 0;
                endPos = this.itemsPerFetch * lastPageNum;
            }

            let fetched: Array<LocalFile> = files.slice(startPos, endPos);
            if (fetched.length < (endPos - startPos)) {
                this.isOutofData = true;
            }

            const handleDataByPage = async () => {
                return new Promise((resolve) => {
                    let spliced = fetched.splice(0, this.itemsPerFetch);
                    this.files = [...this.files, ...spliced];

                    if (fetched.length > 0) {
                        setTimeout(() => {
                            resolve();
                        }, 100); // 100ms
                    } else {
                        resolve();
                    }
                });
            };
            while (fetched.length > 0) {
                await handleDataByPage();
            }

            if (!this.isOutofData && initialized) { // only add page number if data loading is doing after page mounted, means not initializing status
                this.$store.commit('galleryViewerPageNumPlus', this.id);
            }

            this.isLoading = false;
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
            console.log(event);
        }

        getCurrentGalleryState(): GalleryState {
            const id = this.id;
            const viewers = this.$store.state.Gallery.viewers;
            let gallery: GalleryState = null;

            viewers.forEach((viewer: GalleryState) => {
                if (viewer.id === id) {
                    gallery = viewer;
                }
            });

            return gallery;
        }
    }
</script>