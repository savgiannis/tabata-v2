import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
import firebaseConfig from '../firebase-credentials.json';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
