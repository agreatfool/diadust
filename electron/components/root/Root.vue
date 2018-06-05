<template>
    <div>
        <el-container>
            <el-header>
                <div v-on:dragover.prevent
                     v-on:drop="drop">
                    <el-row>
                        <el-button-group>
                            <el-button @click="historyBack"><i class="el-icon-arrow-left"></i></el-button>
                            <el-button @click="historyForward"><i class="el-icon-arrow-right el-icon--right"></i>
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
    import {AppState, State as RootState, store} from './Store';
    import {NavTab} from "../viewer/Store";

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

        shallButtonFocus(path: string) {
            return this.$route.path === path;
        }

        redirect(path: string) {
            this.$router.push(path);
        }

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

            this.$store.commit('viewerTabAdd', {
                label: files.length === 1 ? files[0].name : `${files[0].name}...`,
                name: uuidv4(),
            } as NavTab);
        }

    }
</script>