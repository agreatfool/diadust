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
                <img class="grid-item-img" :src="`file://${file.path}`" alt="">
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

        private users: Array<any> = [];
        private count: number = 0;

        //FIXME @1 如何处理：当第一次加载数据过少，滚动条不生成的情况下，后续如何触发获取数据事件
        //FIXME @2 如何调整单元格的默认宽度？现在应该是格子内容撑多大，则格子就多大

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

            // FIXME @1 是否在这里进行高度检查？高度不够则继续加载数据
            // const gallery = document.querySelector('.gallery');
            // const grids = document.querySelector('.grid');
            // if (gallery.clientHeight >= grids.clientHeight) {
            //     await this.fetchData();
            // }
        }

        mounted() {
            this.isMounted = true;
            // this.$store.dispatch('fetchImages').then(_ => _);
            console.log('mounted', 'id', this.id, 'isOutofData', this.isOutofData, 'isLoading', this.isLoading);

            // FIXME 使用test在viewer里创建一个tab，按gallery切到gallery页面，再返回viewer，发现显示不正常
            // 多tab和多按钮router之间的状态切换和保留需要制作
        }

        beforeDestroy() {
            const gallery: GalleryState = this.getCurrentGalleryState();

            if (gallery === null || (gallery.pageNum === 1 && gallery.lastPageNum === 0)) {
                // only loaded data once on page initialized, shall not sync lastPageNum,
                // since next page load shall also be treated as new page init,
                // also do't forget reset current page number
                this.$store.commit('galleryViewerPageNumReset', this.id);
                return;
            }

            this.$store.commit('galleryViewerPageNumSync', this.id); // sync page num when leave
        }

        async fetchGallery() {
            this.isLoading = true;
            console.log('start fetching');

            return fetch('https://api.github.com/users?since=' +
                `${(this.users.length > 0 && this.users[this.users.length - 1].id) || null}`)
                .then(_ => _.json())
                .then(result => {
                    console.log('fetch done');
                    this.users = [...this.users, ...result];
                    this.count++;
                    this.isLoading = false;
                });
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

            //FIXME 复位时候文件量大了，页面会卡顿，因为一次性加入的DOM节点过多，需要做异步逐步加入DOM的行为
            let fetched: Array<LocalFile> = files.slice(startPos, endPos);
            if (fetched.length < (endPos - startPos)) {
                this.isOutofData = true;
            }
            console.log('fetchLocal', 'id', this.id, 'lastPageNum', lastPageNum, 'pageNum', pageNum, 'start', startPos, 'end', endPos, 'fetched', fetched.length, 'isOutofData', this.isOutofData);

            this.files = [...this.files, ...fetched];

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
            // 在这里触发往gallery添加图片的事件
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