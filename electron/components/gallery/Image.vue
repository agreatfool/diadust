<template>
    <div class="img-viewer">
        <canvas id="img-canvas" :width="canvasWidth + 'px'" :height="canvasHeight + 'px'"></canvas>
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
    import {Combo, Listener as KeypressListener} from 'keypress.js';

    interface Point {
        x: number;
        y: number;
    }

    @Component
    export default class ImageViewer extends Vue {

        private canvasWidth: number = 0;
        private canvasHeight: number = 0;

        private keypress: KeypressListener;
        private keypressCombos: Array<Combo>;

        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private image: any; // shall be "Image", but IDE say "Cannot find name Image"
        private dirty: boolean = false;
        private centre: Point = {x: 0, y: 0} as Point;
        private scale: number = 1;
        private scaleStep: number = 0.1;
        private stopRendering: boolean = false;

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

        onImageLoad() {
            // set scale to use as much space inside the canvas as possible
            // if (((this.canvas.height / this.image.height) * this.image.width) <= this.canvas.width) {
            //     this.scale = this.canvas.height / this.image.height;
            // } else {
            //     this.scale = this.canvas.width / this.image.width;
            // }

            this.scale = 1;

            // centre at image centre
            this.centre.x = this.image.width / 2;
            this.centre.y = this.image.height / 2;

            // image changed
            this.dirty = true;

            // start new render loop
            this.renderImage();
        }

        zoomIn() {
            this.scale = this.scale * (1 + this.scaleStep);
            this.dirty = true;
        };

        zoomOut() {
            this.scale = this.scale * (1 - this.scaleStep);
            this.dirty = true;
        };

        onMouseWheel(evt: Event | undefined) {
            if (!evt) {
                evt = event;
            }

            (evt as Event).preventDefault();

            if ((evt as WheelEvent).detail < 0 || (evt as WheelEvent).wheelDelta > 0) { // up -> smaller
                this.zoomOut();
            } else { // down -> larger
                this.zoomIn();
            }
        }

        onMouseMove() {

        }

        renderImage() {
            // only re-render if dirty
            if (this.dirty) {
                this.dirty = false;

                // clear canvas
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // draw image (transformed and scaled)
                this.context.save();

                // let translateX = this.canvas.width / 2 - this.centre.x * this.scale;
                // let translateY = this.canvas.height / 2 - this.centre.y * this.scale;
                //
                // this.context.translate(translateX, translateY);
                this.context.scale(this.scale, this.scale);

                this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);

                this.context.restore();

            }

            if (!this.stopRendering) {
                window.requestAnimationFrame(this.renderImage);
            }
        }

        setDimension() {
            this.canvasWidth = document.documentElement.clientWidth;
            this.canvasHeight = document.documentElement.clientHeight;
        }

        onResize() {
            this.setDimension();

            this.dirty = true;
        }

        mounted() {
            this.keypress.register_many(this.keypressCombos);

            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);

                this.setDimension(); // init

                this.canvas = document.getElementById('img-canvas') as HTMLCanvasElement;
                this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

                this.image = new Image();
                this.image.addEventListener('load', this.onImageLoad, false);
                this.image.src = this.$store.state.Root.image;

                this.canvas.addEventListener('mousewheel', this.onMouseWheel);
                this.canvas.addEventListener('mousemove', this.onMouseMove);
            });
        }

        beforeDestroy() {
            this.keypress.reset();

            window.removeEventListener('resize', this.onResize);
            this.canvas.removeEventListener('mousewheel', this.onMouseWheel);
            this.canvas.removeEventListener('mousemove', this.onMouseMove);
        }

    }
</script>