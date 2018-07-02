<template>
    <div id="img-container" class="img-viewer"></div>
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
    import * as Konva from 'konva';

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
        private centre: Konva.Vector2d = {x: 0, y: 0} as Konva.Vector2d;
        private scale: number = 1;
        private scaleStep: number = 0.1;
        // private mouseLastPos: Point = {x: 0, y: 0} as Point;
        private leftMouseButtonDown: boolean = false;
        private stopRendering: boolean = false;

        private konvaStage: Konva.Stage;
        private konvaLayer: Konva.Layer;
        private konvaImage: Konva.Image;

        constructor() {
            super();
        }

        zoomReset() {
            this.scale = 1;
            this.konvaImage.scale({x: this.scale, y: this.scale});
            this.konvaStage.draw();
        }

        zoomIn() {
            this.scale = this.scale * (1 + this.scaleStep);
            this.konvaImage.scale({x: this.scale, y: this.scale});
            this.konvaStage.draw();
        };

        zoomOut() {
            this.scale = this.scale * (1 - this.scaleStep);
            this.konvaImage.scale({x: this.scale, y: this.scale});
            this.konvaStage.draw();
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

        onImageLoad() {
            this.konvaImage = new Konva.Image({
                image: this.image,
                width: this.image.width * this.scale,
                height: this.image.height * this.scale,
                // set draw point to image center
                offset: {
                    x: this.image.width / 2 * this.scale,
                    y: this.image.height / 2 * this.scale,
                },
                // set init position to draw point
                position: {
                    x: this.image.width / 2 * this.scale,
                    y: this.image.height / 2 * this.scale,
                },
                draggable: true,
                dragBoundFunc: (pos: Konva.Vector2d) => {
                    // use top left point to calc bound
                    let leftTopPos = {
                        x: pos.x - this.image.width / 2 * this.scale,
                        y: pos.y - this.image.height / 2 * this.scale,
                    } as Konva.Vector2d;

                    let deltaX = this.canvasWidth - this.image.width * this.scale;
                    let deltaY = this.canvasHeight - this.image.height * this.scale;

                    // this is top left dest point
                    let destX = 0;
                    let destY = 0;

                    // x
                    if (deltaX < 0) {
                        // image width bigger than canvas width
                        if (leftTopPos.x > 0) {
                            destX = 0;
                        } else if (leftTopPos.x < deltaX) {
                            destX = deltaX;
                        } else {
                            destX = leftTopPos.x;
                        }
                    } else if (deltaX > 0) {
                        // image width smaller than canvas width
                        if (leftTopPos.x > deltaX) {
                            destX = deltaX;
                        } else if (leftTopPos.x < 0) {
                            destX = 0;
                        } else {
                            destX = leftTopPos.x;
                        }
                    }

                    // y
                    if (deltaY < 0) {
                        // image height bigger than canvas height
                        if (leftTopPos.y > 0) {
                            destY = 0;
                        } else if (leftTopPos.y < deltaY) {
                            destY = deltaY;
                        } else {
                            destY = leftTopPos.y;
                        }
                    } else if (deltaY > 0) {
                        // image height smaller than canvas height
                        if (leftTopPos.y > deltaY) {
                            destY = deltaY;
                        } else if (leftTopPos.y < 0) {
                            destY = 0;
                        } else {
                            destY = leftTopPos.y;
                        }
                    }

                    return {
                        x: destX + this.image.width / 2 * this.scale,
                        y: destY + this.image.height / 2 * this.scale,
                    } as Konva.Vector2d;
                },
            });
            this.konvaLayer.add(this.konvaImage);
            this.konvaStage.draw();
        }

        setDimension() {
            this.canvasWidth = document.documentElement.clientWidth;
            this.canvasHeight = document.documentElement.clientHeight;

            if (this.konvaStage) {
                this.konvaStage.setWidth(this.canvasWidth);
                this.konvaStage.setHeight(this.canvasHeight);
                this.konvaStage.draw();
            }
        }

        mounted() {
            this.$nextTick(() => {
                this.setDimension(); // init

                this.konvaStage = new Konva.Stage({
                    container: 'img-container',
                    width: this.canvasWidth,
                    height: this.canvasHeight,
                });
                this.konvaLayer = new Konva.Layer();
                this.konvaStage.add(this.konvaLayer);

                this.image = new Image();
                this.image.addEventListener('load', this.onImageLoad, false);
                this.image.src = this.$store.state.Root.image;

                this.keypress = new KeypressListener();
                this.keypressCombos = [
                    {
                        // reset image, leave image viewer mode
                        keys: 'esc',
                        on_keyup: () => {
                            this.$store.commit('rootImageSet', ''); // reset image
                        }
                    } as Combo,
                    {
                        // reset scale: command + 1
                        keys: 'cmd 1',
                        on_keyup: () => {
                            this.zoomReset();
                        }
                    } as Combo,
                    {
                        // reset scale: control + 1
                        keys: 'ctrl 1',
                        on_keyup: () => {
                            this.zoomReset();
                        }
                    } as Combo,
                ];
                this.keypress.register_many(this.keypressCombos);

                window.addEventListener('resize', this.setDimension);
                window.addEventListener('mousewheel', this.onMouseWheel);
            });
        }

        beforeDestroy() {
            this.keypress.reset();

            window.removeEventListener('resize', this.setDimension);
            window.removeEventListener('mousewheel', this.onMouseWheel);
        }

    }
</script>