<template>
  <v-app dark>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right width="350">
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-snackbar v-model="noWebSerial" color="error" :timeout="0" top>
        Your browser doesn't seem to have the WebSerial API enabled.
        <v-btn text v-on:click="redirectToGuide">Enable it here!</v-btn>
        <v-btn text v-on:click="noWebSerial = false"> Close </v-btn>
      </v-snackbar>
      <SerialChat />
      <SerialInput />
    </v-content>
  </v-app>
</template>

<script>
import SerialChat from "./components/SerialChat";
import SerialInput from "./components/SerialInput";

export default {
  name: "App",

  components: {
    SerialChat,
    SerialInput
  },

  mounted() {
    this.noWebSerial = !("serial" in navigator);
  },

  data: () => ({
    noWebSerial: false,
    drawer: true
  }),

  methods: {
    redirectToGuide() {
      window.location.href = "https://duckduckgo.com";
    }
  }
};
</script>
