<template>
    <div>
        <template v-if="this.state.tabs.length > 0">
            <el-tabs tab-position="right"
                     v-model="this.state.activeTab"
                     closable @tab-remove="tabRemove"
                     style="height: 320px;">
                <el-tab-pane v-for="tab in this.state.tabs" :label="tab.label" :name="tab.name"></el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<style>

</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {State as ViewerState} from "./Store";
    import {AppState} from "../root/Store";

    @Component
    export default class Viewer extends Vue {

        private state: ViewerState;

        tabRemove(name: string) {
            this.$store.commit('viewerTabRemove', name);
        }

        constructor() {
            super();
            this.state = (this.$store.state as AppState).Viewer;
        }

    }
</script>