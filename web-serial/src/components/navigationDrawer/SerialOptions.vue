<template>
  <NavigationDrawerRow label="Serial Connection">
    <v-col :cols="9">
      <v-autocomplete
        v-model="value.serialOptions.baudrate"
        :items="menus.baudrate.suggestions"
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
                  v-model.number="value.serialOptions.buffersize"
                  :rules="[v => v >= 0 || 'Must be positive or zero']"
                  label="Buffer Size"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  :items="menus.databits.options"
                  v-model="value.serialOptions.databits"
                  label="Data Bits"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="menus.stopbits.options"
                  v-model="value.serialOptions.stopbits"
                  label="Stop Bits"
                ></v-select>
              </v-col>
            </v-row>

            <HorizontalSelection
              multiple
              dense
              :options="menus.flags.options"
              :value="menus.flags.selected"
              v-on:changedValue="menus.flags.selected = $event"
              class="mt-2"
            />
            
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </NavigationDrawerRow>
</template>

<script>
import NavigationDrawerRow from "./NavigationDrawerRow";
import HorizontalSelection from "../HorizontalSelection";
import SerialConnectionFlags from "../../utils/enums/SerialConnectionFlags";

export default {
  name: "SerialOptions",
  
  components: {
    NavigationDrawerRow,
    HorizontalSelection,
  },

  props: {
    value: Object,
  },

  data: () => ({
    menus: {
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
      parity: {
        options: ["none", "even", "odd", "mark", "space"]
      },
      flags: {
        options: [
          { 
            name: SerialConnectionFlags.RTSCTS,
            val: SerialConnectionFlags.RTSCTS,
          },
          { 
            name: SerialConnectionFlags.XON,
            val: SerialConnectionFlags.XON,
          },
          { 
            name: SerialConnectionFlags.XOFF,
            val: SerialConnectionFlags.XOFF,
          },
          { 
            name: SerialConnectionFlags.XANY,
            val: SerialConnectionFlags.XANY,
          },
        ],
        selected: [],
      },
    }
  }),

  computed: {
    serialConnectionButtonText() {
      return (this.value.active)? "Cancel" : "Go!";
    },
  },

  watch: {
    value() {
      this.menus.flags.selected = Object.values(SerialConnectionFlags).filter(flag => {
        return this.value.serialOptions[flag];
      });
    },

    "menus.flags.selected"() {
      Object.values(SerialConnectionFlags).forEach(flag => {
        this.value.serialOptions[flag] = false;
      });

      this.menus.flags.selected.forEach(flag => {
        this.value.serialOptions[flag] = true;
      });
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