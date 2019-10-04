// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import vueaxios from 'vue-axios'
import Scroller from './components/subcomponents/scroller'
import Loading from './components/subcomponents/loading'
Vue.component('Scroller',Scroller)
Vue.component('Loading',Loading)
Vue.use(vueaxios,axios)
Vue.config.productionTip = false
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render :h=>h(App)
})
