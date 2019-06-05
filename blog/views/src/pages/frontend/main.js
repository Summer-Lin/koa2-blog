import Vue from 'vue'
import App from './App.vue'
import router from '../../routers/frontend/index'




new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
