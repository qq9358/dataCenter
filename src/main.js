import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCharts from "v-charts";

import "./assets/font/iconfont.css"

Vue.config.productionTip = false

Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
