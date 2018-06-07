declare module "vue-mugen-scroll" {
    import Vue from "vue";

    export default class MugenScroll extends Vue {
        handler: Function;
        shouldHandle: boolean;
        threshold: number;
        handleOnMount: boolean;
        scrollContainer: string;
    }
}