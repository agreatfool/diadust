import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import Gallery from './components/gallery/Gallery.vue';
import Setting from './components/setting/Setting.vue';

import {Store as GalleryStore} from './components/gallery/Store';
import {Store as SettingStore} from './components/setting/Store';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

const routes = [
    {path: '/gallery', component: Gallery},
    {path: '/setting', component: Setting},
    {path: '*', redirect: '/gallery'},
];
const router = new VueRouter({routes});

const store = new Vuex.Store({
    modules: {
        Gallery: GalleryStore,
        Setting: SettingStore,
    }
});

new Vue({
    router,
    store,
    template: `
    <div>
        <h1>Hello App!</h1>
        <p>
            <!-- use router-link component for navigation. -->
            <!-- specify the link by passing the \`to\` prop. -->
            <!-- <router-link> will be rendered as an \`<a>\` tag by default -->
            <router-link to="/gallery">Go to gallery</router-link>
            <router-link to="/setting">Go to setting</router-link>
        </p>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
    </div>
    `,
    components: {
        Gallery,
        Setting
    }
}).$mount('#app');
