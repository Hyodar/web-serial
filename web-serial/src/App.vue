<template>
  <v-app dark style="background-color: #262626;">
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

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        v-on:click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right width="350">
      <v-row class="ma-3">
        <v-btn v-on:click="drawer = false" icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-row>

      <v-row class="ma-1" justify="center">
        <div class="text-button"> Log Mode </div>
      </v-row>

      <v-divider class="ma-2"></v-divider>

      <v-row class="ma-3" justify="center">
        <v-btn
          tile
          v-for="mode in logModeOptions"
          v-bind:key="mode.val"
          v-on:click="logMode = mode.val"
          :class="(mode.val === logMode)? 'grey darken-2' : undefined">
          {{ mode.name }}
        </v-btn>
      </v-row>

      <v-row class="ma-1 mt-5" justify="center">
        <div class="text-button"> Display Mode </div>
      </v-row>

      <v-divider class="ma-2"></v-divider>

      <v-row class="ma-3" justify="center">
        <v-btn
          tile
          v-for="mode in displayModeOptions"
          v-bind:key="mode.val"
          v-on:click="displayMode = mode.val"
          :class="(mode.val === displayMode)? 'grey darken-2' : undefined">
          {{ mode.name }}
        </v-btn>
      </v-row>
    </v-navigation-drawer>

    <v-main>
      <Snackbar :content="snackbarMessage" />
      <SerialChat
        ref="chat"
        :logMode="logMode"
        :displayMode="displayMode"
        :messageBufferSize="500"
      />
      <SerialInput v-on:sendMessage="sendMessage" />
    </v-main>
  </v-app>
</template>

<script>
import SerialChat from "./components/SerialChat";
import SerialInput from "./components/SerialInput";
import Snackbar from "./components/Snackbar";

import SnackbarMessage from "./classes/SnackbarMessage";
import DisplayMode from "./classes/DisplayMode";
import LogMode from "./classes/LogMode";

export default {
  name: "App",

  components: {
    SerialChat,
    SerialInput,
    Snackbar
  },

  mounted() {
    if (!("serial" in navigator)) {
      this.snackbarMessage = SnackbarMessage.Error.NoWebSerial;
    }
  },

  data: () => ({
    drawer: true,
    snackbarMessage: null,
    showAsTerminal: false,

    logModeOptions: [
      { name: "TERMINAL", val: LogMode.TERMINAL },
      { name: "CHAT", val: LogMode.CHAT }
    ],
    logMode: 1,

    displayModeOptions: [
      { name: "LITERAL", val: DisplayMode.LITERAL },
      { name: "HEX", val: DisplayMode.HEX },
      { name: "BINARY", val: DisplayMode.BINARY }
    ],
    displayMode: 0,

  }),

  methods: {
    sendMessage(messageContent) {
      this.$refs.chat.addEntry(messageContent, "self");
    }
  }
};
</script>
