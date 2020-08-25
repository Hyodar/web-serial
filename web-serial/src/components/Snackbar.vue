<template>
  <v-snackbar
    top
    v-model="isOn"
    v-show="message"
    :color="message.color"
    :timeout="-1"
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
    <div class="progress-bar-container">
      <div ref="progressBar" class="progress-bar"></div>
    </div>
  </v-snackbar>
</template>

<style scoped>
.progress-bar-container {
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: 0px;
  left: 0px;
  background-color: #ffffff88;
}

.progress-bar {
  height: 100%;
  background-color: #ffffffbb;
}

.no-transition {
  transition: none !important;
}
</style>

<script>
import CallbackScheduler from "../utils/classes/CallbackScheduler";

export default {
  name: "Snackbar",

  data: () => ({
    isOn: false,
    progressBarTimeout: null,
    message: {
      color: null,
      content: null,
      buttons: [
        { text: null, callback: null },
      ],
    },
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
      this.startProgressBar();
    },

    close() {
      this.isOn = false;
    },

    startProgressBar() {
      const progressBar = this.$refs.progressBar;

      clearTimeout(this.progressBarTimeout);
      
      progressBar.classList.add("no-transition");
      progressBar.style.width = "0px";
      progressBar.offsetHeight; // trigger a reflow
      progressBar.classList.remove("no-transition");

      progressBar.style.transition = `width ${Math.max(this.message.timeout - 100, 0)}ms linear`;
      this.progressBarTimeout = setTimeout(() => { progressBar.style.width = "100%"; }, 100);
    },
  },
};
</script>
