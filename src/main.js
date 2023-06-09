import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Croppa from 'vue-croppa'

// Транспорт для взаимодействия с бэкендом.
Vue.use(VueAxios, axios);
Vue.use(Croppa);

Vue.config.productionTip = false

new Vue(
  {
  router,
  vuetify,
  render: h => h(App)
  }
).$mount('#app')
