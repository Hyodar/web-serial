<template>
  <div v-on:mouseover="showButton = true;" v-on:mouseleave="showButton = false;" class="monitor-entry">
    <v-btn v-show="showButton" icon class="message-button" x-small v-on:click="copyContent">
      <v-icon small> mdi-content-copy </v-icon>
    </v-btn>
    <div v-if="logMode === LogMode.CHAT">
      <v-card
        :id="`msg-${id}`"
        dense
        :color="color"
        :elevation="2"
        style="font-family: monospace; min-height: 42px;"
      >
        <div>
          <v-card-subtitle class="ma-0 pa-2 pb-0 offwhite-text">
            {{ time }}
          </v-card-subtitle>
        </div>
        <v-card-text
          class="pa-0 pd-1 pl-2 mt-0 offwhite-text"
        >
          <span v-for="(marked, idx) in marks" :key="idx" :style="`${marked.colorStyle}; white-space: pre-wrap; font-weight: 700;`">{{ marked.content }}</span>
        </v-card-text>
      </v-card>
      <div style="height: 10px;"></div>
    </div>
    <div
      v-else-if="logMode === LogMode.TERMINAL"
      :id="`msg-${id}`"
      style="font-family: monospace;"
    >
      <span>{{ sentOrReceived }}</span>
      {{ time }}
      <br />
      <span>
        <span v-for="(marked, idx) in marks" :key="idx" :style="`${marked.colorStyle}; white-space: pre-wrap; font-weight: 700;`">{{ marked.content }}</span>
      </span>
    </div>
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

import MessageColor from "../utils/enums/MessageColor";
import MessageFlow from "../utils/enums/MessageFlow";
import LogMode from "../utils/enums/LogMode";

import UnionReplacer from "union-replacer";

export default {
  name: "SerialChatMessage",

  props: ["id", "content", "time", "author", "logMode", "expressions", "displayFunction"],

  data: () => ({
    LogMode: LogMode,
    showButton: false,
    marks: []
  }),

  computed: {
    bindedExpressions: function() {
      const a = this.expressions.map(el => [el[0], el[1].bind(null, this.addMarked.bind(this))]);
      return a;
    },
    rawContent: function() {
      if (this.displayFunction === charOrSquare) {
        return this.content;
      }
      return strToBase(this.content, this.displayFunction);
    },
    sentOrReceived: function() {
      return MessageFlow[this.author];
    },
    color: function() {
      return MessageColor[this.author];
    },
  },

  mounted() {
    this.marks = [];
    new UnionReplacer(this.bindedExpressions, unionReplacerFlags).replace(this.content);
  },

  watch: {
    displayFunction() {
      this.marks = [];
      new UnionReplacer(this.bindedExpressions, unionReplacerFlags).replace(this.content);
    },
    bindedExpressions() {
      this.marks = [];
      new UnionReplacer(this.bindedExpressions, unionReplacerFlags).replace(this.content);
    },
    content() {
      this.marks = [];
      new UnionReplacer(this.bindedExpressions, unionReplacerFlags).replace(this.content);
    },
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
    },

    addMarked(colorStyle, content) {
      if (this.marks.length && colorStyle === this.marks[this.marks.length - 1].colorStyle) {
        this.marks[this.marks.length - 1].content += content;
        return;
      }
      this.marks.push({ colorStyle: colorStyle, content: content });
    }
  }
};
</script>
