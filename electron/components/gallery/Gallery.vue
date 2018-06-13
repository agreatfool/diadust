<template>
    <div class="gallery" ref="ref"
         v-on:dragover.prevent
         v-on:drop="drop">
        <div v-masonry
             transition-duration="0.3s"
             item-selector=".grid-item"
             class="grid">
            <div v-masonry-tile class="grid-item user" v-for="user in users">
                <img class="avatar" :src="user.avatar_url" height="40" alt="">
                <h2>{{ user.login }}</h2>
            </div>
        </div>
        <mugen-scroll
                class="mugen"
                :handler="fetchData"
                :should-handle="!isLoading"
                scroll-container="ref">
            loading
        </mugen-scroll>
    </div>
</template>

<style>
    .gallery {
        height: 100%;
        overflow-y: auto;
    }

    .grid {
        height: 100%;
    }

    .mugen {
        position: relative;
        padding: 10px;
        font-size: 18px;
        background-color: #f0f0f0;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {VueMasonryPlugin} from '../plugin/Masonry';

    import fetch from 'node-fetch';

    import MugenScroll from 'vue-mugen-scroll';

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
        }) id: string = 'gallery'; // gallery id, mapping to $store.state.Gallery.galleries{id, ...}

        private isLoading: boolean = false;

        private users: Array<any> = [];
        private count: number = 0;

        //FIXME @1 如何处理：当第一次加载数据过少，滚动条不生成的情况下，后续如何触发获取数据事件
        //FIXME @2 如何调整单元格的默认宽度？现在应该是格子内容撑多大，则格子就多大

        constructor() {
            super();
        }

        async fetchData() {
            this.isLoading = true;
            console.log('start fetching');
            fetch(`https://api.github.com/users?since=${(this.users.length > 0 && this.users[this.users.length - 1].id) || null}`).then(_ => _.json()).then(result => {
                console.log('fetch done');
                this.users = [...this.users, ...result];
                this.count++;
                this.isLoading = false;
            });
            // FIXME @1 是否在这里进行高度检查？高度不够则继续加载数据
        }

        mounted() {
            // this.$store.dispatch('fetchImages').then(_ => _);
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