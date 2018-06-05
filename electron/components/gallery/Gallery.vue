<template>
    <div v-on:dragover.prevent
         v-on:drop="drop">
        <h2>This is gallery</h2>
        <div v-for="image in this.state.images">
            {{JSON.stringify(image)}}
        </div>
    </div>
</template>

<style>

</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    import {State} from './Store';

    @Component
    export default class Gallery extends Vue {
        private state: State;

        constructor() {
            super();
            this.state = (this.$store.state as any).Gallery;
        }

        mounted() {
            this.$store.dispatch('fetchImages').then(_ => _);
        }

        drop(event: DragEvent) {
            event.preventDefault();
            alert('Gallery dropped');
            // 在这里触发往gallery添加图片的事件
        }
    }
</script>