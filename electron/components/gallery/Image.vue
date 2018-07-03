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
    import {ViewingImageQuery} from "./Store";

    interface MultiKeyCombo {
        keys: Array<string>;
        event: (event?: KeyboardEvent) => any;
    }

    @Component
    export default class ImageViewer extends Vue {

        private canvasWidth: number = 0;
        private canvasHeight: number = 0;

        private keypress: KeypressListener;
        private keypressCombos: Array<MultiKeyCombo>;

        private image: any; // shall be "Image", but IDE say "Cannot find name Image"
        private scale: number = 1;
        private scaleStep: number = 0.1;

        private konvaStage: Konva.Stage;
        private konvaLayer: Konva.Layer;
        private konvaImage: Konva.Image;

        private vueWatcher: () => void;

        constructor() {
            super();

            this.keypress = new KeypressListener();
            this.keypressCombos = [
                {
                    keys: ['esc'], // reset image, leave image viewer mode
                    event: () => {
                        this.$store.commit('gallerySetViewingImage', {
                            filePath: '',
                            galleryId: '',
                        } as ViewingImageQuery); // reset image
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 1', 'ctrl 1'], // reset scale
                    event: () => {
                        this.zoomReset();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 2', 'ctrl 2'], // fit window
                    event: () => {
                        this.imgFitWindow();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 3', 'ctrl 3'], // fit width
                    event: () => {
                        this.imgFitWidth();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 4', 'ctrl 4'], // fit height
                    event: () => {
                        this.imgFitHeight();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 5', 'ctrl 5'], // center window
                    event: () => {
                        this.imgCenteringBoth();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 6', 'ctrl 6'], // center x
                    event: () => {
                        this.imgCenteringX();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['cmd 7', 'ctrl 7'], // center y
                    event: () => {
                        this.imgCenteringY();
                    }
                } as MultiKeyCombo,
                {
                    keys: ['pageup'], // previous image
                    event: () => {
                        this.$store.commit('galleryPrevImage');
                    }
                } as MultiKeyCombo,
                {
                    keys: ['pagedown'], // next image
                    event: () => {
                        this.$store.commit('galleryNextImage');
                    }
                } as MultiKeyCombo,
            ];
        }

        imgFitWindow() {
            // set scale to use as much space inside the canvas as possible
            if (((this.konvaStage.height() / this.image.height) * this.image.width) <= this.konvaStage.width()) {
                this.imgFitHeight();
            } else {
                this.imgFitWidth();
            }
        }

        imgFitWidth() {
            this.scale = this.konvaStage.width() / this.image.width;
            this.konvaImage.position({
                x: this.konvaStage.width() / 2,
                y: this.image.height / 2 * this.scale
            });
            this.konvaImage.scale({x: this.scale, y: this.scale});
            this.konvaStage.draw();
        }

        imgFitHeight() {
            this.scale = this.konvaStage.height() / this.image.height;
            this.konvaImage.position({
                x: this.image.width / 2 * this.scale,
                y: this.konvaStage.height() / 2
            });
            this.konvaImage.scale({x: this.scale, y: this.scale});
            this.konvaStage.draw();
        }

        imgCenteringBoth() {
            this.konvaImage.position({
                x: this.konvaStage.width() / 2,
                y: this.konvaStage.height() / 2
            });
            this.konvaStage.draw();
        }

        imgCenteringX() {
            this.konvaImage.position({
                x: this.konvaStage.width() / 2,
                y: this.image.height / 2 * this.scale
            });
            this.konvaStage.draw();
        }

        imgCenteringY() {
            this.konvaImage.position({
                x: this.image.width / 2 * this.scale,
                y: this.konvaStage.height() / 2
            });
            this.konvaStage.draw();
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

            this.konvaImage.on('mouseenter', () => {
                this.konvaStage.container().style.cursor = 'move';
            });
            this.konvaImage.on('mouseleave', () => {
                this.konvaStage.container().style.cursor = 'default';
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
            this.vueWatcher = this.$store.watch(() => this.$store.state.Gallery.viewingImagePath,
                () => {
                    this.image.src = this.$store.state.Gallery.viewingImagePath;
                });

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
                this.image.src = this.$store.state.Gallery.viewingImagePath;

                this.keypressCombos.forEach((combo: MultiKeyCombo) => {
                    combo.keys.forEach((key: string) => {
                        this.keypress.register_combo({
                            keys: key,
                            on_keyup: combo.event,
                        } as Combo);
                    });
                });

                window.addEventListener('resize', this.setDimension);
                window.addEventListener('mousewheel', this.onMouseWheel);
            });
        }

        beforeDestroy() {
            this.vueWatcher();
            this.keypress.reset();
            window.removeEventListener('resize', this.setDimension);
            window.removeEventListener('mousewheel', this.onMouseWheel);
        }

    }
</script>