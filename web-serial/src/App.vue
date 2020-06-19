<template>
  <v-app dark style="background-color: #262626;">
    <v-app-bar app>
      <!--
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
      -->

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon v-on:click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <NavigationDrawer
      ref="drawer"
      :active="navigationDrawer.active"
      :menus="navigationDrawer.menus"
      :optionData="navigationDrawer.optionData"
      v-on:snackbar="setSnackbarMessage"
      v-on:serialConnected="openSerial"
      v-on:serialDisconnected="closeSerial"
    />

    <v-main>
      <Snackbar ref="snackbar" />
      <SerialChat
        ref="chat"
        :logMode="navigationDrawer.optionData.logMode"
        :displayMode="navigationDrawer.optionData.displayMode"
        :messageBufferSize="500"
        :expressions="navigationDrawer.optionData.expressions"
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

import BrowserSerial from "./classes/BrowserSerial";
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
    try {
      BrowserSerial.checkCompatibility();
    }
    catch (e) {
      switch(e) {
        case BrowserSerial.Error.NoWebSerial:
          this.setSnackbarMessage(SnackbarMessage.Error.NoWebSerial);
          return;
        case BrowserSerial.Error.NoTextDecoderStream:
          this.setSnackbarMessage(SnackbarMessage.Error.NoTextDecoderStream);
          return;
        case BrowserSerial.Error.NoTextEncoderStream:
          this.setSnackbarMessage(SnackbarMessage.Error.NoTextEncoderStream);
          return;    
      }
    }
  },

  data: () => ({
    snackbarMessage: null,
    showAsTerminal: false,

    browserSerial: null,

    navigationDrawer: {
      active: true,
      optionData: {
        logMode: LogMode.CHAT,
        displayMode: DisplayMode.ASCII,
        serialConnection: {
          active: false,
          serialOptions: {
            baudrate: null,
            databits: 8,
            stopbits: 1,
            parity: "none",
            buffersize: 255,
            rtscts: false,
            xon: false,
            xoff: false,
            xany: false
          }
        },
        expressions: []
      }
    }
  }),

  methods: {
    sendMessage(messageContent) {
      this.$refs.chat.addEntry(messageContent, "self");

      if (this.browserSerial) {
        this.browserSerial.write(messageContent);
      }
    },

    setSnackbarMessage(snackbarMessage) {
      this.$refs.snackbar.setMessage(snackbarMessage);
    },

    toggleDrawer() {
      this.$refs.drawer.toggle();
    },

    async openSerial() {
      this.browserSerial = new BrowserSerial({
        decodeFrom: "ascii",
        readLoopCallback: chunk => {
          this.$refs.chat.addEntry(chunk, "serial");
        }
      });

      this.browserSerial.addEventListener("disconnect", () => {
        this.closeSerial(true);
        this.setSnackbarMessage(SnackbarMessage.Warning.SerialConnectionClosed);
        this.$refs.drawer.setSerialLoading(false);
      });

      try {
        await this.browserSerial.requestPort();
      }
      catch {
        this.$refs.drawer.setSerialLoading(false);
        this.setSnackbarMessage(SnackbarMessage.Error.NoPortSelected);
        return;
      }

      try {
        await this.browserSerial.openConnection(this.navigationDrawer.optionData.serialConnection.serialOptions);
      }
      catch (e) {
        this.$refs.drawer.setSerialLoading(false);
        this.setSnackbarMessage(SnackbarMessage.Error.Custom(`Serial port opening error: ${e}`));
        return;
      }

      this.navigationDrawer.optionData.serialConnection.active = true;
      this.$refs.drawer.setSerialLoading(false);
      this.setSnackbarMessage(SnackbarMessage.Success.SerialConnectionOpened);
    },

    async closeSerial(disconnect=false) {
      if (!disconnect) {
        await this.browserSerial.close();
      }

      this.navigationDrawer.optionData.serialConnection.active = false;
      this.$refs.drawer.setSerialLoading(false);
      this.browserSerial = null;
      this.setSnackbarMessage(SnackbarMessage.Success.SerialConnectionClosed);
    }
  }
};
</script>
