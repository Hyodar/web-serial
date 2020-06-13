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

    <NavigationDrawer
      :active="navigationDrawer.active"
      :menus="navigationDrawer.menus"
      :optionData="navigationDrawer.optionData"
    />

    <v-main>
      <Snackbar :content="snackbarMessage" />
      <SerialChat
        ref="chat"
        :logMode="navigationDrawer.optionData.logMode"
        :displayMode="navigationDrawer.optionData.displayMode"
        :messageBufferSize="500"
      />
      <SerialInput v-on:sendMessage="sendMessage" />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";
import SerialChat from "./components/SerialChat";
import SerialInput from "./components/SerialInput";
import Snackbar from "./components/Snackbar";

import SnackbarMessage from "./classes/SnackbarMessage";
import DisplayMode from "./classes/DisplayMode";
import LogMode from "./classes/LogMode";


export default {
  name: "App",

  components: {
    NavigationDrawer,
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

    navigationDrawer: {
      active: true,
      menus: [
        {
          name: "Log Mode",
          optionName: "logMode",
          options: [
            { name: "TERMINAL", val: LogMode.TERMINAL },
            { name: "CHAT", val: LogMode.CHAT }
          ],
        },
        {
          name: "Display Mode",
          optionName: "displayMode",
          options: [
            { name: "LITERAL", val: DisplayMode.LITERAL },
            { name: "HEX", val: DisplayMode.HEX },
            { name: "BINARY", val: DisplayMode.BINARY }
          ]
        }
      ],
      optionData: {
        logMode: LogMode.CHAT,
        displayMode: DisplayMode.LITERAL
      }
    },

  }),

  methods: {
    sendMessage(messageContent) {
      this.$refs.chat.addEntry(messageContent, "self");
    }
  }
};
</script>
