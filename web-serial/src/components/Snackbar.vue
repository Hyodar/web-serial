<template>
  <v-snackbar
    top
    v-model="isOn"
    v-if="content"
    :color="content.color"
    :timeout="content.timeout"
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
export default {
  name: "Snackbar",

  data: () => ({
    isOn: false,
    content: null,
    closeTimeout: null,
  }),

  methods: {
    setMessage(msg) {
      if (this.isOn) {
        this.close();
      }

      this.isOn = true;
      this.content = msg;

      if (msg.timeout !== -1) {
        this.closeTimeout = setTimeout(() => {
          this.close();
        }, msg.timeout);
      }
    },

    close() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      this.isOn = false;
      this.content = null;
    }
  }
};
</script>
