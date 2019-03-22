import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import FormMaking from './index'
import global from './Common.vue'

import {HappyScroll} from 'vue-happy-scroll'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)

/*import VueViewports from 'vue-viewports'*/


Vue.prototype.GLOBAL = global
Vue.config.productionTip = false

/*

const options = [
    {
        rule: '320px',
        label: 'mobile'
    },
    {
        rule: '768px',
        label: 'tablet'
    },
    {
        rule: '1024px',
        label: 'desktop'
    },
    {
        rule: '1920px',
        label: 'hd-desktop'
    },
    {
        rule: '2560px',
        label: 'qhd-desktop'
    },
    {
        rule: '3840px',
        label: 'uhd-desktop'
    }
]

Vue.use(VueViewports, options)*/

//Vue.use(Vuex)
Vue.use(FormMaking)
Vue.use(ElementUI, {size: 'small'})

const Bus = new Vue()

new Vue({
    router,
    data: {
        Bus
    },
    render: h => h(App)
}).$mount('#app')
