import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
import firebaseConfig from '../firebase-credentials.json';
import vuetify from './plugins/vuetify';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    await store.dispatch('setIdToken');
  }

  setTimeout(() => {
    if (!app) {
      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app')
    }
  }, 1000);
})