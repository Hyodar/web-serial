<template>
  <v-container style="background-color: #363636; height: calc(100% - 150px);" id="chatContainer">
    <v-card outlined style="background-color: transparent">
      <DynamicScroller
        ref="scroller"
        :items="messages"
        :min-item-size="24"
        class="scroller"
        :emitUpdate="true"
        @resize="scrollToBottom"
        v-on:update="scrollerUpdate"
      >
        <DynamicScrollerItem
          slot-scope="{ item, index, active }"
          :item="item"
          :active="active"
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
          />
        </DynamicScrollerItem>
      </DynamicScroller>
    </v-card>
  </v-container>
</template>

<style>
.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition:
    background-color 100ms ease-out,
    margin 100ms ease-out,
    height 100ms ease-out,
    top 300ms ease-out;
  transition:
    background-color 100ms ease-out,
    margin 100ms ease-out,
    height 100ms ease-out,
    top 300ms ease-out;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(255, 255, 255, 0.5);
}

.vb-content {
  scroll-behavior: smooth;
}
</style>

<script>
import SerialChatMessage from "./SerialChatMessage";

import DisplayMode from "../classes/DisplayMode";

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
    }
  }),

  computed: {
    activeExpressions: function() {
      const unionReplacerExpressions = this.expressions
      .filter(el => el.active)
      .map(el => {
        return [
          el.expression,
          match => `<span style="background-color: ${el.color}">${strToBase(match, this.displayFunction)}</span>`
        ]
      });

      unionReplacerExpressions.push([/[\s\S]/gm, match => strToBase(match, this.displayFunction)]);

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
    }
  },

  watch: {
    logMode: function() {
      this.scrollToCurrentMessage();
    },

    displayMode: function() {
      this.scrollToCurrentMessage();
    }
  },

  methods: {
    addEntry(msg, author) {
      const elapsedTime = Date.now() - this.lastSentMessage[author].time;
      const lastMessage = this.lastSentMessage[author];

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

      setTimeout(this.scrollToBottom.bind(this), 100);
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
  },

  mounted() {
    const scrollerToFixedHeight = () => {
      const scroller = document.querySelector(".scroller");
      const chatContainer = document.querySelector("#chatContainer");
      const chatContainerHeight = getComputedStyle(chatContainer).height;

      scroller.style.height = `${parseFloat(chatContainerHeight, 10) * 0.9}px`;
    };

    scrollerToFixedHeight();
    window.addEventListener("resize", scrollerToFixedHeight);
  }
};
</script>
