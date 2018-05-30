<template>
    <div>
        <el-container>
            <el-header>
                <el-tabs @tab-click="tabClick">
                    <el-tab-pane label="Gallery" name="gallery"></el-tab-pane>
                    <el-tab-pane label="Setting" name="setting"></el-tab-pane>
                    <el-tab-pane label="AAA" name="bbb" closable></el-tab-pane>
                </el-tabs>
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

    import {router} from './Router';
    import {store} from './Store';

    @Component({
        router,
        store,
        components: {
            Gallery,
            Setting
        }
    })
    export default class Root extends Vue {

        // FIXME closable tabs shall be added & removed by programming, see: http://element-cn.eleme.io/#/zh-CN/component/tabs
        tabClick(tab: ElTabPane) {
            this.$router.push(`/${tab.label}`);
        }

    }
</script>