import Vue from "vue"; // Vue lib
import App from "./App.vue"; // Our root component
import router from "./router"; // Router config
import store from "./store"; // Store config
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app"); // Create Vue instance and mount it in index.html -> #app element