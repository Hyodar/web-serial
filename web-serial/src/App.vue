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

    <NavigationDrawer v-model="drawer">
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
        :scanBufferSize="1000"
      />
    </NavigationDrawer>

    <v-main>
      <Snackbar ref="snackbar" />
      <SerialChat
        ref="chat"
        :logMode="userOptions.logMode"
        :displayMode="userOptions.displayMode"
        :expressions="userOptions.expressions"
        :messageBufferSize="500"
        v-on:clear="onChatCleared"
      />
      <SerialInput v-on:sendMessage="sendMessage" />
    </v-main>
  </v-app>
</template>

<style>
.swal-modal {
  font-family: Roboto;
  background: linear-gradient(#282828, #303030);
}

.swal-title,
.swal-text {
  color: #ffffff;
}

html {
  overflow: auto;
}
</style>

<script>
import SerialOptions from "./components/navigationDrawer/SerialOptions";
import LogModeOptions from "./components/navigationDrawer/LogModeOptions";
import DisplayModeOptions from "./components/navigationDrawer/DisplayModeOptions";
import ExpressionList from "./components/navigationDrawer/ExpressionList";
import CommandList from "./components/navigationDrawer/CommandList";

import NavigationDrawer from "./components/NavigationDrawer";
import SerialChat from "./components/SerialChat";
import SerialInput from "./components/SerialInput";
import Snackbar from "./components/Snackbar";

import BrowserSerial from "./utils/classes/BrowserSerial";
import SnackbarMessage from "./utils/enums/SnackbarMessage";
import DisplayMode from "./utils/enums/DisplayMode";
import LogMode from "./utils/enums/LogMode";
import MessageAuthor from "./utils/enums/MessageAuthor";

import unescapeJs from "unescape-js";
import swal from "sweetalert";

export default {
  name: "App",

  components: {
    NavigationDrawer,
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
          this.noWebSerialAlert();
          return;
        case BrowserSerial.Error.NoTransformStream:
          this.setSnackbarMessage(SnackbarMessage.Error.NoTextDecoderStream);
          return;
      }
      throw e;
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
    sendMessage(messageContent, from=MessageAuthor.SELF) {
      this.$refs.chat.addEntry(messageContent, from);

      if (from === MessageAuthor.SELF || from === MessageAuthor.COMMAND) {
        if (this.browserSerial) {
          this.browserSerial.write(messageContent);
        }
      }
      else {
        this.$refs.commandList.addToScanBuffer(messageContent);
      }
    },

    noWebSerialAlert() {
      swal({
        title: "Error!",
        text: "Your browser doesn't seem to have the WebSerialAPI enabled. Please check if it supports it.\nThe 'enable' button will lead you to instructions to activate it on Chrome/Chromium.",
        icon: "error",
        buttons: ["Enable", "Continue Anyway"],
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      })
      .then(pressedButton => {
        if (!pressedButton) {
          window.location.href = "https://codelabs.developers.google.com/codelabs/web-serial/#2";
        }
      });
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
          this.sendMessage(chunk, MessageAuthor.SERIAL);
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
      this.sendMessage(unescapeJs(content), MessageAuthor.COMMAND, true);
    },

    onChatCleared() {
      this.$refs.commandList.resetScanBuffer();
    }
  }
};
</script>
