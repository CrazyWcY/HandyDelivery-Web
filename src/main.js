// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'//引入store
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/iconfont/iconfont.css'
import axios from './axios';
Vue.use(iView)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
