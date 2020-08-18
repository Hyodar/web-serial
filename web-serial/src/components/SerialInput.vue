<template>
  <v-container class="grey darken-3" style="height: 150px;">
    <v-row align="center">
      <v-textarea
        v-model="message"
        outlined
        hide-details
        autocomplete="off"
        height="130px"
        class="pl-2"
        @keyup.enter.exact="sendMessage"
      ></v-textarea>
      <v-btn icon v-on:click="sendMessage" color="primary" x-large>
        <v-icon>
          mdi-send
        </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import unescapeJs from "unescape-js";

export default {
  name: "SerialInput",

  data: () => ({
    message: "",
  }),

  methods: {
    sendMessage() {
      if (this.message) {
        this.$emit("sendMessage", unescapeJs(this.message));
        this.message = "";
      }
    },
  },
};
</script>
