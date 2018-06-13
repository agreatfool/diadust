<template>
    <div class="viewer">
        <template v-if="$store.state.Gallery.viewers.length > 0">
            <el-tabs tab-position="right"
                     v-model="$store.state.Gallery.activeViewerTab"
                     closable @tab-remove="tabRemove"
                     class="nav_tab">
                <template v-for="gallery in $store.state.Gallery.viewers">
                    <el-tab-pane :label="gallery.name" :name="gallery.id">
                        <el-tooltip slot="label" :content="gallery.name">
                            <span>{{truncateLabelStr(gallery.name)}}</span>
                        </el-tooltip>
                        <gallery :id="gallery.id"></gallery>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </template>
    </div>
</template>

<style>
    .viewer {
        height: 100%;
    }

    .nav_tab {
        height: 100%;
    }

    .el-tabs__content {
        height: 100%;
    }

    .el-tab-pane {
        height: 100%;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    import Gallery from '../gallery/Gallery.vue';

    @Component({
        components: {
            Gallery,
        }
    })
    export default class Viewer extends Vue {
        @Prop({
            default: ''
        }) galleryId: string;

        constructor() {
            super();
            this.galleryId = '';
        }

        truncateLabelStr(str: string) {
            return (str.length > 10) ? str.substr(0, 10 - 1) + '...' : str;
        }

        tabRemove(name: string) {
            this.$store.commit('galleryViewerTabRemove', name);
        }
    }
</script>