import Vue from "vue";
import Vuetify, {
  VExpansionPanels,
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VExpansionPanels,
  }
});

export default new Vuetify({
  theme: {
    dark: true,
  },
});
