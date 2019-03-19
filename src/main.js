import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import FormMaking from './index'
import global from './Common.vue'


Vue.prototype.GLOBAL = global
Vue.config.productionTip = false

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
