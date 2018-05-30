<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
    <div>
        <div><p>Contents from HelloDecorator.vue</p></div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from "vue-property-decorator";

@Component
export default class HelloDecorator extends Vue {
    @Provide() name = 'World';
    @Provide() enthusiasm = 1;

    increment() {
        this.enthusiasm++;
    }
    decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }

    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
