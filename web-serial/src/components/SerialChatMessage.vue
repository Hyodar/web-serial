<template>
  <div v-on:mouseover="showButton = true;" v-on:mouseleave="showButton = false;">
    <v-btn v-show="showButton" fab class="message-button" small v-on:click="copyContent">
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
  float: inline-end;
  z-index: 1;
}
</style>

<script>
const colors = Object.freeze({
  self: "primary",
  serial: "secondary"
});

import DisplayMode from "../classes/DisplayMode";
import LogMode from "../classes/LogMode";

import { charOrSquare } from "../utils/textConversion";
import { charToHex } from "../utils/textConversion";
import { charToBinary } from "../utils/textConversion";
import { applyMultipleRegexes } from "../utils/textRegex";

export default {
  name: "SerialChatMessage",

  props: ["id", "content", "time", "author", "logMode", "displayMode", "expressions"],

  data: () => ({
    colors: colors,
    LogMode: LogMode,
    showButton: false
  }),

  computed: {
    regexMarkedContent: function() {
      const matchingExpressions = applyMultipleRegexes(
        this.content,
        this.expressions
      );

      let newStr = "";
      let endIndex;
      let matchingExpression;

      for (let i = 0; i < this.content.length; i++) {
        matchingExpression = matchingExpressions.filter((el) => el.match.index === i)[0];

        if (matchingExpression) {
          newStr += `<span style='background-color: ${matchingExpression.color};'>`;
          endIndex = i + matchingExpression.match[0].length;
        }
        else if (i === endIndex) {
          newStr += "</span>";
          endIndex = null;
        }

        newStr += this.displayFunction(this.content[i]);
      }

      return newStr;
    },

    displayFunction: function() {
      if (this.displayMode === DisplayMode.ASCII) {
        return charOrSquare;
      }
      else if (this.displayMode === DisplayMode.HEX) {
        return charToHex;
      }
      else {
        return charToBinary;
      }
    }
  },

  methods: {
    copyContent() {
      const temp = document.createElement("textarea");

      document.getElementById(`msg-${this.id}`).appendChild(temp);
      temp.value = this.computedContent;

      temp.select();
      temp.setSelectionRange(0, 99999);

      document.execCommand("copy");

      temp.remove();
    }
  }
};
</script>
