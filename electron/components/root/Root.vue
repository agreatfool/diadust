<template>
    <div>
        <el-container>
            <el-header>
                <div v-on:dragover.prevent
                     v-on:drop="drop">
                    <el-row>
                        <!--<el-col :span="2" class="btn_top"><el-button plain size="small" icon="el-icon-arrow-left"></el-button></el-col>-->
                        <!--<el-col :span="2" class="btn_top"><el-button plain size="small" icon="el-icon-arrow-right"></el-button></el-col>-->
                        <!--<el-col :span="18">-->
                        <!--<el-tabs v-model="this.state.activeTab" @tab-click="tabClick">-->
                        <!--<el-tab-pane label="Gallery" name="gallery"></el-tab-pane>-->
                        <!--<el-tab-pane label="Setting" name="setting"></el-tab-pane>-->
                        <!--<el-tab-pane v-for="tab in this.state.tabs" :label="tab.label" :name="tab.name" closable editable @edit="tabEdit">-->
                        <!--<image-viewer></image-viewer>-->
                        <!--</el-tab-pane>-->
                        <!--</el-tabs>-->
                        <!--</el-col>-->
                        <!--<el-col :span="2" class="btn_top"><el-button plain size="small" icon="el-icon-circle-plus-outline"></el-button></el-col>-->
                        <!--<el-col :span="14" type="flex" justify="start">-->
                        <el-button-group>
                            <el-button @click="historyBack"><i class="el-icon-arrow-left"></i></el-button>
                            <el-button @click="historyForward"><i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </el-button-group>
                        <el-button-group style="margin-left: 10px;">
                            <router-link :to="{path: '/gallery'}">
                                <el-button :autofocus="true">
                                    <i class="el-icon-picture-outline"></i>
                                </el-button>
                            </router-link>
                            <router-link :to="{path: '/viewer'}">
                                <el-button>
                                    <i class="el-icon-view"></i>
                                </el-button>
                            </router-link>
                            <router-link :to="{path: '/setting'}">
                                <el-button>
                                    <i class="el-icon-setting"></i>
                                </el-button>
                            </router-link>
                        </el-button-group>
                        <el-button-group style="float: right;">
                            <el-button><i class="el-icon-plus"></i></el-button>
                            <el-button><i class="el-icon-menu"></i></el-button>
                        </el-button-group>
                    </el-row>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<style>
</style>

<script lang="ts">
    import * as uuidv4 from 'uuid/v4';
    import {Component, Vue} from "vue-property-decorator";

    import Gallery from '../gallery/Gallery.vue';
    import Setting from '../setting/Setting.vue';
    import Viewer from '../viewer/Viewer.vue';

    import {router} from './Router';
    import {AppState, NavTab, State as RootState, store} from './Store';

    @Component({
        router,
        store,
        components: {
            Gallery,
            Setting,
            Viewer,
        }
    })
    export default class Root extends Vue {

        private state: RootState;

        constructor() {
            super();
            this.state = (this.$store.state as AppState).Root;
        }

        historyBack() {
            alert('historyBack');
        }

        historyForward() {
            alert('historyForward');
        }

        tabEdit(name: string, action: string) {
            if (action !== 'remove') {
                return;
            }
            this.$store.commit('removeTab', name);
        }

        // FIXME 感觉不大对，数据和页面的流转还是要再考虑下
        // 主要几点：
        // 所有页面及状态可以根据URL回溯，只要URL一样，渲染的页面应该是一样的
        // 页面内容到底是使用RouterView还是使用ElTab来做，这个要再考虑下

        // FIXME
        // root节点的store应该存两个东西
        // 一个是tab，根据drop打开的东西来新生成component
        // 二是drop事件，根据这个drop事件将不同的内容存储到store里，那么打开的组件就可以应对这些drop内容

        drop(ev: DragEvent) {
            ev.preventDefault();
            alert('root dropped');

            let files = [] as Array<File>;
            if (ev.dataTransfer.items) {
                for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                    if (ev.dataTransfer.items[i].kind !== 'file') {
                        continue;
                    }
                    let file = ev.dataTransfer.items[i].getAsFile();
                    if (file) {
                        files.push(file);
                    }
                }
            }

            if (files.length === 0) {
                return;
            }

            this.$store.commit('addTab', {
                label: files.length === 1 ? files[0].name : `${files[0].name}...`,
                name: uuidv4(),
            } as NavTab);
        }

    }
</script>