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
      this.setSnackbarMessage(SnackbarMessage.Error.NoWebSerial);
      return;
    }

    if (!("TextDecoderStream" in window)) {
      this.setSnackbarMessage(SnackbarMessage.Error.NoTextDecoderStream);
      return;
    }

    if (!("TextEncoderStream" in window)) {
      this.setSnackbarMessage(SnackbarMessage.Error.NoTextEncoderStream);
      return;
    }
  },

  data: () => ({
    snackbarMessage: null,
    showAsTerminal: false,

    serialWriterClosed: null,
    serialReaderClosed: null,

    serialWriter: null,
    serialReader: null,

    navigationDrawer: {
      active: true,
      optionData: {
        logMode: LogMode.CHAT,
        displayMode: DisplayMode.ASCII,
        serialConnection: {
          port: null,
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

      if (this.serialWriter) {
        this.serialWriter.write(messageContent);
      }
    },

    setSnackbarMessage(snackbarMessage) {
      this.$refs.snackbar.setMessage(snackbarMessage);
    },

    toggleDrawer() {
      this.$refs.drawer.toggle();
    },

    openSerial() {
      const port = this.navigationDrawer.optionData.serialConnection.port;

      if (!(port && port.readable && port.writable)) {
        this.setSnackbarMessage(SnackbarMessage.Error.ConnectionFailed);
        return;
      }

      this.initializeReader(port);
      this.initializeWriter(port);
    },

    initializeReader(port) {
      const decoder = new window.TextDecoderStream("ascii");

      this.serialReaderClosed = port.readable
        .pipeTo(decoder.writable);

      this.serialReader = decoder.readable.getReader();
      this.readSerial();
    },

    initializeWriter(port) {
      const encoder = new window.TextEncoderStream();
      this.serialWriterClosed = encoder.readable
        .pipeTo(port.writable);

      this.serialWriter = encoder.writable.getWriter();
    },

    async closeSerial() {
      const port = this.navigationDrawer.optionData.serialConnection.port;

      if (this.serialWriter) {
        this.serialWriter.close();
        await this.writableStreamClosed;
      }

      if (this.serialReader) {
        this.serialReader.cancel();
        await this.serialReaderClosed.catch(() => {});
      }

      if (port) {
        await port.close();
      }

      this.serialReader = null;
      this.serialWriter = null;
      this.serialReaderClosed = null;
      this.serialWriterClosed = null;
      this.navigationDrawer.optionData.serialConnection.port = null;
    },

    async readSerial() {
      for (;;) {
        const { value, done } = await this.serialReader.read();

        if (done) {
          break;
        }

        this.$refs.chat.addEntry(value, "serial");
      }

      this.serialReader.releaseLock();
    }
  }
};
</script>
