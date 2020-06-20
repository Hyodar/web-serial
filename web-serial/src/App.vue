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

    <v-navigation-drawer v-model="drawer" app right width="350">
      <SerialOptions
        :value="userOptions.serialConnection"
        v-on:serialConnected="openSerial"
        v-on:serialDisconnected="closeSerial"
      />
      <LogModeOptions v-model="userOptions.logMode" />
      <DisplayModeOptions v-model="userOptions.displayMode" />
      <ExpressionList
        v-model="userOptions.expressions"
        v-on:snackbar="setSnackbarMessage($event)"
      />
      <CommandList
        ref="commandList"
        v-model="userOptions.commands"
        v-on:sendCommand="sendCommand"
        v-on:snackbar="setSnackbarMessage($event)"
      />
    </v-navigation-drawer>

    <v-main>
      <Snackbar ref="snackbar" />
      <SerialChat
        ref="chat"
        :logMode="userOptions.logMode"
        :displayMode="userOptions.displayMode"
        :expressions="userOptions.expressions"
        :messageBufferSize="500"
      />
      <SerialInput v-on:sendMessage="sendMessage" />
    </v-main>
  </v-app>
</template>

<script>
import SerialOptions from "./components/navigationDrawer/SerialOptions";
import LogModeOptions from "./components/navigationDrawer/LogModeOptions";
import DisplayModeOptions from "./components/navigationDrawer/DisplayModeOptions";
import ExpressionList from "./components/navigationDrawer/ExpressionList";
import CommandList from "./components/navigationDrawer/CommandList";

import SerialChat from "./components/SerialChat";
import SerialInput from "./components/SerialInput";
import Snackbar from "./components/Snackbar";

import BrowserSerial from "./utils/classes/BrowserSerial";
import SnackbarMessage from "./utils/enums/SnackbarMessage";
import DisplayMode from "./utils/enums/DisplayMode";
import LogMode from "./utils/enums/LogMode";

import unescapeJs from "unescape-js";

export default {
  name: "App",

  components: {
    SerialChat,
    SerialInput,
    Snackbar,
    SerialOptions,
    LogModeOptions,
    DisplayModeOptions,
    ExpressionList,
    CommandList,
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
    browserSerial: null,
    drawer: true,

    userOptions: {
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
      expressions: [],
      commands: [],
    }
  }),

  methods: {
    sendMessage(messageContent, from="self") {
      this.$refs.chat.addEntry(messageContent, from);

      if (this.browserSerial) {
        this.browserSerial.write(messageContent);
      }

      if (from === "serial") {
        this.$refs.commandList.addToScanBuffer(messageContent);
      }
    },

    setSnackbarMessage(snackbarMessage) {
      this.$refs.snackbar.setMessage(snackbarMessage);
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },

    async openSerial() {
      this.browserSerial = new BrowserSerial({
        decodeFrom: "ascii",
        readLoopCallback: chunk => {
          this.sendMessage(chunk, "serial");
        }
      });

      this.browserSerial.addEventListener("disconnect", () => {
        this.closeSerial(true);
        this.setSnackbarMessage(SnackbarMessage.Warning.SerialConnectionClosed);
      });

      try {
        await this.browserSerial.requestPort();
      }
      catch {
        this.setSnackbarMessage(SnackbarMessage.Error.NoPortSelected);
        return;
      }

      try {
        await this.browserSerial.openConnection(this.userOptions.serialConnection.serialOptions);
      }
      catch (e) {
        this.setSnackbarMessage(SnackbarMessage.Error.Custom(`Serial port opening error: ${e}`));
        return;
      }

      this.userOptions.serialConnection.active = true;
      this.setSnackbarMessage(SnackbarMessage.Success.SerialConnectionOpened);
    },

    async closeSerial(disconnect=false) {
      if (!disconnect) {
        await this.browserSerial.close();
      }

      this.userOptions.serialConnection.active = false;
      this.browserSerial = null;
      this.setSnackbarMessage(SnackbarMessage.Success.SerialConnectionClosed);
    },

    sendCommand(content) {
      this.sendMessage(unescapeJs(content));
    }
  }
};
</script>
