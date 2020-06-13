<template>
  <v-navigation-drawer v-model="active" app right width="350">
    <v-container>
      <v-row class="ma-1 mt-5" justify="center">
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
      <v-row class="ma-1 mt-5" justify="center">
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

import HorizontalSelection from "./HorizontalSelection";

export default {
  name: "NavigationDrawer",

  props: ["active", "optionData"],

  components: {
    HorizontalSelection
  },

  data: () => ({        
    menus: {
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
  })
}
</script>