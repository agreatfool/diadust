import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Root from './components/root/Root.vue';

Vue.use(ElementUI);

new Root().$mount('#app');
