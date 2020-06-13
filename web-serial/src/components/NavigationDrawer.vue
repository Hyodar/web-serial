<template>
  <v-navigation-drawer v-model="drawer" app right width="350">
    <v-container>
      <v-row class="ma-1 mt-5" justify="center">
        <div class="text-button"> Serial Connection </div>
      </v-row>

      <v-divider class="ma-2"></v-divider>

      <v-row class="ma-3 mb-0" justify="center" align="center">
        <v-col :cols="9">
          <v-autocomplete
            v-model="optionData.serialConnection.serialOptions.baudrate"
            :items="menus.serialConnection.baudrate.suggestions"
            label="Baud Rate"
          ></v-autocomplete>
        </v-col>
        <v-col :cols="3">
          <v-btn
            text
            v-on:click="toggleSerialConnection"
            v-text="(optionData.serialConnection.active)? 'Close' : 'Go!'"
            :loading="menus.serialConnection.loading"
          ></v-btn>
        </v-col>
      </v-row>

      <v-expansion-panels tile flat>
        <v-expansion-panel class="transparent">
          <v-expansion-panel-header>
            <span class="text-button" style="font-size: 0.75rem !important;"> Additional Options </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <v-select
                  :items="menus.serialConnection.parityType.options"
                  :value="optionData.serialConnection.serialOptions.parity"
                  label="Parity Type"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  :value="optionData.serialConnection.serialOptions.buffersize"
                  label="Buffer Size"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  :items="menus.serialConnection.databits.options"
                  :value="optionData.serialConnection.serialOptions.databits"
                  label="Data Bits"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="menus.serialConnection.stopbits.options"
                  :value="optionData.serialConnection.serialOptions.stopbits"
                  label="Stop Bits"
                ></v-select>
              </v-col>
            </v-row>

            <HorizontalSelection
              multiple
              dense
              :options="menus.serialConnection.flags.options"
              :value="menus.serialConnection.flags.default"
              v-on:changedValue="setSerialConnectionFlags($event)"
              class="mt-2"
            />
            
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>

    <v-container>
      <v-row class="ma-1" justify="center">
        <div class="text-button"> Log Mode </div>
      </v-row>

      <v-divider class="ma-2"></v-divider>

      <HorizontalSelection
        :options="menus.logMode.options"
        :value="optionData.logMode"
        v-on:changedValue="optionData.logMode = $event"
      />
    </v-container>

    <v-container>
      <v-row class="ma-1" justify="center">
        <div class="text-button"> Display Mode </div>
      </v-row>

      <v-divider class="ma-2"></v-divider>

      <HorizontalSelection
        :options="menus.displayMode.options"
        :value="optionData.displayMode"
        v-on:changedValue="optionData.displayMode = $event"  
      />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import DisplayMode from "../classes/DisplayMode";
import LogMode from "../classes/LogMode";
import SerialConnectionFlags from "../classes/SerialConnectionFlags";
import SnackbarMessage from "../classes/SnackbarMessage";

import HorizontalSelection from "./HorizontalSelection";

export default {
  name: "NavigationDrawer",

  props: ["active", "optionData"],

  components: {
    HorizontalSelection
  },

  data: () => ({
    drawer: true,
    menus: {
      serialConnection: {
        baudrate: {
          suggestions: [
            115200, 57600, 38400, 19200, 9600, 4800,
            2400, 1800, 1200, 600, 300, 200, 150,
            134, 110, 75, 50
          ]
        },
        databits: {
          options: [8, 7, 6, 5]
        },
        stopbits: {
          options: [1, 2]
        },
        parityType: {
          options: ["none", "even", "odd", "mark", "space"]
        },
        flags: {
          options: [
            { name: "RTSCTS", val: SerialConnectionFlags.RTSCTS },
            { name: "XON", val: SerialConnectionFlags.XON },
            { name: "XOFF", val: SerialConnectionFlags.XOFF },
            { name: "XANY", val: SerialConnectionFlags.XANY }
          ],
          default: []
        },
        loading: false
      },
      logMode: {
        options: [
          { name: "TERMINAL", val: LogMode.TERMINAL },
          { name: "CHAT", val: LogMode.CHAT }
        ],
      },
      displayMode: {
        options: [
          { name: "LITERAL", val: DisplayMode.LITERAL },
          { name: "HEX", val: DisplayMode.HEX },
          { name: "BINARY", val: DisplayMode.BINARY }
        ]
      }
    }
  }),

  mounted: function() {
    this.drawer = this.active;

    if ("serial" in navigator) {

      navigator.serial.onconnect = () => {
        this.optionData.serialConnection.active = true;
        this.menus.serialConnection.loading = false;

        this.$emit("snackbar", SnackbarMessage.Success.SerialConnectionOpened);
      }

      navigator.serial.ondisconnect = () => {
        this.optionData.serialConnection.active = false;
        this.menus.serialConnection.loading = false;

        this.$emit("snackbar", SnackbarMessage.Warning.SerialConnectionClosed);
      }
    }
  },

  methods: {
    toggleSerialConnection: async function() {
      this.menus.serialConnection.loading = true;

      if (!this.optionData.serialConnection.active) {
        await this.openSerialConnection();
      }
      else {
        await this.closeSerialConnection();
      }
    },

    openSerialConnection: async function() {
      let port = null;

      try {
        port = await navigator.serial.requestPort();
      }
      catch (e) {
        this.$emit("snackbar", SnackbarMessage.Error.Custom(`Serial port request error: ${e}`));
        this.menus.serialConnection.loading = false;
        return;
      }

      if (!port) {
        this.$emit("snackbar", SnackbarMessage.Error.NoPortSelected);
        this.menus.serialConnection.loading = false;
        return;
      }

      this.optionData.serialConnection.serialOptions.port = port;

      try {
        await port.open({ baudrate: parseInt(this.optionData.serialConnection.serialOptions.baudrate) });
      }
      catch (e) {
        this.$emit("snackbar", SnackbarMessage.Error.Custom(`Serial port opening error: ${e}`));
        this.menus.serialConnection.loading = false;
        return;
      }
    },

    closeSerialConnection: function() {
      this.optionData.serialConnection.active = false;
      this.menus.serialConnection.loading = false;
    },

    setSerialConnectionFlags: function(flagList) {
      Object.values(SerialConnectionFlags).forEach(flag => {
        this.optionData.serialConnection.serialOptions[flag] = false;
      });

      flagList.forEach(el => {
        this.optionData.serialConnection.serialOptions[el] = true;
      });
    },

    toggle: function() {
      this.drawer = !this.drawer;
    }
  }
}
</script>