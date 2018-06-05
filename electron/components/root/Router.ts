import Vue from "vue";
import VueRouter from "vue-router";

import Gallery from '../gallery/Gallery.vue';
import Setting from '../setting/Setting.vue';
import Viewer from '../viewer/Viewer.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/gallery', component: Gallery},
    {path: '/setting', component: Setting},
    {path: '/viewer', component: Viewer},
    {path: '*', redirect: '/gallery'},
];
export const router = new VueRouter({routes});