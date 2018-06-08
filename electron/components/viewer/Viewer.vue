<template>
    <div>
        <template v-if="$store.state.Gallery.viewers.length > 0">
            <el-tabs tab-position="right"
                     v-model="$store.state.Gallery.activeViewerTab"
                     closable @tab-remove="tabRemove"
                     class="nav_tab">
                <template v-for="tab in $store.state.Gallery.viewers">
                    <el-tab-pane :label="tab.name" :name="tab.id">
                        <el-tooltip slot="label" :content="tab.name">
                            <span>{{truncateLabelStr(tab.name)}}</span>
                        </el-tooltip>
                        <instance></instance>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </template>
    </div>
</template>

<style>
    .nav_tab {
        height: 320px;
    }
</style>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    import Instance from './Instance.vue';

    @Component({
        components: {
            Instance,
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
            this.$store.commit('galleryViewerRemove', name);
        }
    }
</script>