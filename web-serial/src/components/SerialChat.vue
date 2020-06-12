<template>
  <v-container style="background-color: #363636; height: 80%;">
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
    <div ref="scrollbar" class="scroller" v-bar>
      <v-slide-x-transition class="py-0" group>
        <SerialChatMessage
          v-for="(item, idx) in messages"
          v-bind:key="idx"
          :time="item.time"
          :content="item.content"
          :author="item.author"
          :showAsTerminal="showAsTerminal"
        />
      </v-slide-x-transition>
    </div>
  </v-container>
</template>

<style>
.scroller {
  scroll-behavior: smooth;
  overflow-y: scroll;
}

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
</style>

<script>
import SerialChatMessage from "./SerialChatMessage";

export default {
  name: "SerialChat",

  props: ["showAsTerminal"],

  components: {
    SerialChatMessage
  },

  data: () => ({
    messages: []
  }),

  methods: {
    addEntry(msg, author) {
      this.messages.push({
        time: this.getCurrentTime(),
        content: msg,
        author: author
      });
      setTimeout(this.scrollToBottom.bind(this), 100);
    },

    scrollToBottom() {
      const scroller = this.$refs.scrollbar._vuebarState.el2;
      scroller.scrollTop = scroller.scrollHeight;
    },

    getCurrentTime() {
      const date = new Date();

      return `[${date.toLocaleDateString()} - ${date.toLocaleTimeString()}]`;
    }
  },

  mounted() {
    const scrollerToFixedHeight = () => {
      const scroller = document.querySelector(".scroller");
      const vContent = document.querySelector(".v-content");
      const vContentHeight = getComputedStyle(vContent).height;

      scroller.style.height = `${parseFloat(vContentHeight, 10) * 0.8 * 0.9}px`;
    };

    scrollerToFixedHeight();
    window.addEventListener("resize", scrollerToFixedHeight);
  }
};
</script>
