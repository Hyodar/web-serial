<template>
  <v-snackbar
    top
    v-model="isOn"
    v-if="message"
    :color="message.color"
  >
    {{ message.content }}
    <v-btn
      text
      v-for="(button, idx) in message.buttons"
      v-bind:key="idx"
      v-on:click="button.callback(); close();"
    >
      {{ button.text }}
    </v-btn>
    <v-btn text v-on:click="close">Close</v-btn>
  </v-snackbar>
</template>

<script>
import CallbackScheduler from "../utils/classes/CallbackScheduler";

export default {
  name: "Snackbar",

  data: () => ({
    isOn: false,
    message: null,
    closeScheduler: null,
  }),

  mounted() {
    this.closeScheduler = new CallbackScheduler(this.close.bind(this));
  },

  methods: {
    setMessage(msg) {
      this.closeScheduler.schedule(msg.timeout);

      this.isOn = true;
      this.message = msg;
    },

    close() {
      this.isOn = false;
      this.message = null;
    },
  },
};
</script>
