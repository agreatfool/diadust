<template>
    <div>
        <template v-if="$store.state.Viewer.tabs.length > 0">
            <el-tabs tab-position="right"
                     v-model="$store.state.Viewer.activeTab"
                     closable @tab-remove="tabRemove"
                     style="height: 320px;">
                <el-tab-pane v-for="tab in $store.state.Viewer.tabs" :label="tab.label" :name="tab.name"></el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<style>

</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Viewer extends Vue {
        tabRemove(name: string) {
            this.$store.commit('viewerTabRemove', name);
        }
    }
</script>