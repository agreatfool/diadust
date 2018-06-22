<template>
    <div class="img-viewer">
        <h4>{{ $store.state.Root.image }}</h4>
        <canvas id="img-canvas" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}"></canvas>
    </div>
</template>

<style>
    .img-viewer {
        width: 100%;
        height: 100%;
    }
</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Listener as KeypressListener, Combo} from 'keypress.js';

    @Component
    export default class ImageViewer extends Vue {

        private canvasWidth: number = 0;
        private canvasHeight: number = 0;

        private keypress: KeypressListener;
        private keypressCombos: Array<Combo>;

        constructor() {
            super();
            this.keypress = new KeypressListener();
            this.keypressCombos = [
                {
                    keys: 'esc',
                    on_keyup: () => {
                        this.$store.commit('rootImageSet', ''); // reset image
                    }
                } as Combo,
            ];
        }

        setDimension() {
            this.canvasWidth = document.documentElement.clientWidth;
            this.canvasHeight = document.documentElement.clientHeight;
        }

        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.setDimension);

                this.setDimension(); // init
            });

            this.keypress.register_many(this.keypressCombos);
        }

        beforeDestroy() {
            window.removeEventListener('resize', this.setDimension);

            this.keypress.reset();
        }

    }
</script>