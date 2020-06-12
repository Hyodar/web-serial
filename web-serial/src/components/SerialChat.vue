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
    <div class="scroller">
      <v-slide-x-transition class="py-0" group>
        <SerialChatMessage
          v-for="(item, idx) in messages"
          v-bind:key="idx"
          :time="item.time"
          :content="item.content"
          :author="item.author"
        />
      </v-slide-x-transition>
    </div>
  </v-container>
</template>

<style scoped>
.scroller {
  scroll-behavior: smooth;
  overflow-y: scroll;
}
</style>

<script>
import SerialChatMessage from "./SerialChatMessage";

export default {
  name: "SerialChat",

  components: {
    SerialChatMessage
  },

  data: () => ({
    messages: []
  }),

  methods: {
    addEntry(msg, author) {
      this.messages.push({
        time: "20:14 PM",
        content: msg,
        author: author
      });
      setTimeout(this.scrollToBottom.bind(this), 100);
    },

    scrollToBottom() {
      const scroller = document.querySelector(".scroller");
      scroller.scrollTop = scroller.scrollHeight;
    }
  },

  mounted() {
    const scroller = document.querySelector(".scroller");
    const vContent = document.querySelector(".v-content");
    const vContentHeight = getComputedStyle(vContent).height;

    scroller.style.height = `${parseFloat(vContentHeight, 10) * 0.8 * 0.9}px`;
  }
};
</script>
