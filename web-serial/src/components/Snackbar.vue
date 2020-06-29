<template>
  <v-snackbar
    top
    v-model="isOn"
    v-if="content"
    :color="content.color"
  >
    {{ content.content }}
    <v-btn
      text
      v-for="(button, idx) in content.buttons"
      v-bind:key="idx"
      v-on:click="button.callback"
    >
      {{ button.text }}
    </v-btn>
    <v-btn text v-on:click="close"> Close </v-btn>
  </v-snackbar>
</template>

<script>
import CallbackScheduler from "../utils/classes/CallbackScheduler";

export default {
  name: "Snackbar",

  data: () => ({
    isOn: false,
    content: null,
    closeScheduler: null,
  }),

  mounted() {
    this.closeScheduler = new CallbackScheduler(this.close.bind(this));
  },

  methods: {
    setMessage(msg) {
      this.closeScheduler.schedule(msg.timeout);

      this.isOn = true;
      this.content = msg;
    },

    close() {
      this.isOn = false;
      this.content = null;
    }
  }
};
</script>
