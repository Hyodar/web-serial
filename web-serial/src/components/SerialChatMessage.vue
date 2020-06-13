<template>
  <v-card
    v-if="logMode === LogMode.CHAT"
    :id="`msg-${id}`"
    dense
    :color="colors[author]"
    :elevation="2"
    class="ma-2 mr-4"
    style="font-family: monospace;"
  >
    <div>
      <v-card-subtitle class="ma-0 pa-2 pb-0 offwhite-text">
        {{ id }} - {{ time }}
      </v-card-subtitle>
    </div>
    <v-card-text class="pa-0 pd-1 pl-2 mt-0 offwhite-text">
      {{ computedContent }}
    </v-card-text>
  </v-card>
  <span
    v-else-if="logMode === LogMode.TERMINAL"
    :id="`msg-${id}`"
    style="font-family: monospace;"
  >
    <span :class="[colors[author]]"> >> </span>
    {{ id }} - {{ time }} - {{ computedContent }}
    <br />
  </span>
</template>

<style scoped>
.offwhite-text {
  color: rgba(255, 255, 255, 0.9) !important;
}
</style>

<script>
const colors = Object.freeze({
  self: "primary",
  serial: "secondary"
});

import DisplayMode from "../classes/DisplayMode";
import LogMode from "../classes/LogMode";

import { textToHex, textToBinary } from "../utils/textConversion";

export default {
  name: "SerialChatMessage",

  props: ["id", "content", "time", "author", "logMode", "displayMode"],

  data: () => ({
    colors: colors,
    LogMode: LogMode
  }),

  computed: {
    computedContent: function() {
      if (this.displayMode === DisplayMode.LITERAL) {
        return this.content;
      }
      else if (this.displayMode === DisplayMode.HEX) {
        return textToHex(this.content);
      }
      else {
        return textToBinary(this.content);
      }
    }
  }
};
</script>
