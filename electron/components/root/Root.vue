<template>
    <div>
        <el-container>
            <el-header>
                <div v-on:dragover.prevent
                     v-on:drop="drop">
                    <el-row>
                        <el-button-group>
                            <el-button @click="historyBack">
                                <i class="el-icon-arrow-left"></i>
                            </el-button>
                            <el-button @click="historyForward">
                                <i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </el-button-group>
                        <el-button-group style="margin-left: 10px;">
                            <el-button :autofocus="shallButtonFocus('/gallery')" @click="redirect('/gallery')">
                                <i class="el-icon-picture-outline"></i>
                            </el-button>
                            <el-button :autofocus="shallButtonFocus('/viewer')" @click="redirect('/viewer')">
                                <i class="el-icon-view"></i>
                            </el-button>
                            <el-button :autofocus="shallButtonFocus('/setting')" @click="redirect('/setting')">
                                <i class="el-icon-setting"></i>
                            </el-button>
                        </el-button-group>
                        <el-button-group style="float: right;">
                            <el-button v-if="shallDisplayPlusButton()"><i class="el-icon-plus"></i></el-button>
                            <el-button><i class="el-icon-menu"></i></el-button>
                        </el-button-group>
                    </el-row>
                </div>
            </el-header>
            <el-main :style="{height: dynamicMainHeight + 'px'}">
                <router-view class="app-main-router"></router-view>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<style>
    .el-main {
        padding: 0 20px;
    }
    .app-main-router {
        height: 100%;
    }
</style>

<script lang="ts">
    import * as uuidV4 from 'uuid/v4';
    import {Component, Model, Vue} from "vue-property-decorator";

    import {router} from './Router';
    import {store} from './Store';

    import Gallery from '../gallery/Gallery.vue';
    import Setting from '../setting/Setting.vue';
    import Viewer from '../viewer/Viewer.vue';

    // import {LocalImage} from '../../model/Image';
    import {ViewerNavTab} from '../viewer/Store';
    import {DropFiles, handleDropEvent} from '../../lib/Drop';

    @Component({
        router,
        store,
        components: {
            gallery: Gallery,
            setting: Setting,
            viewer: Viewer,
        }
    })
    export default class Root extends Vue {
        @Model() dynamicMainHeight: number = 0;

        historyBack() {
            alert('historyBack');
        }

        historyForward() {
            alert('historyForward');
        }

        shallDisplayPlusButton() {
            return this.$route.path !== '/setting';
        }

        shallButtonFocus(path: string) {
            return this.$route.path === path;
        }

        redirect(path: string) {
            this.$router.push(path);
        }

        drop(event: DragEvent) {
            event.preventDefault();

            const dirs: DropFiles = handleDropEvent(event);
            console.log(dirs);

            // let dirs = {} as {[key: string]: Array<LocalImage>};
            // let files = [] as Array<File>;
            //
            // if (event.dataTransfer.items) {
            //     for (let i = 0; i < event.dataTransfer.items.length; i++) {
            //         const item = event.dataTransfer.items[i] as DataTransferItem;
            //         if (item.kind !== 'file') {
            //             continue;
            //         }
            //
            //         let file: File = item.getAsFile();
            //         if (checkDropFileIsDir(file)) {
            //             readDirFiles
            //         }
            //
            //         if (file) {
            //             files.push(file);
            //         }
            //     }
            // }
            //
            // if (files.length === 0) {
            //     return;
            // }
            //
            // this.$store.commit('viewerTabAdd', {
            //     label: files.length === 1 ? files[0].name : `${files[0].name}...`,
            //     name: uuidV4(),
            // } as ViewerNavTab);
        }

        setDynamicMainHeight() {
            this.dynamicMainHeight = document.documentElement.clientHeight - 60 - 60 - 15; // - header - footer - some_space
        }

        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.setDynamicMainHeight);

                this.setDynamicMainHeight(); // init
            })
        }

        beforeDestroy() {
            window.removeEventListener('resize', this.setDynamicMainHeight);
        }
    }
</script>