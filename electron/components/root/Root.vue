<template>
    <div class="main">
        <el-container v-show="$store.state.Root.image === ''">
            <el-header>
                <div v-on:dragover.prevent
                     v-on:drop="drop">
                    <el-row>
                        <el-button-group>
                            <el-tooltip content="Back" :open-delay="topTooltipDelay">
                                <el-button label="back" @click="historyBack">
                                    <i class="el-icon-arrow-left"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="Forward" :open-delay="topTooltipDelay">
                                <el-button @click="historyForward">
                                    <i class="el-icon-arrow-right el-icon--right"></i>
                                </el-button>
                            </el-tooltip>
                        </el-button-group>
                        <el-button-group style="margin-left: 10px;">
                            <el-tooltip content="Gallery" :open-delay="topTooltipDelay">
                                <el-button @click="redirect('/gallery')">
                                    <i class="el-icon-picture-outline"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="Viewer" :open-delay="topTooltipDelay">
                                <el-button @click="redirect('/viewer')">
                                    <i class="el-icon-view"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="Setting" :open-delay="topTooltipDelay">
                                <el-button @click="redirect('/setting')">
                                    <i class="el-icon-setting"></i>
                                </el-button>
                            </el-tooltip>
                        </el-button-group>
                        <el-button-group style="float: right;">
                            <el-tooltip v-if="shallDisplayPlusButton()" content="Add" :open-delay="topTooltipDelay">
                                <el-button v-if="shallDisplayPlusButton()"><i class="el-icon-plus"></i></el-button>
                            </el-tooltip>
                            <el-tooltip content="Full Screen" :open-delay="topTooltipDelay">
                                <el-button><i class="el-icon-menu"></i></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </el-row>
                </div>
            </el-header>
            <el-main :style="{height: dynamicMainHeight + 'px'}">
                <router-view class="app-main-router"></router-view>
            </el-main>
            <el-footer></el-footer>
        </el-container>
        <image-viewer v-if="$store.state.Root.image !== ''"></image-viewer>
    </div>
</template>

<style>
    .main {
        width: 100%;
        height: 100%;
    }
    .el-main {
        padding: 0 20px;
    }
    .app-main-router {
        height: 100%;
    }
</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    import {router} from './Router';
    import {store} from './Store';

    import Gallery from '../gallery/Gallery.vue';
    import Setting from '../setting/Setting.vue';
    import Viewer from '../viewer/Viewer.vue';
    import ImageViewer from '../gallery/Image.vue';

    import {DropFiles, dropFilesToGalleryType, handleDropEvent} from '../../lib/Drop';

    @Component({
        router,
        store,
        components: {
            'gallery': Gallery,
            'setting': Setting,
            'viewer': Viewer,
            'image-viewer': ImageViewer,
        }
    })
    export default class Root extends Vue {

        private dynamicMainHeight: number = 0;

        private topTooltipDelay = 500; // ms

        // FIXME 历史状态回溯，以及绑定返回前进按钮

        historyBack() {
            alert('historyBack');
        }

        historyForward() {
            alert('historyForward');
        }

        shallDisplayPlusButton() {
            return this.$route.path !== '/setting';
        }

        redirect(path: string) {
            this.$router.push(path);
        }

        drop(event: DragEvent) {
            event.preventDefault();

            const dirs: DropFiles = handleDropEvent(event);
            const galleries = dropFilesToGalleryType(dirs);

            if (galleries.length > 0) {
                galleries.forEach((gallery) => {
                    this.$store.commit('galleryViewerTabAdd', gallery);

                    this.$notify({
                        title: 'Viewer tab added',
                        message: '',
                        type: 'success',
                        duration: 2500
                    });
                });
            }
        }

        setDynamicMainHeight() {
            this.dynamicMainHeight = document.documentElement.clientHeight - 60 - 60 - 15; // - header - footer - some_space
        }

        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.setDynamicMainHeight);

                this.setDynamicMainHeight(); // init
            });

            // FIXME dummy test code, remove later
            setTimeout(() => {
                this.$store.commit('rootImageSet', 'file:///Users/Jonathan/Downloads/test/output1%E7%9A%84%E5%89%AF%E6%9C%AC%2012.webp');
            }, 1000);
        }

        beforeDestroy() {
            window.removeEventListener('resize', this.setDynamicMainHeight);
        }
    }
</script>