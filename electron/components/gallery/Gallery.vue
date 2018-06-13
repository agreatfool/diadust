<template>
    <div class="gallery" ref="ref"
         v-on:dragover.prevent
         v-on:drop="drop">
        <div v-masonry
             transition-duration="0.3s"
             item-selector=".grid-item"
             class="grid">
            <div v-masonry-tile class="grid-item user" v-for="file in files">
                <img class="avatar" :src="`file://${file.path}`" width="200" alt="">
            </div>
        </div>
        <mugen-scroll
                class="mugen"
                :handler="fetchData"
                :should-handle="shouldHandleScroll"
                scroll-container="ref">
            {{isOutofData ? 'no more data' : 'loading ...'}}
        </mugen-scroll>
    </div>
</template>

<style>
    .gallery {
        height: 100%;
        overflow-y: auto;
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
            // this.$store.dispatch('fetchImages').then(_ => _);
            console.log(this.id);

            // FIXME 使用test在viewer里创建一个tab，按gallery切到gallery页面，再返回viewer，发现显示不正常
            // 多tab和多按钮router之间的状态切换和保留需要制作
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
            // const id = this.id;
            const id = this.$store.state.Gallery.activeViewerTab; //FIXME
            const viewers = this.$store.state.Gallery.viewers;
            let gallery: GalleryState;
            let pageNum: number;
            let files: Array<LocalFile>;
            let fetched: Array<LocalFile>;

            viewers.forEach((viewer: GalleryState) => {
                if (viewer.id === id) {
                    gallery = viewer;
                }
            });

            if (!gallery) {
                this.isOutofData = true;
                return;
            }

            pageNum = gallery.pageNum;
            files = gallery.files as Array<LocalFile>;
            fetched = files.slice(this.itemsPerFetch * pageNum, this.itemsPerFetch * (pageNum + 1));

            if (fetched.length < this.itemsPerFetch) {
                this.isOutofData = true;
            }

            this.files = [...this.files, ...fetched];

            this.$store.commit('galleryViewerPageNumPlus', id);
        }

        drop(event: DragEvent) {
            event.preventDefault();
            if (this.id !== 'gallery') {
                return; // only gallery supports drop adding event
            }

            alert('Gallery dropped');
            // 在这里触发往gallery添加图片的事件
        }
    }
</script>