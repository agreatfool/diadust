<template>
    <div>
        <el-container>
            <el-header>
                <div v-on:dragover.prevent
                     v-on:drop="drop">
                    <el-tabs @tab-click="tabClick">
                        <el-tab-pane label="Gallery" name="gallery"></el-tab-pane>
                        <el-tab-pane label="Setting" name="setting"></el-tab-pane>
                        <el-tab-pane label="AAA" name="bbb" closable></el-tab-pane>
                    </el-tabs>
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
    import {Component, Vue} from "vue-property-decorator";

    import {ElTabPane} from "element-ui/types/tab-pane";

    import Gallery from '../gallery/Gallery.vue';
    import Setting from '../setting/Setting.vue';
    import ImageViewer from '../image/Image.vue';
    import ArchiveViewer from '../archive/Archive.vue';

    import {router} from './Router';
    import {store} from './Store';

    @Component({
        router,
        store,
        components: {
            Gallery,
            Setting,
            ImageViewer,
            ArchiveViewer,
        }
    })
    export default class Root extends Vue {

        // FIXME closable tabs shall be added & removed by programming, see: http://element-cn.eleme.io/#/zh-CN/component/tabs
        tabClick(tab: ElTabPane) {
            this.$router.push(`/${tab.label}`);
        }

        drop(event: DragEvent) {
            event.preventDefault();
            alert('root dropped');
        }

    }
</script>