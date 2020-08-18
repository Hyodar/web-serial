<template>
  <v-container id="chatContainer">
    <v-card outlined :style="{'backgroundColor': chatBackgroundColor, 'transition': '0.2s ease-in-out background-color'}">
      <div class="d-flex flex-row-reverse" :style="{'backgroundColor': headerBackgroundColor}">
        <v-btn icon color="grey" @click="clear">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="grey" v-bind="attrs" v-on="on">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="downloadLog('json')">
              <v-list-item-title>JSON</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadLog('csv')">
              <v-list-item-title>CSV</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadLog('plainText')">
              <v-list-item-title>Plain text</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <DynamicScroller
        ref="scroller"
        :items="messages"
        :min-item-size="24"
        :buffer="300"
        class="scroller custom-scrollbar"
        :emitUpdate="true"
        v-on:update="scrollerUpdate"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-active="active"
            :data-index="index"
            :size-dependencies="[
              item.content,
            ]"
          >
            <SerialChatMessage
              :id="item.id"
              :date="item.date"
              :content="item.content"
              :author="item.author"
              :logMode="logMode"
              :expressions="activeExpressions"
              :displayFunction="displayFunction"
            />
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </v-card>
  </v-container>
</template>

<style>
#chatContainer {
  background-color: #363636;
  height: calc(100vh - 130px - 84px);
}

.scroller {
  height: calc(0.9 * (100vh - 130px - 84px));
  scroll-behavior: smooth;
}

.custom-scrollbar::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: #f5f5f500;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
	background-color: #f5f5f500;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #ffffff42;
}

</style>

<script>
import ObjectToCSV from "object-to-csv";

import SerialChatMessage from "./SerialChatMessage";

import DisplayMode from "../utils/enums/DisplayMode";
import LogMode from "../utils/enums/LogMode";
import MessageFlow from "../utils/enums/MessageFlow";

import { charOrSquare } from "../utils/textConversion";
import { charToHex } from "../utils/textConversion";
import { charToBinary } from "../utils/textConversion";
import { strToBase } from "../utils/textConversion";
import downloadAsFile from "../utils/downloadAsFile";

import MessageAuthor from "../utils/enums/MessageAuthor";

export default {
  name: "SerialChat",

  props: ["logMode", "displayMode", "messageBufferSize", "expressions"],

  components: {
    SerialChatMessage,
  },

  data: () => ({
    messages: [],
    msgIdCount: 0,
    lastScrollPosition: 0,
    lastScrollMessageIndex: 0,
    authorLastMessage: {
      [MessageAuthor.SELF]: { index: 0, id: 0, time: 0 },
      [MessageAuthor.SERIAL]: { index: 0, id: 0, time: 0 },
      [MessageAuthor.COMMAND]: { index: 0, id: 0, time: -Infinity },
    },
  }),

  computed: {
    activeExpressions: function() {
      const unionReplacerExpressions = this.expressions
        .filter(el => el.active)
        .map(el => {
          const colorStyle = `${el.colorTarget}: ${el.color}`;
          return [
            el.expression,
            (addMarked, match) => {
              addMarked(
                colorStyle,
                strToBase(match, this.displayFunction)
              );
              return "";
            }
          ]
        });

      unionReplacerExpressions.push([/[\s\S]/gm, (addMarked, match) => {
        addMarked("", strToBase(match, this.displayFunction));
        return "";
      }]);

      return unionReplacerExpressions;
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
    },

    chatBackgroundColor: function() {
      if (this.logMode === LogMode.CHAT) {
        return "transparent";
      }
      else {
        return "#000000b0";
      }
    },

    headerBackgroundColor: function() {
      if (this.logMode === LogMode.CHAT) {
        return "#00000022";
      }
      else {
        return "#ffffff11";
      }
    },
    
    lastSentMessage: function() {
      return this.messages[this.messages.length - 1] || {};
    },
  },

  watch: {
    logMode: function() {
      this.scrollToCurrentMessage();
      this.$refs.scroller.forceUpdate(true);
    },

    displayMode: function() {
      this.$refs.scroller.forceUpdate(true);
    },
  },

  methods: {
    addEntry(msg, author) {
      const lastMessage = this.authorLastMessage[author];
      let shouldScrollToBottom = false;

      const scrollerEl = this.$refs.scroller.$refs.scroller.$el;
      const scrollerBottom = scrollerEl.scrollTop + scrollerEl.offsetHeight;
      shouldScrollToBottom = (scrollerEl.scrollHeight - scrollerBottom <= 50);

      if (this.shouldAppendToLastMessage(author)) {
        const index = this.messageIndexSearch(lastMessage.id, lastMessage.index);
        this.messages[index].content += msg;
        lastMessage.time = Date.now();
      }
      else {
        this.messages.push({
          id: this.msgIdCount++,
          date: Date.now(),
          content: msg,
          author: author
        });

        while (this.messages.length > this.messageBufferSize) {
          this.messages.shift();
        }

        if (author !== MessageAuthor.COMMAND) {
          this.authorLastMessage[author] = {
            id: this.msgIdCount - 1,
            index: this.messages.length - 1,
            time: Date.now(),
          };
        }
      }

      if (shouldScrollToBottom) {
        setTimeout(this.scrollToBottom.bind(this), 100);
      }
    },

    shouldAppendToLastMessage(author) {
      const elapsedTime = Date.now() - this.authorLastMessage[author].time;

      return elapsedTime < 400 && this.lastSentMessage.author === author;
    },

    scrollToBottom() {
      this.$refs.scroller.scrollToBottom();
    },

    scrollToCurrentMessage() {
      this.$refs.scroller.scrollToItem(this.lastScrollMessageIndex);
    },

    messageIndexSearch(id, from) {
      for (let i = from; i >= 0; i--) {
        if (this.messages[i].id === id) {
          return i;
        }
      }
    },

    scrollerUpdate(startIdx, endIdx) {
      this.lastScrollMessageIndex = endIdx;
    },

    clear() {
      Object.assign(this.$data, this.$options.data.apply(this));
      this.$emit("clear");
    },

    downloadLog(downloadAs) {
      const parseMessageContent = (msg) => {
        if (this.displayFunction === charOrSquare) {
          return msg.content;
        }
        return strToBase(msg.content, this.displayFunction);
      }

      const exportedMessages = this.messages.map(msg => ({
        type: MessageFlow[msg.author].toUpperCase(),
        date: new Date(msg.date).toISOString(),
        content: parseMessageContent(msg),
      }));

      if (downloadAs === "json") {
        const json = JSON.stringify(exportedMessages);

        downloadAsFile(json, "log.json", "application/json");
      }
      else if (downloadAs === "csv") {
        const csv = new ObjectToCSV({
          keys: ["type", "date", "content"].map(key => ({ key, as: key })),
          data: exportedMessages
        }).getCSV();

        downloadAsFile(csv, "log.csv", "text/csv");
      }
      else {
        const dividerLine = `\n${"-".repeat(79)}\n`;
        const plainText = exportedMessages.map(msg => {
          return `[${msg.type} - ${msg.date}]\n${msg.content}`
        }).join(dividerLine);

        downloadAsFile(plainText, "log.txt", "text/plain");        
      }
    },
  },
};
</script>
