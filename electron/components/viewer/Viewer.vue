<template>
    <div>
        <template v-if="$store.state.Viewer.tabs.length > 0">
            <el-tabs tab-position="right"
                     v-model="$store.state.Viewer.activeTab"
                     closable @tab-remove="tabRemove"
                     class="nav_tab">
                <template v-for="tab in $store.state.Viewer.tabs">
                    <el-tab-pane :label="tab.label" :name="tab.name">
                        <el-tooltip slot="label" :content="tab.label">
                            <span>{{truncateLabelStr(tab.label)}}</span>
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
    import {Component, Vue} from "vue-property-decorator";

    import Instance from './Instance.vue';

    @Component({
        components: {
            Instance,
        }
    })
    export default class Viewer extends Vue {
        truncateLabelStr(str: string) {
            return (str.length > 10) ? str.substr(0, 10 - 1) + '...' : str;
        }

        tabRemove(name: string) {
            this.$store.commit('viewerTabRemove', name);
        }
    }
</script>