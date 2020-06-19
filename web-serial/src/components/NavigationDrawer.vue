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
            :loading="menus.serialConnection.loading"
          >
            {{ serialConnectionButtonText }}
          </v-btn>
        </v-col>
      </v-row>

      <v-expansion-panels flat>
        <v-expansion-panel class="transparent">
          <v-expansion-panel-header>
            <span class="text-button" style="font-size: 0.75rem !important;"> Additional Options </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey darken-3">
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

    <v-container>
      <v-row class="ma-1" justify="center">
        <v-spacer></v-spacer>
        <div class="text-button"> Expressions </div>
        <v-spacer></v-spacer>
        <v-btn icon v-on:click="addNewExpression" small>
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-row>

      <ExpressionEditor ref="expressionEditor" v-on:snackbar="sendSnackbar($event)"/>

      <v-divider class="ma-2"></v-divider>

      <v-card class="grey darken-3" style="height: 300px" v-bar>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(item, idx) in optionData.expressions"
              :key="idx"
            >
              <v-list-item-action>
                <v-checkbox color="grey darken-4" v-model="item.active">
                </v-checkbox>
              </v-list-item-action>
              <v-list-item-content v-on:click="openExpressionEditor(item);">
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-menu v-model="item.colorEdit" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-btn icon :color="item.color" v-on="on" class="pa-3">
                      <v-icon large>
                        mdi-label
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker v-model="item.color" flat />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<style>
.v-color-picker__input > input {
  color: #ffffff;
}
</style>

<script>
import DisplayMode from "../classes/DisplayMode";
import LogMode from "../classes/LogMode";
import SerialConnectionFlags from "../classes/SerialConnectionFlags";

import HorizontalSelection from "./HorizontalSelection";
import ExpressionEditor from "./ExpressionEditor";
import { noMatchRegexString } from '../utils/textRegex';

export default {
  name: "NavigationDrawer",

  props: ["active", "optionData"],

  components: {
    HorizontalSelection,
    ExpressionEditor
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
          { name: "ASCII", val: DisplayMode.ASCII },
          { name: "HEX", val: DisplayMode.HEX },
          { name: "BINARY", val: DisplayMode.BINARY }
        ]
      },
      expressions: {
        count: 0,
        editing: false
      }
    }
  }),

  mounted: function() {
    this.drawer = this.active;
  },

  computed: {
    serialConnectionButtonText: function() {
      return (this.optionData.serialConnection.active)? 'Close' : 'Go!';
    }
  },

  methods: {
    toggleSerialConnection() {
      this.menus.serialConnection.loading = true;

      if (!this.optionData.serialConnection.active) {
        this.openSerialConnection();
      }
      else {
        this.closeSerialConnection();
      }
    },

    openSerialConnection() {
      this.$emit("serialConnected");
    },

    closeSerialConnection() {
      this.$emit("serialDisconnected");
    },

    setSerialConnectionFlags(flagList) {
      Object.values(SerialConnectionFlags).forEach(flag => {
        this.optionData.serialConnection.serialOptions[flag] = false;
      });

      flagList.forEach(el => {
        this.optionData.serialConnection.serialOptions[el] = true;
      });
    },

    toggle() {
      this.drawer = !this.drawer;
    },

    addNewExpression() {
      this.optionData.expressions.push({
        name: `Expression ${this.menus.expressions.count++}`,
        active: false,
        expression: new RegExp(noMatchRegexString, ""),
        color: "#ffffff",
        colorEdit: false
      });
    },

    openExpressionEditor(expression) {
      this.$refs.expressionEditor.openDialog(expression);
    },

    sendSnackbar(snackbarMessage) {
      this.$emit("snackbar", snackbarMessage);
    },

    setSerialLoading(isLoading) {
      this.menus.serialConnection.loading = isLoading;
    }
  }
}
</script>