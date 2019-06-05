import Vue from 'vue'
import App from './App.vue'
import router from '../../routers/backend/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
