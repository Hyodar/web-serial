import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueVirtualScroller from "vue-virtual-scroller";
Vue.use(VueVirtualScroller);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
