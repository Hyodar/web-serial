<template>
  <v-container style="background-color: #363636; height: calc(100% - 150px);" id="chatContainer">
    <!--
    <DynamicScroller
      ref="scroller"
      :items="messages"
      :min-item-size="24"
      class="scroller"
      @resize="scrollToBottom"
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
          :time="item.time"
          :content="item.content"
          :author="item.author"
        />
      </DynamicScrollerItem>
    </DynamicScroller>
    -->
    <v-card outlined style="background-color: transparent">
      <div ref="scrollbar" class="scroller" v-bar>
        <v-slide-x-transition class="py-0" group>
          <SerialChatMessage
            v-for="(item, idx) in messages"
            v-bind:key="idx"
            :id="item.id"
            :time="item.time"
            :content="item.content"
            :author="item.author"
            :logMode="logMode"
            :displayMode="displayMode"
          />
        </v-slide-x-transition>
      </div>
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

export default {
  name: "SerialChat",

  props: ["logMode", "displayMode", "messagebuffersize"],

  components: {
    SerialChatMessage
  },

  data: () => ({
    messages: [],
    msgIdCount: 0,
    lastScrollPosition: 0,
    scrollPosition: 0,
    lastScrollMessageIndex: 0
  }),

  watch: {
    scrollPosition: function(scrollPos) {
      let msg = null;

      if (scrollPos > this.lastScrollPosition) {
        for (let i = this.lastScrollMessageIndex; i < this.messages.length; i++) {
          msg = document.getElementById(`msg-${this.messages[i].id}`);
          if (msg.offsetTop >= scrollPos) {
            this.lastScrollMessageIndex = i;
            break;
          }
        }
      }
      else {
        for (let i = this.lastScrollMessageIndex; i >= 0; i--) {
          msg = document.getElementById(`msg-${this.messages[i].id}`);
          if (msg.offsetTop <= scrollPos) {
            this.lastScrollMessageIndex = i;
            break;
          }
        }
      }

      this.lastScrollPosition = scrollPos;
    },

    logMode: function() {
      this.scrollToCurrentMessage();
    },

    displayMode: function() {
      this.scrollToCurrentMessage();
    }
  },

  methods: {
    addEntry(msg, author) {
      this.messages.push({
        id: this.msgIdCount++,
        time: this.getCurrentTime(),
        content: msg,
        author: author
      });

      while (this.messages.length > this.messagebuffersize) {
        this.messages.shift();
      }

      setTimeout(this.scrollToBottom.bind(this), 100);
    },

    scrollToBottom() {
      const scroller = this.$refs.scrollbar._vuebarState.el2;
      scroller.scrollTop = scroller.scrollHeight;
    },

    getCurrentTime() {
      const date = new Date();

      return `[${date.toLocaleDateString()} - ${date.toLocaleTimeString()}]`;
    },

    scrollToCurrentMessage() {
      setTimeout(() => {
        if(this.msgIdCount) {
          const scrollbarTarget = this.$refs.scrollbar._vuebarState.el2;
          const scrollTo = `msg-${this.messages[this.lastScrollMessageIndex].id}`;
          scrollbarTarget.scrollTop = document.getElementById(scrollTo).offsetTop;
        }
      }, 100);
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

    const scrollbarTarget = this.$refs.scrollbar._vuebarState.el2;

    this.lastScrollPosition = scrollbarTarget.scrollHeight;
    scrollbarTarget.addEventListener("scroll", event => {
      this.scrollPosition = event.target.scrollTop;
    });
  }
};
</script>
