<template>
  <div v-on:mouseover="showButton = true;" v-on:mouseleave="showButton = false;" class="monitor-entry">
    <v-btn v-show="showButton" icon class="message-button" x-small v-on:click="copyContent">
      <v-icon small> mdi-content-copy </v-icon>
    </v-btn>
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
          {{ time }}
        </v-card-subtitle>
      </div>
      <v-card-text
        class="pa-0 pd-1 pl-2 mt-0 offwhite-text"
        v-html="regexMarkedContent"
      ></v-card-text>
    </v-card>
    <span
      v-else-if="logMode === LogMode.TERMINAL"
      :id="`msg-${id}`"
      style="font-family: monospace;"
    >
      <span :class="[colors[author]]" style="border-radius: 5px;">>></span>
      {{ time }} - <span v-html="regexMarkedContent"></span>
      <br />
    </span>
  </div>
</template>

<style scoped>
.offwhite-text {
  color: rgba(255, 255, 255, 0.9) !important;
}

.message-button {
  position: absolute;
  right: 0px;
  z-index: 1;
}

.monitor-entry:hover {
  background-color: rgba(255, 255, 255, 0.06);
}
</style>

<script>

import { strToBase } from "../utils/textConversion";
import { charOrSquare } from "../utils/textConversion";
import { unionReplacerFlags } from "../utils/textRegex";

const colors = Object.freeze({
  self: "primary",
  serial: "secondary"
});

import LogMode from "../classes/LogMode";

import UnionReplacer from "union-replacer";

export default {
  name: "SerialChatMessage",

  props: ["id", "content", "time", "author", "logMode", "expressions", "displayFunction"],

  data: () => ({
    colors: colors,
    LogMode: LogMode,
    showButton: false
  }),

  computed: {
    regexMarkedContent: function() {
      return new UnionReplacer(this.expressions, unionReplacerFlags).replace(this.content);
    },

    rawContent: function() {
      if (this.displayFunction === charOrSquare) {
        return this.content;
      }
      return strToBase(this.content, this.displayFunction);
    }
  },

  methods: {
    copyContent() {
      const temp = document.createElement("textarea");

      document.getElementById(`msg-${this.id}`).appendChild(temp);
      temp.value = this.rawContent;

      temp.select();
      temp.setSelectionRange(0, 99999);

      document.execCommand("copy");

      temp.remove();
    }
  }
};
</script>
