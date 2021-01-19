<template>
  <NavigationDrawerRow label="Serial Connection">
    <v-col :cols="9">
      <v-autocomplete
        v-model="value.serialOptions.baudRate"
        :items="menus.baudRate.suggestions"
        label="Baud Rate"
      ></v-autocomplete>
    </v-col>
    <v-col :cols="3">
      <v-btn
        text
        v-on:click="toggleSerialConnection"
      >
        {{ serialConnectionButtonText }}
      </v-btn>
    </v-col>

    <v-row>
      <v-expansion-panels flat>
        <v-expansion-panel class="transparent">
          <v-expansion-panel-header>
            <span class="text-button" style="font-size: 0.75rem !important;">
              Additional Options
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey darken-3">
            <v-row>
              <v-col>
                <v-select
                  :items="menus.parity.options"
                  v-model="value.serialOptions.parity"
                  label="Parity Type"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  v-model.number="value.serialOptions.bufferSize"
                  :rules="[v => v >= 0 || 'Must be positive or zero']"
                  label="Buffer Size"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  :items="menus.dataBits.options"
                  v-model="value.serialOptions.dataBits"
                  label="Data Bits"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="menus.stopBits.options"
                  v-model="value.serialOptions.stopBits"
                  label="Stop Bits"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  :items="menus.flowControl.options"
                  v-model="value.serialOptions.flowControl"
                  label="Flow Control"
                ></v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </NavigationDrawerRow>
</template>

<script>
import NavigationDrawerRow from "./NavigationDrawerRow";

export default {
  name: "SerialOptions",
  
  components: {
    NavigationDrawerRow,
  },

  props: {
    value: Object,
  },

  data: () => ({
    menus: {
      baudRate: {
        suggestions: [
          115200, 57600, 38400, 19200, 9600, 4800,
          2400, 1800, 1200, 600, 300, 200, 150,
          134, 110, 75, 50
        ],
      },
      dataBits: {
        options: [8, 7, 6, 5],
      },
      stopBits: {
        options: [1, 2],
      },
      parity: {
        options: ["none", "even", "odd", "mark", "space"],
      },
      flowControl: {
        options: ["none", "hardware"],
      }
    },
  }),

  computed: {
    serialConnectionButtonText() {
      return (this.value.active)? "Cancel" : "Go!";
    },
  },

  methods: {
    toggleSerialConnection() {
      if (this.value.active) {
        this.$emit("serialDisconnected");
      }
      else {
        this.$emit("serialConnected");
      }
    },
  }
}
</script>