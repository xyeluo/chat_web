import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

import "font-awesome/css/font-awesome.min.css";
import "animate.css"
import "comtoolcss"

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
