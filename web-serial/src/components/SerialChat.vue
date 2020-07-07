<template>
  <v-container id="chatContainer">
    <v-card outlined :style="{'backgroundColor': chatBackgroundColor, 'transition': '0.2s ease-in-out background-color'}">
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
              :time="item.time"
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
import SerialChatMessage from "./SerialChatMessage";

import DisplayMode from "../utils/enums/DisplayMode";
import LogMode from "../utils/enums/LogMode";

import { charOrSquare } from "../utils/textConversion";
import { charToHex } from "../utils/textConversion";
import { charToBinary } from "../utils/textConversion";
import { strToBase } from "../utils/textConversion";

export default {
  name: "SerialChat",

  props: ["logMode", "displayMode", "messageBufferSize", "expressions"],

  components: {
    SerialChatMessage
  },

  data: () => ({
    messages: [],
    msgIdCount: 0,
    lastScrollPosition: 0,
    lastScrollMessageIndex: 0,
    lastSentMessage: {
      "self": { index: 0, id: 0, time: 0 },
      "serial": { index: 0, id: 0, time: 0 }
    },
    testing: false,
  }),

  computed: {
    activeExpressions: function() {
      const unionReplacerExpressions = this.expressions
        .filter(el => el.active)
        .map(el => {
          return [
            el.expression,
            (addMarked, match) => {
              addMarked(el.color, strToBase(match, this.displayFunction));
              return "";
            }
          ]
        });

      unionReplacerExpressions.push([/[\s\S]/gm, (addMarked, match) => {
        addMarked("transparent", strToBase(match, this.displayFunction));
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
    }
  },

  watch: {
    logMode: function() {
      this.scrollToCurrentMessage();
      this.$refs.scroller.forceUpdate(true);
    },

    displayMode: function() {
      this.$refs.scroller.forceUpdate(true);
    }
  },

  methods: {
    addEntry(msg, author) {
      const elapsedTime = Date.now() - this.lastSentMessage[author].time;
      const lastMessage = this.lastSentMessage[author];
      let shouldScrollToBottom = false;

      const scrollerEl = this.$refs.scroller.$refs.scroller.$el;
      const scrollerBottom = scrollerEl.scrollTop + scrollerEl.offsetHeight;
      shouldScrollToBottom = (scrollerEl.scrollHeight - scrollerBottom <= 50);

      if (elapsedTime < 500) {
        const index = this.messageIndexSearch(lastMessage.id, lastMessage.index);
        this.messages[index].content += msg;
        lastMessage.time = Date.now();
      }
      else {
        this.messages.push({
          id: this.msgIdCount++,
          time: this.getCurrentTime(),
          content: msg,
          author: author
        });

        while (this.messages.length > this.messageBufferSize) {
          this.messages.shift();
        }

        this.lastSentMessage[author] = {
          id: this.msgIdCount - 1,
          index: this.messages.length - 1,
          time: Date.now()
        };
      }

      if (shouldScrollToBottom) {
        setTimeout(this.scrollToBottom.bind(this), 100);
      }
    },

    scrollToBottom() {
      this.$refs.scroller.scrollToBottom();
    },

    getCurrentTime() {
      const date = new Date();

      return `[${date.toLocaleDateString()} - ${date.toLocaleTimeString()}]`;
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
    }
  }
};
</script>
