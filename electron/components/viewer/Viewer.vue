<template>
    <div class="viewer">
        <template v-if="$store.state.Gallery.viewers.length > 0">
            <el-tabs tab-position="right"
                     v-model="$store.state.Gallery.activeViewerTab"
                     closable @tab-remove="tabRemove"
                     class="nav_tab">
                <template v-for="gallery in $store.state.Gallery.viewers">
                    <el-tab-pane :label="gallery.name" :name="gallery.id" :lazy="beLazy">
                        <el-tooltip slot="label" :content="gallery.name" placement="top">
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
    import {Combo, Listener as KeypressListener} from 'keypress.js';
    import {registerMultiKeyCombo, MultiKeyCombo} from '../../lib/Keyboard';

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

        private keypress: KeypressListener;
        private keypressCombos: Array<MultiKeyCombo>;

        private beLazy: boolean = true;

        constructor() {
            super();

            this.keypress = new KeypressListener();
            this.keypressCombos = [
                {
                    mutliKey: ['cmd w', 'ctrl w'], // close tab
                    event: () => {
                        if (this.$store.state.Gallery.viewingImagePath !== '') {
                            return; // image viewing page, do not handle "cmd w" here
                        }
                        // FIXME e.stopPropagation() 尝试用这个来阻止事件冒泡
                        this.$store.commit('galleryViewerTabRemove');
                    },
                    is_solitary: true,
                } as MultiKeyCombo,
                {
                    mutliKey: ['ctrl tab'], // next tab
                    event: () => {
                        this.$store.commit('galleryViewerTabNext');
                    },
                    is_solitary: true,
                } as MultiKeyCombo,
                {
                    mutliKey: ['ctrl shift tab'], // previous tab
                    event: () => {
                        this.$store.commit('galleryViewerTabPrev');
                    },
                    is_solitary: true,
                } as MultiKeyCombo,
            ];
        }

        truncateLabelStr(str: string) {
            return (str.length > 10) ? str.substr(0, 10 - 1) + '...' : str;
        }

        tabRemove(name: string) {
            this.$store.commit('galleryViewerTabRemove', name);
        }

        mounted() {
            registerMultiKeyCombo(this.keypress, this.keypressCombos);
        }

        beforeDestroy() {
            this.keypress.reset();
        }
    }
</script>