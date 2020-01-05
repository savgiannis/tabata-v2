import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
import firebaseConfig from '../firebase-credentials.json';
import vuetify from './plugins/vuetify';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.filter('minutesSeconds', totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  const formattedMinutes = minutes <= 9 ? `0${minutes}` : minutes.toString();
  const formattedSeconds = seconds <= 9 ? `0${seconds}` : seconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
})

let app = null;

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    await store.dispatch('setIdToken');
  }

  store.dispatch('selectWorkout');

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