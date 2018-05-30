<template>
    <div>
        <h2>This is gallery</h2>
    </div>
</template>

<style>

</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import {State} from './Store';

@Component
export default class Gallery extends Vue {
    private state: State;

    constructor() {
        super();
        this.state = (this.$store.state as any).Gallery;
    }

    mounted() {
        console.log(this.state);
    }
}
</script>