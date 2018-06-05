<template>
    <div>
        <el-container>
            <el-header>
                <div v-on:dragover.prevent
                     v-on:drop="drop">
                    <el-row :gutter="10">
                        <el-col :span="1"><el-button type="text" icon="el-icon-arrow-left"></el-button></el-col>
                        <el-col :span="1"><el-button type="text" icon="el-icon-arrow-right"></el-button></el-col>
                        <el-col :span="22">
                            <el-tabs @tab-click="tabClick">
                                <el-tab-pane label="Gallery" name="gallery"></el-tab-pane>
                                <el-tab-pane label="Setting" name="setting"></el-tab-pane>
                                <el-tab-pane label="AAA" name="bbb" closable></el-tab-pane>
                            </el-tabs>
                        </el-col>
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

        // FIXME 感觉不大对，数据和页面的流转还是要再考虑下
        // 主要几点：
        // 所有页面及状态可以根据URL回溯，只要URL一样，渲染的页面应该是一样的
        // 页面内容到底是使用RouterView还是使用ElTab来做，这个要再考虑下

        // FIXME
        // root节点的store应该存两个东西
        // 一个是tab，根据drop打开的东西来新生成component
        // 二是drop事件，根据这个drop事件将不同的内容存储到store里，那么打开的组件就可以应对这些drop内容

        drop(event: DragEvent) {
            event.preventDefault();
            alert('root dropped');
        }

    }
</script>